import Loader from "@/components/loader"
import { cn } from "@/lib/utils"
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5"

const STATUSES = ["waiting", "confirming", "exchanging", "sending", "finished"]

const statusTitles = {
  waiting: "Awaiting deposit",
  confirming: "Confirming",
  exchanging: "Exchanging",
  sending: "Sending",
  finished: "Completed",
}

const statusDescriptions = {
  waiting: "Please send the funds to the address above",
  confirming: "Transaction is being confirmed",
  exchanging: "Exchanging the requested tokens",
  sending: "Sending the exchanged tokens to your wallet",
  finished: "Transaction completed",
}

const TransactionStatus = ({ currentStatus }: { currentStatus?: string }) => {
  const currentIndex = STATUSES.indexOf(currentStatus || "waiting")

  return (
    <div className='flex flex-col gap-5 relative'>
      {STATUSES.map((status, idx) => {
        let icon = null
        if (idx < currentIndex) {
          // Passed: show check
          icon = <IoCheckmarkDoneCircleSharp className='text-emerald-600 text-2xl relative z-10' />
        } else if (idx === currentIndex) {
          // Current: show loader
          icon = <Loader className='text-secondary-custom relative left-1' />
        } else {
          // Not reached: show empty circle
          icon = (
            <div className='h-5 w-5 rounded-full relative z-10 bg-zinc-100 dark:bg-neutral-950 border border-zinc-300 dark:border-zinc-800'></div>
          )
        }
        const showLine = idx < STATUSES.length - 1

        return (
          <div
            className={cn(
              "flex gap-4 relative",
              showLine &&
                "after:absolute after:left-2.5 after:top-5 after:bottom-0 after:w-px after:bg-zinc-200 dark:after:bg-zinc-700 after:h-full transition-all duration-200",
              idx < currentIndex && "after:bg-emerald-600"
            )}
            key={status}
          >
            {icon}
            <div className='flex flex-col'>
              <p className='text-sm font-medium'>
                {statusTitles[status as keyof typeof statusTitles]}
              </p>
              <p className='text-xs text-zinc-600'>
                {statusDescriptions[status as keyof typeof statusDescriptions]}
              </p>
            </div>
          </div>
        )
      })}
      {/* {statuses.map((statusItem, index) => {
        const isCurrent = statusItem.status === status
        const showLine = index < statuses.length - 1

        return (
          <div
            className={cn(
              "flex gap-4 relative",
              showLine &&
                "after:absolute after:left-2.5 after:top-5 after:bottom-0 after:w-px after:bg-zinc-200 after:h-full"
            )}
            key={index}
          >
            {isCurrent ? (
              <Loader className=' text-secondary-custom relative left-1' />
            ) : (
              <div
                className={cn(
                  "h-5 w-5 rounded-full relative z-10 bg-zinc-100 border border-zinc-300"
                )}
              ></div>
            )}
            <div className='flex flex-col'>
              <p className='text-sm font-medium'>{statusItem.title}</p>
              <p className='text-xs text-zinc-600'>{statusItem.description}</p>
            </div>
          </div>
        )
      })} */}
    </div>
  )
}

export default TransactionStatus
