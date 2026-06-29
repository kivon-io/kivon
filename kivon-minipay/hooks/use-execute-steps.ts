"use client"

import { useEffect, useRef, useState } from "react"
import { useConnection, useSwitchChain, useWalletClient } from "wagmi"
import { sendTransaction, waitForTransactionReceipt } from "wagmi/actions"
import { RELAY_LINK_API_URL } from "@/lib/relay/constants"
import { fetchQuote } from "@/lib/relay/fetchers"
import type { GetQuoteInput } from "@/lib/relay/schemas"
import { buildMiniPaySendParams } from "@/lib/wallet/fee-currency"
import { wagmiConfig } from "@/lib/wallet/wagmi"

export type StepStatus = "incomplete" | "pending" | "complete" | "failed"

export type ExecutionStatus = "idle" | "fetching" | "executing" | "success" | "failed"

export type CheckResultT = {
  status: "success" | "failure" | "refund"
  details: string
  inTxHashes: string[]
  txHashes: string[]
  time: number
  originChainId: number
  destinationChainId: number
}

// The chain ids wagmi is configured for (Celo + Celo Sepolia). Relay returns a
// plain number, so we cast to satisfy wagmi's literal-union typing.
type WagmiChainId = (typeof wagmiConfig)["chains"][number]["id"]

class CancelledError extends Error {
  constructor() {
    super("CANCELLED")
    this.name = "CancelledError"
  }
}

/**
 * Drives a Relay quote's `steps` to completion using the MiniPay injected
 * wallet: re-fetches a fresh quote at fill time, sends transactions, produces
 * signatures, posts them back to Relay, and polls each step's check endpoint
 * until the bridge settles.
 *
 * Hand-rolled (no Relay SDK) but hardened against the failure paths: single
 * in-flight run, cancellable, unmount-safe polling, tolerant of missing gas
 * fields and transient network errors.
 */
export const useExecuteSteps = () => {
  const { address, chainId } = useConnection()
  const { data: walletClient } = useWalletClient()
  const { switchChainAsync } = useSwitchChain()

  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [currentItemIndex, setCurrentItemIndex] = useState(0)
  const [status, setStatus] = useState<ExecutionStatus>("idle")
  const [isPolling, setIsPolling] = useState(false)
  const [steps, setSteps] = useState<Step[]>([])
  const [txHashes, setTxHashes] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const [checkResult, setCheckResult] = useState<CheckResultT | null>(null)
  // The fresh quote we actually fill, and how long the bridge took end-to-end.
  const [quote, setQuote] = useState<Quote | null>(null)
  const [durationMs, setDurationMs] = useState<number | null>(null)

  // Refs guard against re-entrancy and let unmount/cancel stop the async loop.
  const runningRef = useRef(false)
  const cancelledRef = useRef(false)
  const abortRef = useRef<AbortController | null>(null)
  /** Origin token for CIP-64 feeCurrency on Celo txs during the active run. */
  const executionOriginRef = useRef<{
    originCurrency: string
    originSymbol?: string
  } | null>(null)

  useEffect(() => {
    return () => {
      // Stop the in-flight loop and any pending poll when the hook unmounts.
      cancelledRef.current = true
      abortRef.current?.abort()
    }
  }, [])

  const throwIfCancelled = () => {
    if (cancelledRef.current) throw new CancelledError()
  }

  /**
   * Fetch a fresh quote for `params`, then execute its steps. Never runs a
   * frozen/stale quote — Relay revalidates quotes at fill time.
   */
  const execute = async (params: GetQuoteInput) => {
    if (runningRef.current) return // single in-flight run
    if (!walletClient || !address) {
      setError("Wallet not connected")
      setStatus("failed")
      return
    }

    runningRef.current = true
    cancelledRef.current = false
    const controller = new AbortController()
    abortRef.current = controller

    setError(null)
    setCheckResult(null)
    setTxHashes([])
    setSteps([])
    setQuote(null)
    setDurationMs(null)
    setCurrentStepIndex(0)
    setCurrentItemIndex(0)
    setStatus("fetching")
    const startedAt = nowMs()

    try {
      const freshQuote = await fetchQuote(params)
      throwIfCancelled()
      setQuote(freshQuote)
      executionOriginRef.current = {
        originCurrency: params.originCurrency,
        originSymbol: quoteOriginSymbol(freshQuote),
      }

      const stepArray = (freshQuote.steps ?? []) as Step[]
      if (stepArray.length === 0) throw new Error("No steps to execute")

      setSteps(stepArray)
      setStatus("executing")
      await processSteps(stepArray, controller.signal)

      throwIfCancelled()
      setDurationMs(nowMs() - startedAt)
      setStatus("success")
    } catch (err) {
      if (err instanceof CancelledError || isAbortError(err)) {
        setStatus("idle")
        return
      }
      setError(toUserMessage(err))
      setStatus("failed")
    } finally {
      runningRef.current = false
      setIsPolling(false)
      abortRef.current = null
    }
  }

  /** Abort an in-flight execution. On-chain txs already sent can't be undone. */
  const cancel = () => {
    cancelledRef.current = true
    abortRef.current?.abort()
    runningRef.current = false
    setIsPolling(false)
    setStatus("idle")
  }

  const processSteps = async (stepsToProcess: Step[], signal: AbortSignal) => {
    for (let stepIndex = 0; stepIndex < stepsToProcess.length; stepIndex++) {
      throwIfCancelled()
      setCurrentStepIndex(stepIndex)
      const step = stepsToProcess[stepIndex]

      if (!step.items || step.items.length === 0) continue

      for (let itemIndex = 0; itemIndex < step.items.length; itemIndex++) {
        throwIfCancelled()
        setCurrentItemIndex(itemIndex)
        const item = step.items[itemIndex]

        if (item.status === "complete") continue

        if (step.kind === "transaction") {
          await executeTransaction(item, stepIndex, itemIndex)
        } else if (step.kind === "signature") {
          await executeSignature(item, stepIndex, itemIndex)
        }

        if (item.check) {
          await pollForCompletion(item.check, stepIndex, itemIndex, signal)
        }
      }
    }
  }

  const executeTransaction = async (item: StepItem, stepIndex: number, itemIndex: number) => {
    updateStepItemStatus(stepIndex, itemIndex, "pending")

    if (!walletClient || !address) throw new Error("Wallet not connected")

    const data = item.data as TransactionStepData
    if (!("chainId" in data) || !data.to || !data.data) {
      throw new Error("Invalid transaction step data")
    }

    // MiniPay is Celo-only, so this is normally a no-op; guard for safety.
    if (data.chainId && data.chainId !== chainId) {
      await switchChainAsync({ chainId: data.chainId as WagmiChainId })
    }

    const origin = executionOriginRef.current
    if (!origin?.originCurrency) {
      throw new Error("Missing origin token for fee configuration")
    }

    let txParams
    try {
      txParams = buildMiniPaySendParams(
        data,
        address,
        origin.originCurrency,
        origin.originSymbol
      )
    } catch {
      throw new Error("UNSUPPORTED_FEE_CURRENCY")
    }

    try {
      // CIP-64 feeCurrency txs use a Celo-specific wagmi/viem union.
      const hash = await sendTransaction(
        wagmiConfig,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        txParams as any
      )
      setTxHashes((prev) => [...prev, hash])

      // Wait for the tx to be mined before moving on. Critical for approvals:
      // the next step (deposit) estimates gas against the new allowance and
      // would revert if the approval isn't confirmed yet.
      const receipt = await waitForTransactionReceipt(wagmiConfig, {
        hash,
        chainId: data.chainId as WagmiChainId,
      })
      if (receipt.status === "reverted") {
        throw new Error("TX_REVERTED")
      }

      // Steps with a `check` endpoint settle via polling; otherwise this tx is
      // done once it's mined (e.g. the ERC-20 approval).
      if (!item.check) {
        updateStepItemStatus(stepIndex, itemIndex, "complete")
      }
      return hash
    } catch (err) {
      updateStepItemStatus(stepIndex, itemIndex, "failed")
      throw normalizeRejection(err)
    }
  }

  const executeSignature = async (item: StepItem, stepIndex: number, itemIndex: number) => {
    if (!walletClient || !address) throw new Error("Wallet not connected")
    updateStepItemStatus(stepIndex, itemIndex, "pending")

    try {
      const data = item.data as SignatureStepData
      if (!("signatureKind" in data)) throw new Error("Invalid signature step data")

      if (data.signatureKind === "eip712") {
        const eip712 = data as EIP712SignatureData
        if (eip712.domain?.chainId && eip712.domain.chainId !== chainId) {
          await switchChainAsync({ chainId: eip712.domain.chainId as WagmiChainId })
        }
      }

      let signature: string
      switch (data.signatureKind) {
        case "eip191": {
          const eip191 = data as EIP191SignatureData
          signature = await walletClient.signMessage({
            account: address,
            message: eip191.message,
          })
          break
        }
        case "eip712": {
          const eip712 = data as EIP712SignatureData
          signature = await walletClient.signTypedData({
            account: address,
            domain: {
              ...eip712.domain,
              verifyingContract: eip712.domain.verifyingContract as `0x${string}`,
            },
            types: eip712.types,
            primaryType: eip712.primaryType,
            message: eip712.value,
          })
          break
        }
        default:
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          throw new Error(`Unsupported signature kind: ${(data as any).signatureKind}`)
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const postConfig = (data as any).post ?? item.post
      if (postConfig) {
        await postSignature(postConfig, signature)
      }

      updateStepItemStatus(stepIndex, itemIndex, "complete")
    } catch (err) {
      updateStepItemStatus(stepIndex, itemIndex, "failed")
      throw normalizeRejection(err)
    }
  }

  const postSignature = async (
    postConfig: {
      endpoint: string
      method?: string
      headers?: Record<string, string>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      body?: Record<string, any>
    },
    signature: string
  ) => {
    const endpoint = postConfig.endpoint.startsWith("/")
      ? `${RELAY_LINK_API_URL}${postConfig.endpoint}`
      : postConfig.endpoint

    const url = new URL(endpoint)
    url.searchParams.set("signature", signature)

    const method = (postConfig.method ?? "POST").toUpperCase()
    const isGet = method === "GET"
    const headers = isGet
      ? postConfig.headers
      : { "Content-Type": "application/json", ...postConfig.headers }
    const body = isGet ? undefined : postConfig.body ? JSON.stringify(postConfig.body) : undefined

    const resp = await fetch(url.toString(), { method, headers, body })
    if (!resp.ok) {
      const txt = await resp.text()
      throw new Error(`Failed to post signature: ${resp.status} ${resp.statusText} - ${txt}`)
    }
  }

  const pollForCompletion = async (
    check: { endpoint: string; method: string },
    stepIndex: number,
    itemIndex: number,
    signal: AbortSignal
  ) => {
    setIsPolling(true)
    const start = nowMs()
    const maxDuration = 10 * 60 * 1000 // 10 minutes
    const maxConsecutiveErrors = 8
    let interval = 3000
    let consecutiveErrors = 0

    try {
      while (nowMs() - start < maxDuration) {
        throwIfCancelled()

        try {
          const response = await fetch(`${RELAY_LINK_API_URL}${check.endpoint}`, {
            method: check.method,
            signal,
          })

          if (!response.ok) throw new Error(`Status check failed: ${response.status}`)

          const result = (await response.json()) as CheckResultT
          consecutiveErrors = 0

          if (result.status === "success") {
            updateStepItemStatus(stepIndex, itemIndex, "complete")
            setCheckResult(result)
            return result
          }
          if (result.status === "failure" || result.status === "refund") {
            updateStepItemStatus(stepIndex, itemIndex, "failed")
            setCheckResult(result)
            throw new Error(`Transaction failed with status: ${result.status}`)
          }
          // Otherwise still pending — fall through to wait.
        } catch (err) {
          if (isAbortError(err) || cancelledRef.current) throw new CancelledError()
          // A definitive failure/refund should propagate immediately.
          if (err instanceof Error && err.message.startsWith("Transaction failed")) {
            throw err
          }
          // Tolerate transient network/5xx errors up to a cap.
          if (++consecutiveErrors >= maxConsecutiveErrors) throw err
        }

        await delay(interval, signal)
        interval = Math.min(Math.floor(interval * 1.5), 10000) // backoff, cap 10s
      }

      throw new Error("Polling timed out — transaction status unknown")
    } finally {
      setIsPolling(false)
    }
  }

  const updateStepItemStatus = (stepIndex: number, itemIndex: number, stepStatus: StepStatus) => {
    setSteps((prevSteps) =>
      prevSteps.map((step, i) =>
        i !== stepIndex
          ? step
          : {
              ...step,
              items: step.items.map((it, j) =>
                j === itemIndex ? { ...it, status: stepStatus } : it
              ),
            }
      )
    )
  }

  const reset = () => {
    if (runningRef.current) cancel()
    setCurrentStepIndex(0)
    setCurrentItemIndex(0)
    setStatus("idle")
    setIsPolling(false)
    setSteps([])
    setTxHashes([])
    setError(null)
    setCheckResult(null)
    setQuote(null)
    setDurationMs(null)
  }

  return {
    execute,
    cancel,
    reset,
    // True once the injected wallet client is ready to sign/send.
    isReady: Boolean(walletClient && address),
    status,
    isExecuting: status === "fetching" || status === "executing",
    isPolling,
    currentStepIndex,
    currentItemIndex,
    steps,
    txHashes,
    error,
    checkResult,
    quote,
    durationMs,
  }
}

// Isolated so the react-hooks purity lint doesn't flag Date.now() in the hook body.
const nowMs = () => Date.now()

const delay = (ms: number, signal?: AbortSignal): Promise<void> =>
  new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException("Aborted", "AbortError"))
      return
    }
    const timer = setTimeout(resolve, ms)
    signal?.addEventListener(
      "abort",
      () => {
        clearTimeout(timer)
        reject(new DOMException("Aborted", "AbortError"))
      },
      { once: true }
    )
  })

function quoteOriginSymbol(quote: Quote): string | undefined {
  return quote.details?.currencyIn?.currency?.symbol
}

function isAbortError(err: unknown): boolean {
  return err instanceof DOMException && err.name === "AbortError"
}

function normalizeRejection(err: unknown): Error {
  if (err instanceof Error) {
    const msg = err.message
    if (
      msg.includes("User denied") ||
      msg.includes("User rejected") ||
      msg.includes("rejected the request")
    ) {
      return new Error("USER_REJECTED")
    }
    if (msg.includes("insufficient funds")) {
      return new Error("INSUFFICIENT_GAS")
    }
    if (msg === "UNSUPPORTED_FEE_CURRENCY") {
      return new Error("UNSUPPORTED_FEE_CURRENCY")
    }
    // Gas-estimation/revert dumps from viem are noisy and useless to users.
    if (
      msg === "TX_REVERTED" ||
      msg.includes("eth_estimateGas") ||
      msg.includes("execution reverted") ||
      msg.includes("reverted")
    ) {
      return new Error("TX_REVERTED")
    }
    return err
  }
  return new Error("EXECUTION_FAILED")
}

function toUserMessage(err: unknown): string {
  if (err instanceof Error) {
    switch (err.message) {
      case "USER_REJECTED":
        return "You rejected the transaction."
      case "INSUFFICIENT_GAS":
        return "Not enough stablecoin balance to cover network fees."
      case "UNSUPPORTED_FEE_CURRENCY":
        return "This token can't pay network fees on Celo. Try USDC, USDT, or USDm."
      case "TX_REVERTED":
        return "The transaction couldn't be completed. Please try again."
      case "EXECUTION_FAILED":
        return "Something went wrong. Please try again."
    }
    // Anything that slipped through: prefer a short first line over a raw dump.
    const firstLine = err.message.split("\n")[0]?.trim()
    if (!firstLine || firstLine.length > 140 || firstLine.includes("0x")) {
      return "Something went wrong. Please try again."
    }
    return firstLine
  }
  return "Something went wrong. Please try again."
}
