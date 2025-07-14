"use client"

import Badge from "@/components/decorations/badge"
import Symbol from "@/components/elements/symbol"
import Loader from "@/components/loader"
import { Button } from "@/components/ui/button"
import { useExchange } from "@/context/exchange-context"
import { trpc } from "@/trpc/client"
import { Check, Copy } from "lucide-react"
import { useEffect, useState } from "react"
import { EXCHANGE_STEPS, ExchangeFormSchema } from "./constants"
import TransactionStatus from "./transaction-status"

const SendTransaction = () => {
  const [isCopied, setIsCopied] = useState(false)
  const { step, form, setExchangeTransactionStatus } = useExchange()

  const exchangeTransaction = form.watch("exchangeTransaction")

  // get transaction status every 5 seconds
  const { data: transactionStatus, isPending: isPendingTransactionStatus } =
    trpc.getExchangeTransactionStatus.useQuery(
      {
        id: exchangeTransaction.id,
      },
      {
        enabled: !!exchangeTransaction.id,
        refetchInterval: 10000, // 10 seconds
      }
    )

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(exchangeTransaction.payinAddress)
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 2000)
  }

  useEffect(() => {
    if (transactionStatus) {
      setExchangeTransactionStatus(transactionStatus)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionStatus])

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
                {exchangeTransaction.fromAmount}{" "}
                <Symbol
                  className='text-zinc-800 text-lg md:text-xl'
                  symbol={exchangeTransaction.fromCurrency}
                />
              </div>
              <Badge>
                <span className='text-xs uppercase'>{exchangeTransaction.fromNetwork}</span>
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
                    {exchangeTransaction.payinAddress}
                  </p>
                  <Button size='icon' variant='outline' onClick={handleCopyAddress}>
                    {isCopied ? <Check /> : <Copy />}
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <TransactionStatus currentStatus={transactionStatus?.status} />
      <ReceiveDetails exchangeTransaction={exchangeTransaction} />
    </div>
  )
}

export default SendTransaction

const ReceiveDetails = ({
  exchangeTransaction,
}: {
  exchangeTransaction: ExchangeFormSchema["exchangeTransaction"]
}) => {
  return (
    <div className='flex flex-col gap-5'>
      <div className='flex flex-col gap-1'>
        <p className='text-xs text-zinc-700'>You Get</p>
        <div className='flex items-center gap-2'>
          <div className='flex items-center gap-1 font-bold text-xl md:text-2xl'>
            {exchangeTransaction.toAmount}{" "}
            <Symbol
              className='text-zinc-800 text-lg md:text-xl'
              symbol={exchangeTransaction.toCurrency}
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
