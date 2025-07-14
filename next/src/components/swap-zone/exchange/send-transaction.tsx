"use client"

import Badge from "@/components/decorations/badge"
import Symbol from "@/components/elements/symbol"
import Loader from "@/components/loader"
import { Button } from "@/components/ui/button"
import { useExchange } from "@/context/exchange-context"
import { trpc } from "@/trpc/client"
import { Check, Copy } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { EXCHANGE_STATUS, EXCHANGE_STEPS } from "./constants"
import TransactionComplete from "./transaction-completed"
import TransactionStatus from "./transaction-status"

const SendTransaction = () => {
  const searchParams = useSearchParams()
  const transactionId = searchParams.get("id") || ""
  const [isCopied, setIsCopied] = useState(false)
  const { step, form, setExchangeTransactionStatus } = useExchange()

  const exchangeTransaction = form.watch("exchangeTransaction")

  // get transaction status every 5 seconds
  const { data: transaction, isPending: isPendingTransactionStatus } =
    trpc.getExchangeTransactionStatus.useQuery(
      {
        id: exchangeTransaction.id || transactionId,
      },
      {
        enabled: !!exchangeTransaction.id || !!transactionId,
        refetchInterval: (query) => {
          const data = query.state.data as ExchangeStatusResponse | undefined
          if (
            data?.status === EXCHANGE_STATUS.FINISHED ||
            data?.status === EXCHANGE_STATUS.FAILED ||
            data?.status === EXCHANGE_STATUS.REFUNDED
          ) {
            return false
          }
          return 10000 // 10 seconds
        },
      }
    )

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(transaction?.payinAddress || "")
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 2000)
  }

  useEffect(() => {
    if (transaction) {
      setExchangeTransactionStatus(transaction)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transaction])

  if (step !== EXCHANGE_STEPS.SEND_TRANSACTION) return null

  return transaction && transaction.status === EXCHANGE_STATUS.FINISHED ? (
    <TransactionComplete />
  ) : (
    transaction && (
      <div className='relative flex flex-col gap-8'>
        <div className='flex flex-col gap-2'>
          <h1 className='text-sm font-medium'>Please send the funds you would like to exchange</h1>
          <div className='flex flex-col gap-2 relative'>
            <div className='rounded-xl p-5 bg-zinc-100 border border-zinc-300 flex flex-col gap-5'>
              <div className='flex flex-col gap-1'>
                <p className='text-xs text-zinc-700'>Amount</p>
                <div className='flex items-center gap-2'>
                  <div className='flex items-center gap-1 font-bold text-xl md:text-2xl'>
                    {transaction?.expectedAmountFrom}{" "}
                    <Symbol
                      className='text-zinc-800 text-lg md:text-xl'
                      symbol={transaction?.fromCurrency || ""}
                    />
                  </div>
                  <Badge>
                    <span className='text-xs uppercase'>{transaction?.fromNetwork || ""}</span>
                  </Badge>
                </div>
              </div>
              <div className='flex flex-col'>
                {isPendingTransactionStatus ? (
                  <Loader className='text-black' />
                ) : (
                  <>
                    <p className='text-xs text-zinc-700'>To this address</p>

                    <div className='flex flex-col md:flex-row gap-2 md:items-center relative w-full'>
                      <p className='text-zinc-700 font-medium max-w-[350px] w-full break-words'>
                        {transaction?.payinAddress || ""}
                      </p>
                      <Button size='icon' variant='outline' onClick={handleCopyAddress}>
                        {isCopied ? <Check /> : <Copy />}
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
            {transaction?.status === EXCHANGE_STATUS.CONFIRMING ||
            transaction?.status === EXCHANGE_STATUS.EXCHANGING ||
            transaction?.status === EXCHANGE_STATUS.SENDING ? (
              <ProcessingTransaction />
            ) : null}
          </div>
        </div>

        <TransactionStatus currentStatus={transaction?.status} />
        {isPendingTransactionStatus ? (
          <Loader className='text-black' />
        ) : (
          transaction && <ReceiveDetails exchangeTransaction={transaction} />
        )}
      </div>
    )
  )
}

export default SendTransaction

const ReceiveDetails = ({
  exchangeTransaction,
}: {
  exchangeTransaction: ExchangeStatusResponse
}) => {
  return (
    <div className='flex flex-col gap-5'>
      <div className='flex flex-col gap-1'>
        <p className='text-xs text-zinc-700'>You Get</p>
        <div className='flex items-center gap-2'>
          <div className='flex items-center gap-1 font-bold text-xl md:text-2xl'>
            {exchangeTransaction.expectedAmountTo}{" "}
            <Symbol
              className='text-zinc-800 text-lg md:text-xl'
              symbol={exchangeTransaction.toCurrency || ""}
            />
          </div>
          <Badge>
            <span className='text-xs uppercase'>{exchangeTransaction.toNetwork}</span>
          </Badge>
        </div>
      </div>
      <div className='flex flex-col'>
        <p className='text-xs text-zinc-700'>Recepient Address</p>
        <div className='flex gap-2 items-center relative w-full'>
          <p className='text-zinc-700 font-medium w-full break-words text-sm'>
            {exchangeTransaction.payoutAddress}
          </p>
        </div>
      </div>
    </div>
  )
}

const ProcessingTransaction = () => {
  return (
    <div className='absolute top-0 left-0 w-full h-full rounded-xl overflow-hidden'>
      <div className='relative z-20 h-full flex flex-col items-center justify-center gap-2 p-4'>
        <h1 className='text-center text-lg font-medium'>We are processing your transaction...</h1>
        <p className='text-center text-sm text-zinc-700'>
          Please wait while we process your transaction. This may take a few minutes.
        </p>
      </div>
      <div className='backdrop-blur-sm bg-zinc-100/10 rounded-xl w-full h-full absolute top-0 left-0' />
    </div>
  )
}
