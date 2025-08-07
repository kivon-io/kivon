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
import ExecuteTransaction from "./execute-transaction"
import RecipientAddress from "./recipient-address"

const BridgeAction = () => {
  const {
    step,
    handleStep,
    form,
    handleSetQuote,
    handleOpenExecuteTransactionDialog,
    isExecuteTransactionDialogOpen,
    // executeSteps,
    resetExecution,
    isExecuting,
    executionStatus,
  } = useBridge()
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
    error: quoteError,
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

  const handleClick = async () => {
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
    await handleExecute()
  }

  const handleExecute = async () => {
    return
    // if (quote) {
    //   try {
    //     // Open the execution dialog immediately, before sending to wallet
    //     handleOpenExecuteTransactionDialog(true)

    //     await executeSteps(quote)
    //     resetExecution()
    //     form.reset()
    //   } catch (err) {
    //     if (err instanceof Error && err.message === "USER_REJECTED") {
    //       console.log("USER_REJECTED: ", err)
    //       resetExecution()
    //       handleOpenExecuteTransactionDialog(false)
    //     } else {
    //       console.error("Unexpected execution error: ", err)
    //     }
    //   }
    // }
  }

  useEffect(() => {
    if (quote) handleSetQuote(quote)
  }, [quote, handleSetQuote])

  useEffect(() => {
    if (!isExecuteTransactionDialogOpen) {
      resetExecution()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExecuteTransactionDialogOpen])

  // console.log("chain: ", chain)
  // console.log("origin: ", origin)

  // console.log("quote: ", quote)

  const showExecuteTransactionButtonText = () => {
    const depositStepId = quote?.steps.find((step) => step.id === "deposit")?.id
    const approveStepId = quote?.steps.find((step) => step.id === "approve")?.id
    const swapStepId = quote?.steps.find((step) => step.id === "swap")?.id

    if (depositStepId && approveStepId && swapStepId) {
      return "Approve & Swap"
    }
    if (depositStepId && approveStepId) {
      return "Approve"
    }
    return "Swap"
  }

  // get the id of each of the steps check if deposit and approve are in the steps ids and extract them
  //  show so for deposit show Swap for approve show approve and swap show swap
  // eg if a both are in the steps ids, show both Approve & Swap

  // if connected chain is not the same as origin chain, show user to switch chain

  return (
    <>
      {quoteError && !isQuoteLoading && <DataError message={quoteError.message} />}
      <Button
        onClick={handleClick}
        disabled={
          (address && (isQuoteLoading || isRefetching)) ||
          (address && step === BRIDGE_STAGES.TRANSACTION_INFORMATION && debouncedAmount <= 0) ||
          !checkChainisEnabled ||
          !!quoteError ||
          (address && hasInsufficientBalance) ||
          isExecuting
        }
        busy={address && (isQuoteLoading || isRefetching)}
        busyVariant='secondary'
        className='w-full h-12 rounded-lg bg-primary dark:bg-white dark:text-black text-lg font-medium'
      >
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
          : isExecuting && executionStatus === "executing"
          ? "Executing..."
          : isExecuting && executionStatus === "polling"
          ? "Confirming..."
          : showExecuteTransactionButtonText()}
      </Button>
      <RecipientAddress
        open={isRecipientAddressDialogOpen}
        onOpenChange={setIsRecipientAddressDialogOpen}
      />
      <ExecuteTransaction
        open={isExecuteTransactionDialogOpen}
        onOpenChange={handleOpenExecuteTransactionDialog}
      />
    </>
  )
}

export default BridgeAction
