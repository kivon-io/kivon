import { Button } from "@/components/ui/button"
import { useExchange } from "@/context/exchange-context"
import { useMemo } from "react"
import { EXCHANGE_STEPS } from "./constants"

// go to next step if the required fields for the current step are filled
// on the last after the transaction details are shown for the user to send the money, show the cancellation button

const ExchangeAction = () => {
  const { step, form, setStep } = useExchange()

  const sendToken = form.watch("sendToken")
  const receiveToken = form.watch("receiveToken")
  const sendAmount = form.watch("sendAmount")
  const destinationAddress = form.watch("destination_address")
  const termsAndConditions = form.watch("terms_and_conditions")

  const isNextStepEnabled = useMemo(() => {
    if (step === EXCHANGE_STEPS.SELECT_COIN) {
      return !!sendToken && !!receiveToken
    }

    if (step === EXCHANGE_STEPS.TRANSACTION_DETAILS) {
      return !!sendAmount && !!destinationAddress && termsAndConditions
    }

    return false
  }, [step, sendToken, receiveToken, sendAmount, destinationAddress, termsAndConditions])

  const handleNextStep = () => {
    if (step === EXCHANGE_STEPS.SELECT_COIN) {
      setStep(EXCHANGE_STEPS.TRANSACTION_DETAILS)
    }

    if (step === EXCHANGE_STEPS.TRANSACTION_DETAILS) {
      setStep(EXCHANGE_STEPS.SEND_TRANSACTION)
    }
  }

  if (step === EXCHANGE_STEPS.SEND_TRANSACTION) return null

  return (
    <Button
      onClick={handleNextStep}
      className='w-full h-12 rounded-lg'
      disabled={!isNextStepEnabled}
    >
      {step !== EXCHANGE_STEPS.TRANSACTION_DETAILS ? "Continue" : "Start Transaction"}
    </Button>
  )
}

export default ExchangeAction
