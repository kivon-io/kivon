"use client"

import { exchangeFormSchema, ExchangeFormSchema } from "@/components/swap-zone/exchange/constants"
import { zodResolver } from "@hookform/resolvers/zod"
import { createContext, useContext, useEffect, useState } from "react"
import { useForm, UseFormReturn } from "react-hook-form"

type Step = "select-coin" | "transaction-details" | "send-transaction"

const ExchangeContext = createContext<{
  form: UseFormReturn<ExchangeFormSchema>
  step: Step
  currencies: Currency[]
  setStep: (step: Step) => void
}>({
  form: {} as UseFormReturn<ExchangeFormSchema>,
  step: "select-coin" as Step,
  currencies: [],
  setStep: () => {},
})

const ExchangeProvider = ({
  children,
  currencies,
}: {
  children: React.ReactNode
  currencies: Currency[]
}) => {
  const [step, setStep] = useState<Step>("select-coin")

  const form = useForm<ExchangeFormSchema>({
    resolver: zodResolver(exchangeFormSchema),
    defaultValues: {
      sendToken: {
        ticker: "",
        name: "",
        image: "",
        network: "",
        isFiat: false,
        supportsFixedRate: false,
      },
      receiveToken: {
        ticker: "",
        name: "",
        image: "",
        network: "",
        isFiat: false,
        supportsFixedRate: false,
      },
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

  // set default values using currencies[0] and currencies[1]

  useEffect(() => {
    if (currencies.length > 0) {
      form.setValue("sendToken", {
        ticker: currencies[0].ticker,
        name: currencies[0].name,
        image: currencies[0].image,
        network: currencies[0].network,
        isFiat: currencies[0].isFiat,
        supportsFixedRate: currencies[0].supportsFixedRate,
      })
      form.setValue("receiveToken", {
        ticker: currencies[1].ticker,
        name: currencies[1].name,
        image: currencies[1].image,
        network: currencies[1].network,
        isFiat: currencies[1].isFiat,
        supportsFixedRate: currencies[1].supportsFixedRate,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currencies])

  const values = {
    form,
    step,
    currencies,
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
