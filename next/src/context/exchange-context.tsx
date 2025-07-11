"use client"

import { exchangeFormSchema, ExchangeFormSchema } from "@/components/swap-zone/exchange/constants"
import { zodResolver } from "@hookform/resolvers/zod"
import { createContext, useContext, useState } from "react"
import { useForm, UseFormReturn } from "react-hook-form"

type Step = "select-coin" | "transaction-details" | "send-transaction"

const ExchangeContext = createContext<{
  form: UseFormReturn<ExchangeFormSchema>
  step: Step
  setStep: (step: Step) => void
}>({
  form: {} as UseFormReturn<ExchangeFormSchema>,
  step: "select-coin" as Step,
  setStep: () => {},
})

const ExchangeProvider = ({ children }: { children: React.ReactNode }) => {
  const [step, setStep] = useState<Step>("select-coin")

  const form = useForm<ExchangeFormSchema>({
    resolver: zodResolver(exchangeFormSchema),
    defaultValues: {
      sendToken: "",
      receiveToken: "",
      sendAmount: 0,
      destination_address: "",
      terms_and_conditions: false,
      refund_address: undefined,
      fixed_rate: undefined,
    },
  })

  const handleStep = (step: Step) => {
    setStep(step)
  }

  const values = {
    form,
    step,
    setStep: handleStep,
  }

  return <ExchangeContext.Provider value={values}>{children}</ExchangeContext.Provider>
}

export default ExchangeProvider

export const useExchange = () => {
  const context = useContext(ExchangeContext)
  if (!context) {
    throw new Error("useExchange must be used within an ExchangeProvider")
  }
  return context
}
