import { Button } from "@/components/ui/button"
import { useExchange } from "@/context/exchange-context"
import { useRouter } from "next/navigation"
import { EXCHANGE_STATUS, EXCHANGE_STEPS } from "./constants"

const CancelTransaction = () => {
  const { form, setStep, setExchangeTransactionStatus, exchangeTransactionStatus } = useExchange()
  const router = useRouter()

  const handleCancelTransaction = () => {
    setStep(EXCHANGE_STEPS.SELECT_COIN)
    setExchangeTransactionStatus({} as ExchangeStatusResponse)
    form.reset()
    router.push("/swap")
  }

  if (!exchangeTransactionStatus.id) return null
  if (
    exchangeTransactionStatus.status === EXCHANGE_STATUS.FINISHED ||
    exchangeTransactionStatus.status === EXCHANGE_STATUS.FAILED ||
    exchangeTransactionStatus.status === EXCHANGE_STATUS.REFUNDED ||
    exchangeTransactionStatus.status !== EXCHANGE_STATUS.WAITING
  )
    return null

  return (
    <Button variant='outline' onClick={handleCancelTransaction}>
      Cancel Transaction
    </Button>
  )
}

export default CancelTransaction
