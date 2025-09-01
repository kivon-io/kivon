import { BlurImage } from "@/components/blur-image"
import TokenName from "@/components/elements/token-name"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useBridge } from "@/context/bridge-context"
import { buildBridgeTransaction } from "@/lib/transactions/build-transaction"
import { cn, formatAddress } from "@/lib/utils"
import { useDynamicWallet } from "@/lib/wallet/use-dynamic-wallet"
import { CheckResultT } from "@/lib/wallet/use-execute-steps"
import { trpc } from "@/trpc/client"
import { motion } from "framer-motion"
import Link from "next/link"
import { useEffect } from "react"
import { HiOutlineArrowRight } from "react-icons/hi"
import { LuCircleCheckBig, LuCircleX } from "react-icons/lu"
import { MdOutlineOpenInNew } from "react-icons/md"
import { BridgeImageAsset } from "./chain-image"

const ExecuteTransaction = ({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) => {
  const {
    quote,
    form,
    currentStepIndex,
    currentItemIndex,
    executionStatus,
    executionError,
    checkResult,
  } = useBridge()
  const { origin, destination } = form.watch()
  const { address } = useDynamicWallet()
  const saveTx = trpc.createTransaction.useMutation()

  // save the transaction if checkResult is success
  useEffect(() => {
    if (!quote || !checkResult || checkResult.status !== "success" || !address) return

    // Build payload from quote/check/origin/destination
    const payload = buildBridgeTransaction({
      quote,
      checkResult,
      userAddress: address,
      origin: {
        chainId: origin.chainId,
        chainName: origin.chainName,
        chainImage: origin.chainImage,
        tokenSymbol: origin.tokenSymbol,
        explorerUrl: origin.explorerUrl ?? "",
      },
      destination: {
        chainId: destination.chainId,
        chainName: destination.chainName,
        chainImage: destination.chainImage,
        tokenSymbol: destination.tokenSymbol,
        explorerUrl: destination.explorerUrl ?? "",
      },
    })

    console.log("payload: ", payload)

    saveTx.mutate(payload)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkResult?.status])

  useEffect(() => {
    if (executionStatus === "failed" && executionError === "USER_REJECTED") {
      onOpenChange(false)
    }
  }, [executionStatus, executionError, onOpenChange])

  const getStepStatus = (stepIndex: number, itemIndex: number) => {
    if (stepIndex < currentStepIndex) return "complete"
    if (stepIndex === currentStepIndex && itemIndex < currentItemIndex) return "complete"
    if (stepIndex === currentStepIndex && itemIndex === currentItemIndex) {
      return executionStatus === "executing" || executionStatus === "polling"
        ? "pending"
        : "incomplete"
    }
    return "incomplete"
  }

  if (!quote || !open) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-md '>
        <DialogHeader>
          <DialogTitle>Transaction Details</DialogTitle>
          <DialogDescription className='sr-only'>Transaction Details</DialogDescription>
        </DialogHeader>
        {checkResult?.status === "success" ? (
          <TransactionSucessful checkResult={checkResult} />
        ) : checkResult?.status === "failure" ? (
          <TransactionFailed checkResult={checkResult} />
        ) : (
          <div className='flex flex-col gap-2 mt-3'>
            <div className='grid grid-cols-12 gap-4'>
              <div className='col-span-12 md:col-span-5 bg-zinc-200/60 dark:bg-neutral-900 rounded-lg p-2.5'>
                <div className='flex flex-col gap-2 '>
                  <div className='flex items-center gap-2'>
                    <BridgeImageAsset
                      chainName={origin.chainName}
                      chainImage={origin.chainImage}
                      currencyName={origin.tokenName}
                      currencyImage={origin.tokenImage}
                    />
                  </div>
                  <TokenName className='text-sm' name={origin.chainName} />
                </div>
                <p className='text-md font-semibold'>
                  {Number(quote.details.currencyIn.amountFormatted).toFixed(7)} {origin.tokenSymbol}
                </p>
              </div>
              <div className='col-span-12 md:col-span-2 flex items-center justify-center'>
                <HiOutlineArrowRight className='size-4 text-zinc-600 dark:text-zinc-400 transform rotate-90 md:rotate-0' />
              </div>
              <div className='col-span-12 md:col-span-5 bg-zinc-200/60 dark:bg-neutral-900 rounded-lg p-2.5'>
                <div className='flex flex-col gap-2'>
                  <div className='flex items-center gap-2 relative'>
                    <BridgeImageAsset
                      chainName={destination.chainName}
                      chainImage={destination.chainImage}
                      currencyName={destination.tokenName}
                      currencyImage={destination.tokenImage}
                    />
                  </div>
                  <TokenName className='text-sm' name={destination.chainName} />
                </div>
                <p className='text-md font-semibold'>
                  {Number(quote.details.currencyOut.amountFormatted).toFixed(7)}{" "}
                  {destination.tokenSymbol}
                </p>
              </div>
            </div>
            {/* Error Display */}
            {executionError && executionError !== "USER_REJECTED" && (
              <div className='p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg'>
                <p className='text-sm text-red-600 dark:text-red-400'>
                  {executionError.includes("User denied") ||
                  executionError.includes("User rejected")
                    ? "Transaction was cancelled"
                    : executionError.includes("insufficient funds")
                      ? "Insufficient funds to complete transaction"
                      : executionError.includes("network")
                        ? "Network error occurred"
                        : "Transaction failed. Please try again."}
                </p>
              </div>
            )}

            {/* Steps Display */}
            <div className='flex flex-col gap-5 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4'>
              {quote.steps?.map((step, stepIndex) =>
                step.items?.map((item, itemIndex) => {
                  const status = getStepStatus(stepIndex, itemIndex)
                  return (
                    <div
                      key={`${stepIndex}-${itemIndex}`}
                      className='flex gap-2 items-center group'
                    >
                      <div className='relative'>
                        <div
                          className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center relative",
                            status === "complete" && "bg-emerald-500/50"
                          )}
                        >
                          {/* {status === "complete" && (
                          <svg
                            className='w-4 h-4 text-white'
                            fill='currentColor'
                            viewBox='0 0 20 20'
                          >
                            <path
                              fillRule='evenodd'
                              d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                              clipRule='evenodd'
                            />
                          </svg>
                        )}
                        ${
                          status === "complete"
                            ? "bg-emerald-500"
                            : status === "pending"
                            ? "bg-blue-500"
                            : "bg-zinc-300 dark:bg-zinc-700"
                        }
                        {status === "pending" && (
                          <div className='w-3 h-3 bg-white rounded-full animate-pulse' />
                        )} */}
                          <BlurImage
                            src={quote.details.currencyIn.currency.metadata.logoURI}
                            alt={quote.details.currencyIn.currency.symbol}
                            width={24}
                            height={24}
                            className={cn(
                              "rounded-full w-6 h-6 relative z-20 grayscale-100",
                              status === "pending" && "grayscale-0",
                              status === "complete" && "hidden"
                            )}
                          />
                          {status === "complete" && (
                            <div className='flex justify-center'>
                              <LuCircleCheckBig className='size-4 text-white' />
                            </div>
                          )}
                          {status === "pending" && (
                            <span className='absolute flex size-6 rounded-full z-10'>
                              <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary-custom opacity-75'></span>
                              <span className='absolute inline-flex size-6 rounded-full bg-secondary-custom'></span>
                            </span>
                          )}
                        </div>
                        <div className='absolute h-5 w-[1px] bg-zinc-300 dark:bg-zinc-700 top-8 left-1/2 -translate-x-1/2 group-last:hidden' />
                      </div>
                      <div className='flex flex-col flex-1'>
                        <div className='flex justify-between items-center'>
                          <p className='text-sm font-medium'>{step.action}</p>
                          <Badge
                            className={`text-xs ${
                              status === "complete"
                                ? "bg-green-500/10 text-green-500 border-green-500/20"
                                : status === "pending"
                                  ? "bg-secondary-custom/10 text-secondary-custom border-secondary-custom/20"
                                  : "bg-zinc-500/10 text-zinc-500 border-zinc-500/20"
                            }`}
                          >
                            {status === "complete"
                              ? "Complete"
                              : status === "pending"
                                ? "In Progress"
                                : "Pending"}
                          </Badge>
                        </div>
                        <p className='text-xs text-zinc-600 dark:text-zinc-400'>
                          {step.description}
                        </p>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default ExecuteTransaction

const TransactionSucessful = ({ checkResult }: { checkResult: CheckResultT }) => {
  const { handleOpenExecuteTransactionDialog, resetExecution, form, quote, handleSetQuote } =
    useBridge()
  const { origin, destination } = form.watch()

  const handleClose = () => {
    handleOpenExecuteTransactionDialog(false)
    resetExecution()
    form.setValue("amount", 0)
    handleSetQuote(null)
  }

  const requestId = quote?.steps?.find((s) => Boolean(s.requestId))?.requestId

  return (
    <div className='flex flex-col gap-3 items-center justify-center'>
      <div className='flex flex-col gap-2'>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className='relative flex items-center justify-center'
        >
          <LuCircleCheckBig className='size-10 text-emerald-500' />
        </motion.div>
        <div className='flex flex-col gap-3 w-full'>
          <p className='text-sm font-medium text-center'>Successfully completed</p>
          <div className='grid grid-cols-12 gap-2'>
            <div className='col-span-12 md:col-span-5 bg-zinc-200/60 dark:bg-neutral-900 rounded-lg p-2.5'>
              <div className='flex flex-col gap-2'>
                <div className='flex items-center gap-2 relative'>
                  <BridgeImageAsset
                    chainName={origin.chainName}
                    chainImage={origin.chainImage}
                    currencyName={origin.tokenName}
                    currencyImage={origin.tokenImage}
                  />
                </div>
                <p className='text-sm font-semibold'>
                  {Number(quote?.details.currencyIn.amountFormatted).toFixed(7)}{" "}
                  {origin.tokenSymbol}
                </p>
              </div>
            </div>
            <div className='col-span-12 md:col-span-2 flex items-center justify-center'>to</div>
            <div className='col-span-12 md:col-span-5 bg-zinc-200/60 dark:bg-neutral-900 rounded-lg p-2.5'>
              <div className='flex flex-col gap-2'>
                <div className='flex items-center gap-2 relative'>
                  <BridgeImageAsset
                    chainName={destination.chainName}
                    chainImage={destination.chainImage}
                    currencyName={destination.tokenName}
                    currencyImage={destination.tokenImage}
                  />
                </div>
                <p className='text-sm font-semibold'>
                  {Number(quote?.details.currencyOut.amountFormatted).toFixed(7)}{" "}
                  {destination.tokenSymbol}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=' w-full flex flex-col gap-2 border border-zinc-200 dark:border-zinc-800 rounded-lg p-2.5'>
        {checkResult.inTxHashes.length > 0 &&
          checkResult.inTxHashes.map((hash) => {
            const url = origin.explorerUrl + "/tx/" + hash
            return (
              <TransactionHash
                key={hash}
                text={`View ${origin.chainName} Tx`}
                hash={hash}
                url={url}
              />
            )
          })}
        {checkResult.txHashes.length > 0 &&
          checkResult.txHashes.map((hash) => {
            const url = destination.explorerUrl + "/tx/" + hash
            return (
              <TransactionHash
                key={hash}
                text={`View ${destination.chainName} Tx`}
                hash={hash}
                url={url}
              />
            )
          })}
      </div>
      <div className='w-full grid grid-cols-2 gap-3'>
        <Link href={`/transactions/${requestId}`}>
          <Button className='w-full' size='lg' variant='outline'>
            View Details
          </Button>
        </Link>
        <Button className='w-full' size='lg' onClick={handleClose}>
          Close
        </Button>
      </div>
    </div>
  )
}

const TransactionFailed = ({ checkResult }: { checkResult: CheckResultT }) => {
  const { handleOpenExecuteTransactionDialog, resetExecution, form, handleSetQuote } = useBridge()
  const { origin, destination } = form.watch()

  const handleClose = () => {
    handleOpenExecuteTransactionDialog(false)
    resetExecution()
    form.setValue("amount", 0)
    handleSetQuote(null)
  }
  return (
    <div className='flex flex-col gap-3 items-center justify-center'>
      <div className='flex flex-col gap-2'>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className='relative flex items-center justify-center'
        >
          <LuCircleX className='size-10 text-red-500' />
        </motion.div>
        <div className='flex flex-col gap-3'>
          <div className='flex flex-col gap-1'>
            <p className='text-sm font-medium text-center'>Transaction Failed</p>
            <p className='text-xs text-zinc-600 dark:text-zinc-400'>{checkResult.details}</p>
          </div>
          {/* <div className='grid grid-cols-12 gap-2'>
            <div className='col-span-12 md:col-span-5 bg-zinc-200/60 dark:bg-neutral-900 rounded-lg p-2.5'>
              <div className='flex flex-col gap-2'>
                <div className='flex items-center gap-2 relative'>
                  <BridgeImageAsset
                    chainName={origin.chainName}
                    chainImage={origin.chainImage}
                    currencyName={origin.tokenName}
                    currencyImage={origin.tokenImage}
                  />
                </div>
                <p className='text-sm font-semibold'>
                  {Number(quote?.details.currencyIn.amountFormatted).toFixed(7)}{" "}
                  {origin.tokenSymbol}
                </p>
              </div>
            </div>
            <div className='col-span-12 md:col-span-2 flex items-center justify-center'>to</div>
            <div className='col-span-12 md:col-span-5 bg-zinc-200/60 dark:bg-neutral-900 rounded-lg p-2.5'>
              <div className='flex flex-col gap-2'>
                <div className='flex items-center gap-2 relative'>
                  <BridgeImageAsset
                    chainName={destination.chainName}
                    chainImage={destination.chainImage}
                    currencyName={destination.tokenName}
                    currencyImage={destination.tokenImage}
                  />
                </div>
                <p className='text-sm font-semibold'>
                  {Number(quote?.details.currencyOut.amountFormatted).toFixed(7)}{" "}
                  {destination.tokenSymbol}
                </p>
              </div>
            </div>
          </div> */}
          <div className=' w-full flex flex-col gap-2 border border-zinc-200 dark:border-zinc-800 rounded-lg p-2.5'>
            {checkResult.inTxHashes.length > 0 &&
              checkResult.inTxHashes.map((hash) => {
                const url = origin.explorerUrl + "/tx/" + hash
                return (
                  <TransactionHash
                    key={hash}
                    text={`View ${origin.chainName} Tx`}
                    hash={hash}
                    url={url}
                  />
                )
              })}
            {checkResult.txHashes.length > 0 &&
              checkResult.txHashes.map((hash) => {
                const url = destination.explorerUrl + "/tx/" + hash
                return (
                  <TransactionHash
                    key={hash}
                    text={`View ${destination.chainName} Tx`}
                    hash={hash}
                    url={url}
                  />
                )
              })}
          </div>
        </div>
      </div>

      <Button className='w-full' size='lg' onClick={handleClose}>
        Close
      </Button>
    </div>
  )
}

const TransactionHash = ({ text, hash, url }: { text: string; hash: string; url: string }) => {
  return (
    <div className='flex flex-col gap-1'>
      <div className='flex items-center justify-between'>
        <p className='text-sm font-medium text-zinc-600 dark:text-zinc-400'>{text}</p>
        <Link
          className='flex items-center gap-1 text-secondary-custom dark:text-secondary-custom hover:text-secondary-custom/80 dark:hover:text-secondary-custom/60'
          href={url}
          target='_blank'
        >
          <p className='text-sm font-medium'>{formatAddress(hash)}</p>
          <MdOutlineOpenInNew className='size-3' />
        </Link>
      </div>
    </div>
  )
}
