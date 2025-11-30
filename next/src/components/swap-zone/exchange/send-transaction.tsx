"use client"

import Badge from "@/components/decorations/badge"
import Symbol from "@/components/elements/symbol"
import Loader from "@/components/loader"
import { Button } from "@/components/ui/button"
import { useExchange } from "@/context/exchange-context"
import { buildExchangeTransaction } from "@/lib/transactions/build-transaction"
import { trpc } from "@/trpc/client"
import { Check, Copy } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { EXCHANGE_STATUS, EXCHANGE_STEPS } from "./constants"
import TransactionStatus from "./transaction-status"

const SendTransaction = () => {
  const searchParams = useSearchParams()
  const transactionId = searchParams.get("id") || ""
  const router = useRouter()

  const [isCopied, setIsCopied] = useState(false)
  const [isCopiedAmount, setIsCopiedAmount] = useState(false)
  const [isCopiedExtraId, setIsCopiedExtraId] = useState(false)
  const { step, form, setExchangeTransactionStatus, exchangeTransactionStatus } = useExchange()

  const exchangeTransaction = form.watch("exchangeTransaction")
  const sendToken = form.watch("sendToken")

  const saveTx = trpc.createTransaction.useMutation()

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

  const { data: sendTokenInfo } = trpc.getTokenInfo.useQuery(
    {
      ticker: exchangeTransactionStatus.fromLegacyTicker,
    },
    {
      enabled:
        !!exchangeTransactionStatus.fromLegacyTicker &&
        transaction?.status === EXCHANGE_STATUS.FINISHED,
    }
  )

  const { data: receiveTokenInfo } = trpc.getTokenInfo.useQuery(
    {
      ticker: exchangeTransactionStatus.toLegacyTicker,
    },
    {
      enabled:
        !!exchangeTransactionStatus.toLegacyTicker &&
        transaction?.status === EXCHANGE_STATUS.FINISHED,
    }
  )

  const { data: chains } = trpc.getChains.useQuery(undefined, {
    enabled: transaction?.status === EXCHANGE_STATUS.FINISHED,
  })

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(transaction?.payinAddress || "")
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 2000)
  }

  const handleCopyAmount = () => {
    navigator.clipboard.writeText(transaction?.expectedAmountFrom?.toString() || "")
    setIsCopiedAmount(true)
    setTimeout(() => {
      setIsCopiedAmount(false)
    }, 2000)
  }

  const handleCopyExtraId = () => {
    navigator.clipboard.writeText(transaction?.payinExtraId || "")
    setIsCopiedExtraId(true)
    setTimeout(() => {
      setIsCopiedExtraId(false)
    }, 2000)
  }
  useEffect(() => {
    if (transaction) {
      setExchangeTransactionStatus(transaction)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transaction])

  useEffect(() => {
    if (
      !transaction ||
      transaction.status !== EXCHANGE_STATUS.FINISHED ||
      !sendTokenInfo ||
      !receiveTokenInfo
    )
      return

    const payload = buildExchangeTransaction({
      exchangeTransaction: transaction,
      origin: sendTokenInfo,
      destination: receiveTokenInfo,
      userAddress: form.watch("destination_address") as `0x${string}`,
      chains: chains || [],
      fromAmountUsd: transaction.expectedAmountFrom?.toString() || "0",
      toAmountUsd: transaction.expectedAmountTo?.toString() || "0",
    })

    saveTx.mutate(payload)
    form.reset()
    router.replace(`/transactions/${payload.external_transaction_id}`)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transaction, sendTokenInfo, receiveTokenInfo])

  if (step !== EXCHANGE_STEPS.SEND_TRANSACTION) return null

  if (isPendingTransactionStatus) {
    return <Loader className='text-secondary-custom mx-auto text-center text-lg' />
  }

  return (
    <div className='relative flex flex-col gap-8'>
      <div className='flex flex-col gap-2'>
        <h1 className='text-sm font-medium'>Please send the funds you would like to exchange</h1>
        <div className='flex flex-col gap-2 relative'>
          <div className='rounded-xl p-5 bg-zinc-100 dark:bg-neutral-900 border border-zinc-300 dark:border-zinc-800 flex flex-col gap-5'>
            <div className='flex flex-col gap-1'>
              <p className='text-xs text-zinc-700 dark:text-zinc-400'>Amount</p>
              <div className='flex items-center gap-2'>
                <div className='flex items-center gap-1 font-bold text-xl md:text-2xl'>
                  {transaction?.expectedAmountFrom}{" "}
                  <Symbol
                    className='text-zinc-800 dark:text-zinc-200 text-lg md:text-xl'
                    symbol={transaction?.fromCurrency || ""}
                  />
                </div>
                <Badge>
                  <span className='text-xs uppercase'>{transaction?.fromNetwork || ""}</span>
                </Badge>
                <Button variant='outline' size='icon' onClick={handleCopyAmount}>
                  {isCopiedAmount ? <Check /> : <Copy />}
                </Button>
              </div>
            </div>
            <div className='flex flex-col'>
              {isPendingTransactionStatus ? (
                <Loader className='text-black' />
              ) : (
                <div className='flex flex-col gap-8'>
                  <div className='flex flex-col gap-2'>
                    <p className='text-xs text-zinc-700 dark:text-zinc-400'>To this address</p>

                    <div className='flex flex-col md:flex-row gap-2 md:items-center relative w-full md:justify-between'>
                      <p className='text-zinc-700 dark:text-zinc-200 font-medium max-w-[350px] w-full break-words'>
                        {transaction?.payinAddress || ""}
                      </p>
                      <Button size='icon' variant='outline' onClick={handleCopyAddress}>
                        {isCopied ? <Check /> : <Copy />}
                      </Button>
                    </div>
                  </div>
                  {transaction?.payinExtraId && (
                    <div className='flex flex-col md:flex-row gap-2 relative w-full bg-zinc-100 dark:bg-neutral-800 rounded-lg p-4'>
                      <div className='flex flex-col'>
                        <div className='flex items-center relative flex-wrap'>
                          <span className='text-xs text-muted-foreground'>Memo</span>
                          <p className='text-zinc-700 dark:text-zinc-200 font-medium break-all'>
                            {transaction?.payinExtraId || ""}
                          </p>
                        </div>
                        <p className='text-xs text-muted-foreground'>
                          Do not forget to specify the memo while sending to {sendToken.name}{" "}
                          <span className='uppercase'>({sendToken.ticker})</span> transaction for
                          the exchange to be completed.
                        </p>
                      </div>
                      <Button
                        size='icon'
                        variant='outline'
                        onClick={handleCopyExtraId}
                        className='flex-shrink-0'
                      >
                        {isCopiedExtraId ? <Check /> : <Copy />}
                      </Button>
                    </div>
                  )}
                </div>
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
        <p className='text-xs text-zinc-700 dark:text-zinc-400'>You Get</p>
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
        <p className='text-xs text-zinc-700 dark:text-zinc-400'>Recipient Address</p>
        <div className='flex gap-2 items-center relative w-full'>
          <p className='text-zinc-700 dark:text-zinc-400 font-medium w-full break-words text-sm'>
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
        <p className='text-center text-sm text-zinc-700 dark:text-zinc-400'>
          Please wait while we process your transaction. This may take a few minutes.
        </p>
      </div>
      <div className='backdrop-blur-sm bg-zinc-100/10 dark:bg-neutral-900/10 rounded-xl w-full h-full absolute top-0 left-0' />
    </div>
  )
}
