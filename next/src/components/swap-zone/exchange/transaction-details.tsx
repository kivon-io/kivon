import { useExchange } from "@/context/exchange-context"
import { EXCHANGE_STEPS } from "./constants"

const TransactionDetails = () => {
  const { step } = useExchange()

  if (step !== EXCHANGE_STEPS.TRANSACTION_DETAILS) return null

  return <div>TransactionDetails</div>
}

export default TransactionDetails
