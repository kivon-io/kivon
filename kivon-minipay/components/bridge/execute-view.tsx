"use client"

import { useRouter } from "next/navigation"
import { useEffect, useMemo, useRef } from "react"

import { BridgeCompletion } from "@/components/bridge/bridge-completion"
import { BridgeExecution } from "@/components/bridge/bridge-execution"
import { useBridge } from "@/context/bridge-context"
import { useBridgeQuote } from "@/hooks/use-bridge-quote"
import { useEffectiveRecipient } from "@/hooks/use-effective-recipient"
import { useExecuteSteps } from "@/hooks/use-execute-steps"
import { useWallet } from "@/hooks/use-wallet"
import { formatAmount } from "@/lib/bridge/format"
import { buildExecSteps, explorerTxUrl } from "@/lib/bridge/view-model"
import { CELO_CHAIN_ID } from "@/lib/network/config"
import type { GetQuoteInput } from "@/lib/relay/schemas"

export function ExecuteView() {
  const router = useRouter()
  const { origin, destination, tokenAmount } = useBridge()
  const { address, chainId } = useWallet()
  const effectiveRecipient = useEffectiveRecipient()
  const exec = useExecuteSteps()
  // Cached display quote (from the review screen) for header amounts.
  const { quote: displayQuote } = useBridgeQuote()

  const params = useMemo<GetQuoteInput | null>(() => {
    if (!origin || !destination || tokenAmount <= 0) return null
    return {
      user: address ?? origin.tokenAddress,
      originChainId: origin.chainId,
      destinationChainId: destination.chainId,
      originCurrency: origin.tokenAddress,
      destinationCurrency: destination.tokenAddress,
      amount: tokenAmount.toString(),
      decimals: origin.tokenDecimals,
      destinationVmType: destination.vmType,
      connectedChainId: chainId ?? CELO_CHAIN_ID,
      ...(effectiveRecipient && { recipient: effectiveRecipient }),
    }
  }, [origin, destination, tokenAmount, address, chainId, effectiveRecipient])

  // Bounce back to the form if we landed here without a selection.
  useEffect(() => {
    if (!origin || !destination || tokenAmount <= 0) router.replace("/bridge")
  }, [origin, destination, tokenAmount, router])

  // Kick off the bridge once the wallet client is ready. The injected wallet
  // client resolves a tick after `address`, so we must wait for `exec.isReady`
  // before calling execute — otherwise it bails with "Wallet not connected".
  const started = useRef(false)
  useEffect(() => {
    if (started.current || !params || !exec.isReady) return
    started.current = true
    exec.execute(params)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, exec.isReady])

  if (!origin || !destination) return null

  const activeQuote = exec.quote ?? displayQuote
  const receiveAmount = activeQuote?.details.currencyOut.amountFormatted ?? "0"
  const explorerUrl = explorerTxUrl(origin.chainId, exec.txHashes[0])

  if (exec.status === "success") {
    const seconds = exec.durationMs
      ? Math.max(1, Math.round(exec.durationMs / 1000))
      : activeQuote?.details.timeEstimate
    const durationLabel = seconds
      ? `${seconds} second${seconds === 1 ? "" : "s"}`
      : "moments"

    return (
      <BridgeCompletion
        sentLabel={`${formatAmount(tokenAmount, 2)} ${origin.tokenSymbol}`}
        receivedLabel={`${formatAmount(receiveAmount)} ${destination.tokenSymbol}`}
        route={`${origin.chainDisplayName} → ${destination.chainDisplayName}`}
        destChainName={destination.chainDisplayName}
        durationLabel={durationLabel}
        explorerUrl={explorerUrl}
        onDone={() => router.push("/bridge")}
      />
    )
  }

  const steps =
    exec.steps.length > 0 ? exec.steps : ((activeQuote?.steps as Step[]) ?? [])
  const execSteps = buildExecSteps({
    steps,
    currentStepIndex: exec.currentStepIndex,
    status: exec.status,
    isPolling: exec.isPolling,
    originSymbol: origin.tokenSymbol,
    destChainName: destination.chainDisplayName,
    destSymbol: destination.tokenSymbol,
  })

  const failed = exec.status === "failed"

  return (
    <BridgeExecution
      origin={origin}
      destination={destination}
      sendAmount={tokenAmount}
      receiveAmount={receiveAmount}
      statusLabel={failed ? "Bridge failed" : "In progress"}
      statusTone={failed ? "failed" : "progress"}
      timeLeftLabel={
        !failed && activeQuote?.details.timeEstimate
          ? `~${activeQuote.details.timeEstimate}s left`
          : undefined
      }
      steps={execSteps}
      helperText={
        failed
          ? exec.error || "Something went wrong. You can try again."
          : "Keep this screen open until the bridge completes."
      }
      explorerUrl={explorerUrl}
      onRetry={
        failed
          ? () => {
              if (params && exec.isReady) {
                started.current = true
                exec.execute(params)
              }
            }
          : undefined
      }
      onCancel={() => {
        exec.cancel()
        started.current = false
        router.push("/bridge")
      }}
    />
  )
}
