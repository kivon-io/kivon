"use client"

import { Button } from "@/components/ui/button"
import { useBridge } from "@/context/bridge-context"
import { trpc } from "@/trpc/client"
import { useEffect } from "react"
import { useDebounceValue } from "usehooks-ts"
import { useAccount, useConnect } from "wagmi"
import { BRIDGE_STAGES } from "./constants"

const BridgeAction = () => {
  const { step, handleStep, form, handleSetQuote } = useBridge()
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { origin, destination } = form.watch()
  const debouncedAmount = useDebounceValue(form.watch("amount"), 500)[0] || 0

  const {
    data: quote,
    isLoading: isQuoteLoading,
    isRefetching,
  } = trpc.getQuote.useQuery(
    {
      user: address!,
      originChainId: origin.chainId,
      destinationChainId: destination.chainId,
      originCurrency: origin.tokenContractAddress,
      destinationCurrency: destination.tokenContractAddress,
      amount: debouncedAmount.toString(),
      decimals: origin.tokenDecimals,
    },
    {
      enabled: !!address && !!origin && !!destination && debouncedAmount > 0,
      refetchInterval: 1000 * 60, // 1 minute
    }
  )

  useEffect(() => {
    if (quote) handleSetQuote(quote)
  }, [quote, handleSetQuote])

  const handleClick = () => {
    if (step === BRIDGE_STAGES.SELECT_ASSET) {
      handleStep(BRIDGE_STAGES.TRANSACTION_INFORMATION)
      return
    }
    // if not connected, connect to the first connector
    if (!isConnected) {
      connect({ connector: connectors[0] })
      return
    }
    // TODO: handle execution for TRANSACTION_INFORMATION
  }

  // console.log("quote: ", quote)

  return (
    <Button
      onClick={handleClick}
      disabled={
        isQuoteLoading ||
        isRefetching ||
        (address && step === BRIDGE_STAGES.TRANSACTION_INFORMATION && debouncedAmount <= 0)
      }
      busy={isQuoteLoading || isRefetching}
      busyVariant='secondary'
      className='w-full h-12 rounded-lg bg-primary dark:bg-white dark:text-black font-medium'
    >
      {/* {!isConnected
        ? "Connect Wallet"
        : step === BRIDGE_STAGES.SELECT_ASSET
        ? isQuoteLoading
          ? "Fetching quote..."
          : !quote
          ? "Get Quote"
          : "Continue"
        : "Bridge Now"} */}

      {step === BRIDGE_STAGES.SELECT_ASSET
        ? "Continue"
        : !address
        ? "Connect Wallet"
        : isQuoteLoading || isRefetching
        ? "Fetching quote..."
        : debouncedAmount <= 0
        ? "Enter Amount"
        : "Swap Now"}
    </Button>
  )
}

export default BridgeAction
