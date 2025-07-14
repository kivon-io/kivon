"use client"

import { useExchange } from "@/context/exchange-context"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { EXCHANGE_STATUS, EXCHANGE_STEPS } from "./exchange/constants"

const NewTransaction = () => {
  const router = useRouter()
  const { form, exchangeTransactionStatus, setStep, setExchangeTransactionStatus } = useExchange()

  const isFinished =
    exchangeTransactionStatus.status === EXCHANGE_STATUS.FINISHED ||
    exchangeTransactionStatus.status === EXCHANGE_STATUS.FAILED ||
    exchangeTransactionStatus.status === EXCHANGE_STATUS.REFUNDED

  const handleNewTransaction = () => {
    setStep(EXCHANGE_STEPS.SELECT_COIN)
    form.reset()
    setExchangeTransactionStatus({} as ExchangeStatusResponse)
    router.push("/exchange")
  }

  console.log("EXCHANGE TRANSACTION STATUS: ", exchangeTransactionStatus)
  return isFinished ? (
    <Button onClick={handleNewTransaction} className='w-full h-12'>
      New Transaction
    </Button>
  ) : null
}

export default NewTransaction
