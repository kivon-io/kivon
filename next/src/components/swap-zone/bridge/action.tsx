"use client"

import { Button } from "@/components/ui/button"
import { useBridge } from "@/context/bridge-context"
import { checkIfUserNeedsToProvideWalletAddress, isConnectedChainEnabled } from "@/lib/utils"
import { useBalanceCheck } from "@/lib/wallet/use-balance-check"
import { useDynamicWallet } from "@/lib/wallet/use-dynamic-wallet"
import { trpc } from "@/trpc/client"
import { useDynamicContext, useSwitchNetwork } from "@dynamic-labs/sdk-react-core"
import { useEffect } from "react"
import { useDebounceValue } from "usehooks-ts"
import DataError from "../network-error"
import { BRIDGE_STAGES, VM_TYPES } from "./constants"
import ExecuteTransaction from "./execute-transaction"

const BridgeAction = () => {
  const {
    step,
    handleStep,
    form,
    handleSetQuote,
    handleOpenExecuteTransactionDialog,
    isExecuteTransactionDialogOpen,
    handleOpenRecipientAddressDialog,
    executeSteps,
    resetExecution,
    isExecuting,
    executionStatus,
  } = useBridge()
  const switchNetwork = useSwitchNetwork()

  const { address, isConnected, chainId, chain, primaryWallet } = useDynamicWallet()
  const { setShowAuthFlow } = useDynamicContext()
  const { origin, destination } = form.watch()
  const debouncedAmount = useDebounceValue(form.watch("amount"), 500)[0] || 0

  const { hasInsufficientBalance } = useBalanceCheck(
    address,
    origin.tokenContractAddress,
    origin.chainId,
    debouncedAmount,
    origin.tokenIsNative
  )

  const checkChainisEnabled = isConnectedChainEnabled(origin)
  const checkifExtraWalletAddressIsNeeded = checkIfUserNeedsToProvideWalletAddress(
    destination,
    chain!
  )

  const isChainSwitched = chainId !== origin.chainId && origin.vmType === VM_TYPES.EVM
  const {
    data: quote,
    isLoading: isQuoteLoading,
    isRefetching,
    error: quoteError,
    refetch,
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
      enabled: (() => {
        const shouldEnable =
          !!origin &&
          !!destination &&
          debouncedAmount > 0 &&
          checkChainisEnabled &&
          step === BRIDGE_STAGES.TRANSACTION_INFORMATION &&
          ((isConnected && !checkifExtraWalletAddressIsNeeded) ||
            (!!form.watch("recipient") && form.watch("isRecipientAddressValid")))

        return shouldEnable
      })(),
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
      setShowAuthFlow(true)
      return
    }
    if (chainId !== origin.chainId && origin.vmType === VM_TYPES.EVM) {
      switchNetwork({ wallet: primaryWallet!, network: origin.chainId })
      return
    }

    if (checkifExtraWalletAddressIsNeeded && !form.watch("isRecipientAddressValid")) {
      handleOpenRecipientAddressDialog(true)
      return
    }

    await handleExecute()
  }

  const handleExecute = async () => {
    if (quote) {
      try {
        // Open the execution dialog immediately, before sending to wallet
        handleOpenExecuteTransactionDialog(true)

        await executeSteps(quote)
        // resetExecution()
        // form.reset({
        //   amount: 0,
        // })
      } catch (err) {
        if (err instanceof Error && err.message === "USER_REJECTED") {
          console.log("USER_REJECTED: ", err)
          resetExecution()
          handleOpenExecuteTransactionDialog(false)
        } else {
          console.error("Unexpected execution error: ", err)
        }
      }
    }
  }

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

  useEffect(() => {
    if (quote) handleSetQuote(quote)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quote])

  useEffect(() => {
    if (!isExecuteTransactionDialogOpen) {
      resetExecution()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExecuteTransactionDialogOpen])

  useEffect(() => {
    if (
      step === BRIDGE_STAGES.TRANSACTION_INFORMATION &&
      !isChainSwitched &&
      debouncedAmount > 0 &&
      checkChainisEnabled &&
      (!checkifExtraWalletAddressIsNeeded ||
        (!!form.watch("recipient") && form.watch("isRecipientAddressValid")))
    ) {
      refetch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch("origin"), form.watch("destination"), debouncedAmount])

  return (
    <>
      {quoteError && !isQuoteLoading && <DataError message={quoteError.message} />}
      <Button
        onClick={handleClick}
        disabled={
          (address && (isQuoteLoading || isRefetching)) ||
          (address &&
            step === BRIDGE_STAGES.TRANSACTION_INFORMATION &&
            !isChainSwitched &&
            debouncedAmount <= 0) ||
          !checkChainisEnabled ||
          (!isChainSwitched && !!quoteError && !checkifExtraWalletAddressIsNeeded) ||
          (address && hasInsufficientBalance) ||
          isExecuting
        }
        busy={address && (isQuoteLoading || isRefetching)}
        busyClassName='text-white'
        variant='tertiary'
        className='w-full h-12 rounded-lg'
      >
        {step === BRIDGE_STAGES.SELECT_ASSET ? (
          "Continue"
        ) : !address ? (
          "Connect Wallet"
        ) : chainId !== origin.chainId && origin.vmType === VM_TYPES.EVM ? (
          <SwitchChainText chainName={origin.chainName} />
        ) : isQuoteLoading || isRefetching ? (
          "Fetching quote..."
        ) : debouncedAmount <= 0 ? (
          "Enter Amount"
        ) : !checkChainisEnabled ? (
          `Chain is currently unavailable`
        ) : checkifExtraWalletAddressIsNeeded && !form.watch("isRecipientAddressValid") ? (
          <CheckIfUserNeedsToProvideWalletAddress chain={destination.chainName} />
        ) : hasInsufficientBalance ? (
          `Insufficient balance`
        ) : isExecuting && executionStatus === "executing" ? (
          "Executing..."
        ) : isExecuting && executionStatus === "polling" ? (
          "Confirming..."
        ) : (
          showExecuteTransactionButtonText()
        )}
      </Button>

      <ExecuteTransaction
        open={isExecuteTransactionDialogOpen}
        onOpenChange={handleOpenExecuteTransactionDialog}
      />
    </>
  )
}

export default BridgeAction

const SwitchChainText = ({ chainName }: { chainName: string }) => {
  return (
    <span>
      Switch Chain to <span className='capitalize'>{chainName}</span>{" "}
    </span>
  )
}

const CheckIfUserNeedsToProvideWalletAddress = ({ chain }: { chain: string }) => {
  return (
    <span>
      Enter <span className='capitalize'>{chain}</span> Address
    </span>
  )
}
