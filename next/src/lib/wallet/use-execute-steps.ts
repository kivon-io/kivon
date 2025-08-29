import transactionFailed from "@/data/transaction-failed.json"
import transactionHash from "@/data/transaction-hash.json"
import { RELAY_LINK_API_URL, SIMMULATE_FAILED } from "@/lib/shared/constants"
import { useState } from "react"
import { useSwitchChain, useWalletClient } from "wagmi"
import { sendTransaction } from "wagmi/actions"
import { useDynamicWallet } from "./use-dynamic-wallet"
import { wagmiConfig } from "./wagmi"

export type StepStatus = "incomplete" | "pending" | "complete" | "failed"

export type ExecutionStatus = "idle" | "executing" | "polling" | "success" | "failed"

export type CheckResultT = {
  status: "success" | "failure" | "refund"
  details: string
  inTxHashes: string[]
  txHashes: string[]
  time: number
  originChainId: number
  destinationChainId: number
}

export const useExecuteSteps = () => {
  const { address, chainId } = useDynamicWallet()
  const { data: walletClient } = useWalletClient()
  const { switchChainAsync } = useSwitchChain()

  //   const { writeContract } = useWriteContract()

  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [currentItemIndex, setCurrentItemIndex] = useState(0)
  const [executionStatus, setExecutionStatus] = useState<ExecutionStatus>("idle")
  const [steps, setSteps] = useState<Step[]>([])
  const [error, setError] = useState<string | null>(null)
  const [checkResult, setCheckResult] = useState<CheckResultT | null>(null)
  const [simulate, setSimulate] = useState<boolean>(
    process.env.NEXT_PUBLIC_SIMULATE_EXECUTION === "true"
  )

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

  const executeSteps = async (quote: Quote) => {
    if (!quote.steps || quote.steps.length === 0) {
      setError("No steps to execute")
      return
    }

    // Cast incoming quote steps to our Step type
    const stepArray = quote.steps as Step[]
    setSteps(stepArray)
    setExecutionStatus("executing")
    setError(null)
    setCheckResult(null)
    setCurrentStepIndex(0)
    setCurrentItemIndex(0)

    try {
      await processSteps(stepArray)
    } catch (err) {
      // propagate user rejection to caller
      if (err instanceof Error && err.message === "USER_REJECTED") {
        throw err
      }
      setError(err instanceof Error ? err.message : "Execution failed")
      setExecutionStatus("failed")
    }
  }

  const processSteps = async (stepsToProcess: Step[]) => {
    for (let stepIndex = 0; stepIndex < stepsToProcess.length; stepIndex++) {
      setCurrentStepIndex(stepIndex)
      const step = stepsToProcess[stepIndex]

      // Skip steps with no items
      if (!step.items || step.items.length === 0) {
        continue
      }

      for (let itemIndex = 0; itemIndex < step.items.length; itemIndex++) {
        setCurrentItemIndex(itemIndex)
        const item = step.items[itemIndex]

        if (item.status === "complete") {
          continue
        }

        if (step.kind === "transaction") {
          await executeTransaction(item)
        } else if (step.kind === "signature") {
          await executeSignature(item)
        }

        // Poll for completion if check endpoint exists
        if (item.check) {
          await pollForCompletion(item.check)
        }
      }
    }

    setExecutionStatus("success")
  }

  const executeTransaction = async (item: StepItem) => {
    // Always mark as pending first so UI updates immediately
    updateStepItemStatus(currentStepIndex, currentItemIndex, "pending")

    if (simulate) {
      // Simulate a 10s execution delay then mark complete
      await delay(5_000)
      updateStepItemStatus(currentStepIndex, currentItemIndex, "complete")
      return
    }

    if (!walletClient || !address) {
      throw new Error("Wallet not connected")
    }

    // Type guard to ensure this is transaction data
    const data = item.data as TransactionStepData
    if (!("chainId" in data)) {
      throw new Error("Invalid transaction step data")
    }

    if (data.chainId && data.chainId !== chainId) {
      await switchChainAsync({ chainId: data.chainId })
    }

    try {
      const hash = await sendTransaction(wagmiConfig, {
        account: address,
        to: data.to as `0x${string}`,
        data: data.data as `0x${string}`,
        value: BigInt(data.value),
        gas: BigInt(data.gas),
        maxFeePerGas: BigInt(data.maxFeePerGas),
        maxPriorityFeePerGas: BigInt(data.maxPriorityFeePerGas),
        chainId: data.chainId as 1,
      })

      return hash
    } catch (err) {
      updateStepItemStatus(currentStepIndex, currentItemIndex, "failed")

      // Handle user rejection specifically
      if (err instanceof Error) {
        if (err.message.includes("User denied") || err.message.includes("User rejected")) {
          throw new Error("USER_REJECTED")
        }
      }

      throw err
    }
  }

  const executeSignature = async (item: StepItem) => {
    // Sim mode
    if (simulate) {
      updateStepItemStatus(currentStepIndex, currentItemIndex, "pending")
      await delay(1000)
      updateStepItemStatus(currentStepIndex, currentItemIndex, "complete")
      return
    }

    if (!walletClient || !address) throw new Error("Wallet not connected")
    updateStepItemStatus(currentStepIndex, currentItemIndex, "pending")

    try {
      const data = item.data as SignatureStepData
      if (!("signatureKind" in data)) throw new Error("Invalid signature step data")

      // Optional: align chain for EIP-712
      if (data.signatureKind === "eip712") {
        const eip712 = data as EIP712SignatureData
        if (eip712.domain?.chainId && eip712.domain.chainId !== chainId) {
          await switchChainAsync({ chainId: eip712.domain.chainId })
        }
      }

      let signature: string
      switch (data.signatureKind) {
        case "eip191": {
          const eip191 = data as EIP191SignatureData
          signature = await walletClient.signMessage({ account: address, message: eip191.message })
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
            types: eip712.types, // exclude EIP712Domain key as per viem convention
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
        const body = isGet
          ? undefined
          : postConfig.body
            ? JSON.stringify(postConfig.body)
            : undefined

        const resp = await fetch(url.toString(), { method, headers, body })
        if (!resp.ok) {
          const txt = await resp.text()
          throw new Error(`Failed to post signature: ${resp.status} ${resp.statusText} - ${txt}`)
        }
      }

      updateStepItemStatus(currentStepIndex, currentItemIndex, "complete")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      updateStepItemStatus(currentStepIndex, currentItemIndex, "failed")
      try {
        const { UserRejectedRequestError } = await import("viem")
        if (err instanceof UserRejectedRequestError) throw new Error("USER_REJECTED")
      } catch {
        /* ignore dynamic import issues */
      }
      if (err?.message?.includes("User denied") || err?.message?.includes("User rejected")) {
        throw new Error("USER_REJECTED")
      }
      throw err
    }
  }

  const pollForCompletion = async (check: { endpoint: string; method: string }) => {
    if (simulate && !SIMMULATE_FAILED) {
      // In simulate mode, consider the item complete already and skip remote polling
      updateStepItemStatus(currentStepIndex, currentItemIndex, "complete")
      setCheckResult(transactionHash as unknown as CheckResultT)
      return transactionHash
    } else if (simulate && SIMMULATE_FAILED) {
      updateStepItemStatus(currentStepIndex, currentItemIndex, "failed")
      setExecutionStatus("failed")
      setCheckResult(transactionFailed as unknown as CheckResultT)
      return transactionFailed
    }

    setExecutionStatus("polling")
    const maxAttempts = 60 // 5 minutes with 5 second intervals
    let attempts = 0

    while (attempts < maxAttempts) {
      try {
        const response = await fetch(`${RELAY_LINK_API_URL}${check.endpoint}`, {
          method: check.method,
        })

        if (!response.ok) {
          throw new Error(`Status check failed: ${response.status}`)
        }

        const result = await response.json()
        // console.log("attempt result: ", { attempts, result })

        if (result.status === "success") {
          updateStepItemStatus(currentStepIndex, currentItemIndex, "complete")
          setCheckResult(result)
          // console.log("attempt: ", result)
          return result
        } else if (result.status === "failure" || result.status === "refund") {
          updateStepItemStatus(currentStepIndex, currentItemIndex, "failed")
          setExecutionStatus("failed")
          setCheckResult(result)
          throw new Error(`Transaction failed with status: ${result.status}`)
        }

        // Wait 5 seconds before next poll
        await new Promise((resolve) => setTimeout(resolve, 5000))
        attempts++
      } catch (err) {
        if (attempts === maxAttempts - 1) {
          throw err
        }
        await new Promise((resolve) => setTimeout(resolve, 5000))
        attempts++
      }
    }

    throw new Error("Polling timeout - transaction status unknown")
  }

  const updateStepItemStatus = (stepIndex: number, itemIndex: number, status: StepStatus) => {
    setSteps((prevSteps) => {
      const newSteps = [...prevSteps]
      if (newSteps[stepIndex]?.items[itemIndex]) {
        newSteps[stepIndex].items[itemIndex].status = status
      }
      return newSteps
    })
  }

  const reset = () => {
    setCurrentStepIndex(0)
    setCurrentItemIndex(0)
    setExecutionStatus("idle")
    setSteps([])
    setError(null)
    setCheckResult(null)
  }

  return {
    executeSteps,
    currentStepIndex,
    currentItemIndex,
    executionStatus,
    steps,
    error,
    reset,
    isExecuting: executionStatus === "executing" || executionStatus === "polling",
    simulate,
    setSimulate,
    checkResult,
  }
}
