import Badge from "@/components/decorations/badge"
import Symbol from "@/components/elements/symbol"
import Loader from "@/components/loader"
import { Button } from "@/components/ui/button"
import { useExchange } from "@/context/exchange-context"
import { cn } from "@/lib/utils"
import { Copy } from "lucide-react"
import { EXCHANGE_STEPS } from "./constants"

const TRANSACTION_STATUS = {
  AWAITING_PAYMENT: "awaiting_payment",
  AWAITING_CONFIRMATION: "confirming",
  EXCHANGING: "exchanging",
  SENDING: "sending",
  COMPLETED: "completed",
}

const currentTransactionStatus = TRANSACTION_STATUS.AWAITING_PAYMENT

const statuses = [
  {
    status: TRANSACTION_STATUS.AWAITING_PAYMENT,
    title: "Awaiting deposit",
    description: "Please send the funds to the address below",
  },
  {
    status: TRANSACTION_STATUS.AWAITING_CONFIRMATION,
    title: "Confirming",
    description: "Transaction is being confirmed",
  },
  {
    status: TRANSACTION_STATUS.EXCHANGING,
    title: "Exchanging",
    description: "Exchanging the requested tokens",
  },
  {
    status: TRANSACTION_STATUS.SENDING,
    title: "Sending",
    description: "Sending the exchanged tokens to your wallet",
  },
  {
    status: TRANSACTION_STATUS.COMPLETED,
    title: "Completed",
    description: "Transaction completed",
  },
]

const SendTransaction = () => {
  const { step } = useExchange()

  if (step !== EXCHANGE_STEPS.SEND_TRANSACTION) return null

  return (
    <div className='relative flex flex-col gap-8'>
      <div className='flex flex-col gap-2'>
        <h1 className='text-sm font-medium'>Please send the funds you would like to exchange</h1>
        <div className='rounded-xl p-5 bg-zinc-100 border border-zinc-300 flex flex-col gap-5'>
          <div className='flex flex-col gap-1'>
            <p className='text-xs text-zinc-700'>Amount</p>
            <div className='flex items-center gap-2'>
              <div className='flex items-center gap-1 font-bold text-xl md:text-2xl'>
                2 <Symbol className='text-zinc-800 text-lg md:text-xl' symbol='ETH' />
              </div>
              <Badge>
                <span className='text-xs'>Base</span>
              </Badge>
            </div>
          </div>
          <div className='flex flex-col'>
            <p className='text-xs text-zinc-700'>To this address</p>
            <div className='flex flex-col md:flex-row gap-2 md:items-center relative w-full'>
              <p className='text-zinc-700 font-medium max-w-[350px] w-full break-words'>
                0x1234567890123456789012345678901234567890
              </p>
              <Button size='icon' variant='outline'>
                <Copy />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <TransactionStatus status={currentTransactionStatus} />
      <ReceiveDetails />
    </div>
  )
}

export default SendTransaction

const TransactionStatus = ({ status }: { status: string }) => {
  return (
    <div className='flex flex-col gap-5 relative'>
      {statuses.map((statusItem, index) => {
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
      })}
    </div>
  )
}

const ReceiveDetails = () => {
  return (
    <div className='flex flex-col gap-5'>
      <div className='flex flex-col gap-1'>
        <p className='text-xs text-zinc-700'>You Get</p>
        <div className='flex items-center gap-2'>
          <div className='flex items-center gap-1 font-bold text-xl md:text-2xl'>
            0.2186 <Symbol className='text-zinc-800 text-lg md:text-xl' symbol='ETH' />
          </div>
          <Badge>
            <span className='text-xs'>Base</span>
          </Badge>
        </div>
      </div>
      <div className='flex flex-col'>
        <p className='text-xs text-zinc-700'>Recepient Address</p>
        <div className='flex gap-2 items-center relative w-full'>
          <p className='text-zinc-700 font-medium w-full break-words text-sm'>
            0x1234567890123456789012345678901234567890
          </p>
        </div>
      </div>
    </div>
  )
}
