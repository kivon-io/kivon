import { BlurImage } from "@/components/blur-image"
import TokenName from "@/components/elements/token-name"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useBridge } from "@/context/bridge-context"
import { cn } from "@/lib/utils"
import { useEffect } from "react"
import { HiOutlineArrowRight } from "react-icons/hi"
import { BridgeImageAsset } from "./chain-image"

const ExecuteTransaction = ({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) => {
  const { quote, form, currentStepIndex, currentItemIndex, executionStatus, executionError } =
    useBridge()
  const { origin, destination } = form.watch()

  // useEffect(() => {
  //   if (!open) {
  //     reset()
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [open])

  // const handleExecute = async () => {
  //   if (quote) {
  //     try {
  //       await executeSteps(quote)
  //     } catch (err) {
  //       // Close dialog if user rejected the transaction
  //       console.log("err", err)
  //       if (err instanceof Error && err.message === "USER_REJECTED") {
  //         onOpenChange(false)
  //       }
  //     }
  //   }
  // }

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
                {executionError.includes("User denied") || executionError.includes("User rejected")
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
                  <div key={`${stepIndex}-${itemIndex}`} className='flex gap-2 items-center group'>
                    <div className='relative'>
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center relative`}
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
                            status === "pending" && "grayscale-0"
                          )}
                        />
                        {status === "pending" && (
                          <span className='absolute flex size-6 rounded-full z-10'>
                            <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75'></span>
                            <span className='absolute inline-flex size-6 rounded-full bg-blue-500'></span>
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
                              ? "bg-blue-500/10 text-blue-500 border-blue-500/20"
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
                      <p className='text-xs text-zinc-600 dark:text-zinc-400'>{step.description}</p>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ExecuteTransaction

{
  /* Execute Button */
}
{
  /* <div className='flex gap-2 mt-4'>
            <Button
              onClick={handleExecute}
              disabled={isExecuting || executionStatus === "success"}
              className='flex-1'
              size='lg'
              variant={executionStatus === "success" ? "outline" : "default"}
            >
              {executionStatus === "success"
                ? "Transaction Complete"
                : isExecuting
                ? executionStatus === "polling"
                  ? "Confirming..."
                  : "Executing..."
                : "Execute Transaction"}
            </Button>
            {executionStatus === "success" && (
              <Button variant='outline' onClick={() => onOpenChange(false)}>
                Close
              </Button>
            )}
          </div> */
}
