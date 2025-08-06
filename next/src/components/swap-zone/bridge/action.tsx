"use client"

import { Button } from "@/components/ui/button"
import { useBridge } from "@/context/bridge-context"
import { checkIfUserNeedsToProvideWalletAddress, isConnectedChainEnabled } from "@/lib/utils"
import { useBalanceCheck } from "@/lib/wallet/use-balance-check"
import { trpc } from "@/trpc/client"
import { useConnectModal } from "@rainbow-me/rainbowkit"
import { useEffect, useState } from "react"
import { useDebounceValue } from "usehooks-ts"
import { useAccount } from "wagmi"
import DataError from "../network-error"
import { BRIDGE_STAGES } from "./constants"
import RecipientAddress from "./recipient-address"

const BridgeAction = () => {
  const { step, handleStep, form, handleSetQuote } = useBridge()
  const { address, isConnected, chain } = useAccount()
  const { openConnectModal } = useConnectModal()
  const { origin, destination } = form.watch()
  const debouncedAmount = useDebounceValue(form.watch("amount"), 500)[0] || 0
  const [isRecipientAddressDialogOpen, setIsRecipientAddressDialogOpen] = useState(false)

  const { hasInsufficientBalance } = useBalanceCheck(address, origin.chainId, debouncedAmount)

  const checkChainisEnabled = isConnectedChainEnabled(origin)
  const checkifExtraWalletAddressIsNeeded = checkIfUserNeedsToProvideWalletAddress(
    destination,
    chain!
  )

  // console.log("checkifExtraWalletAddressIsNeeded: ", checkifExtraWalletAddressIsNeeded)

  // function to check if the connected chain is the same as the origin chain and the vm type of the origin chain is evm, if not return false

  const {
    data: quote,
    isLoading: isQuoteLoading,
    isRefetching,
    error,
  } = trpc.getQuote.useQuery(
    {
      user: address ? address : origin.tokenContractAddress,
      originChainId: origin.chainId,
      destinationChainId: destination.chainId,
      originCurrency: origin.tokenContractAddress,
      destinationCurrency: destination.tokenContractAddress,
      amount: debouncedAmount.toString(),
      decimals: origin.tokenDecimals,
      destinationVmType: destination.vmType,
      connectedChainId: chain?.id || 0,
      ...(checkifExtraWalletAddressIsNeeded && { recipient: form.watch("recipient") }),
    },
    {
      enabled:
        !!origin &&
        !!destination &&
        debouncedAmount > 0 &&
        checkChainisEnabled &&
        (!checkifExtraWalletAddressIsNeeded ||
          (!!form.watch("recipient") && form.watch("isRecipientAddressValid"))),
      refetchInterval: 1000 * 60, // 1 minute
      retry: 2,
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
      openConnectModal?.()
      return
    }
    if (checkifExtraWalletAddressIsNeeded) {
      setIsRecipientAddressDialogOpen(true)
      return
    }
    // TODO: handle execution for TRANSACTION_INFORMATION
  }

  // console.log("chain: ", chain)
  // console.log("origin: ", origin)

  // console.log("quote: ", quote)

  // if connected chain is not the same as origin chain, show user to switch chain

  return (
    <>
      {error && !isQuoteLoading && <DataError message={error.message} />}
      <Button
        onClick={handleClick}
        disabled={
          (address && (isQuoteLoading || isRefetching)) ||
          (address && step === BRIDGE_STAGES.TRANSACTION_INFORMATION && debouncedAmount <= 0) ||
          !checkChainisEnabled ||
          !!error ||
          (address && hasInsufficientBalance)
        }
        busy={address && (isQuoteLoading || isRefetching)}
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
          : !checkChainisEnabled
          ? `Chain is currently unavailable`
          : checkifExtraWalletAddressIsNeeded && !form.watch("isRecipientAddressValid")
          ? `Enter ${destination.chainName} Address`
          : hasInsufficientBalance
          ? `Insufficient balance`
          : "Swap Now"}
      </Button>
      <RecipientAddress
        open={isRecipientAddressDialogOpen}
        onOpenChange={setIsRecipientAddressDialogOpen}
      />
    </>
  )
}

export default BridgeAction
