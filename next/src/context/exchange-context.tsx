"use client"

import { exchangeFormSchema, ExchangeFormSchema } from "@/components/swap-zone/exchange/constants"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSearchParams } from "next/navigation"
import { createContext, useContext, useEffect, useState } from "react"
import { useForm, UseFormReturn } from "react-hook-form"

type Step = "sc" | "td" | "st"

const ExchangeContext = createContext<{
  form: UseFormReturn<ExchangeFormSchema>
  step: Step
  currencies?: Currency[]
  exchangeTransactionStatus: ExchangeStatusResponse
  from?: string
  to?: string
  setExchangeTransactionStatus: (status: ExchangeStatusResponse) => void
  setStep: (step: Step) => void
}>({
  form: {} as UseFormReturn<ExchangeFormSchema>,
  step: "sc" as Step,
  currencies: undefined,
  exchangeTransactionStatus: {} as ExchangeStatusResponse,
  from: undefined,
  to: undefined,
  setExchangeTransactionStatus: () => {},
  setStep: () => {},
})

const ExchangeProvider = ({
  children,
  currencies,
  from,
  to,
}: {
  children: React.ReactNode
  currencies?: Currency[]
  from?: string
  to?: string
}) => {
  const searchParams = useSearchParams()
  const stepParam = searchParams.get("step")
  const [step, setStep] = useState<Step>((stepParam && (stepParam as Step)) || "sc")
  const [exchangeTransactionStatus, setExchangeTransactionStatus] =
    useState<ExchangeStatusResponse>({} as ExchangeStatusResponse)

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
      estimatedExchange: {
        rateId: undefined,
        validUntil: undefined,
        toAmount: undefined,
      },
      minExchangeAmount: undefined,
      destination_address: "",
      terms_and_conditions: true,
      refund_address: undefined,
      fixed_rate: undefined,
      isAddressValid: {
        result: false,
        message: undefined,
        isActivated: false,
      },
      exchangeTransaction: {
        id: "",
        fromAmount: 0,
        toAmount: 0,
        flow: "",
        type: "",
        payinAddress: "",
        payoutAddress: "",
        fromCurrency: "",
        toCurrency: "",
        refundAddress: "",
        fromNetwork: "",
        toNetwork: "",
        payoutExtraId: "",
        payoutExtraIdName: "",
      },
    },
  })

  const handleStep = (step: Step) => {
    setStep(step)
  }

  const handleSetExchangeTransactionStatus = (status: ExchangeStatusResponse) => {
    setExchangeTransactionStatus(status)
  }

  // set default values using currencies[0] and currencies[1]
  useEffect(() => {
    if (currencies && currencies.length > 0) {
      const currentSendToken = form.getValues("sendToken")?.ticker
      const currentReceiveToken = form.getValues("receiveToken")?.ticker

      if (!currentSendToken) {
        form.setValue("sendToken", {
          ticker: currencies[0].ticker,
          legacyTicker: currencies[0].legacyTicker,
          name: currencies[0].name,
          image: currencies[0].image,
          network: currencies[0].network,
          isFiat: currencies[0].isFiat,
          supportsFixedRate: currencies[0].supportsFixedRate,
          isExtraIdSupported: currencies[0].isExtraIdSupported,
        })
      }
      if (!currentReceiveToken) {
        form.setValue("receiveToken", {
          ticker: currencies[1].ticker,
          legacyTicker: currencies[1].legacyTicker,
          name: currencies[1].name,
          image: currencies[1].image,
          network: currencies[1].network,
          isFiat: currencies[1].isFiat,
          supportsFixedRate: currencies[1].supportsFixedRate,
          isExtraIdSupported: currencies[1].isExtraIdSupported,
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currencies])

  // set the form values if the from and to search params exist find the currency from the currencies array that matches the from and to search params and set the form values
  useEffect(() => {
    if (from && currencies && currencies.length > 0) {
      const fromCurrency = currencies.find(
        (currency) => currency.legacyTicker === from || currency.ticker === from
      )
      if (!fromCurrency) return

      form.setValue("sendToken", {
        ticker: fromCurrency.ticker,
        legacyTicker: fromCurrency.legacyTicker,
        name: fromCurrency.name,
        image: fromCurrency.image,
        network: fromCurrency.network,
        isFiat: fromCurrency.isFiat,
        supportsFixedRate: fromCurrency.supportsFixedRate,
        isExtraIdSupported: fromCurrency.isExtraIdSupported,
      })

      // Check if receiveToken is the same as from, and fix if needed
      const currentReceiveToken = form.getValues("receiveToken")?.legacyTicker
      if (currentReceiveToken === from) {
        // Pick the first currency that is not 'from'
        const newToCurrency = currencies.find((currency) => currency.legacyTicker !== from)
        if (newToCurrency) {
          form.setValue("receiveToken", {
            ticker: newToCurrency.ticker,
            legacyTicker: newToCurrency.legacyTicker,
            name: newToCurrency.name,
            image: newToCurrency.image,
            network: newToCurrency.network,
            isFiat: newToCurrency.isFiat,
            supportsFixedRate: newToCurrency.supportsFixedRate,
            isExtraIdSupported: newToCurrency.isExtraIdSupported,
          })
        }
      }
    }
    if (to && currencies && currencies.length > 0) {
      const toCurrency = currencies.find(
        (currency) => currency.legacyTicker === to || currency.ticker === to
      )
      if (!toCurrency) return

      form.setValue("receiveToken", {
        ticker: toCurrency.ticker,
        legacyTicker: toCurrency.legacyTicker,
        name: toCurrency.name,
        image: toCurrency.image,
        network: toCurrency.network,
        isFiat: toCurrency.isFiat,
        supportsFixedRate: toCurrency.supportsFixedRate,
        isExtraIdSupported: toCurrency.isExtraIdSupported,
      })
    }
  }, [from, to, currencies, form])

  const values = {
    form,
    step,
    currencies,
    exchangeTransactionStatus,
    from,
    to,
    setExchangeTransactionStatus: handleSetExchangeTransactionStatus,
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
