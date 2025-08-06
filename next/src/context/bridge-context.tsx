"use client"

import { ExchangeT } from "@/components/elements/exchange-type"
import {
  BRIDGE_STAGE_PARAM_KEY,
  BRIDGE_STAGES,
  bridgeFormSchema,
  BridgeFormSchema,
  BridgeStage,
  createBridgeTokenModel,
} from "@/components/swap-zone/bridge/constants"
import { DEFAULT_DECIMALS, EXCHANGE_TYPE } from "@/lib/shared/constants"
import { getFirstChainAndTokens } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSearchParams } from "next/navigation"
import { createContext, useContext, useEffect, useState } from "react"
import { useForm, UseFormReturn } from "react-hook-form"

const BridgeContext = createContext<{
  chains: Chain[]
  form: UseFormReturn<BridgeFormSchema>
  handleSelectToken: (
    token: BridgeFormSchema["origin"] | BridgeFormSchema["destination"],
    type: ExchangeT
  ) => void
  step: BridgeStage
  handleStep: (step: BridgeStage) => void
  quote: Quote | null
  handleSetQuote: (quote: Quote) => void
  isShowUsd: boolean
  handleToggleUsd: () => void
} | null>(null)

const BridgeProvider = ({ chains, children }: { chains: Chain[]; children: React.ReactNode }) => {
  const transactionStageParam = useSearchParams().get(BRIDGE_STAGE_PARAM_KEY)
  const [step, setStep] = useState<BridgeStage>(
    transactionStageParam ? (transactionStageParam as BridgeStage) : BRIDGE_STAGES.SELECT_ASSET
  )
  const [quote, setQuote] = useState<Quote | null>(null)
  const [isShowUsd, setIsShowUsd] = useState(false)

  const form = useForm<BridgeFormSchema>({
    resolver: zodResolver(bridgeFormSchema),
    defaultValues: {
      origin: {
        chainId: 0,
        chainName: "",
        chainDisplayName: "",
        chainSymbol: "",
        chainImage: "",
        chainContractAddress: "",
        chainDecimals: DEFAULT_DECIMALS,
        chainSupportsBridging: false,
        tokenName: "",
        tokenSymbol: "",
        tokenImage: "",
        tokenContractAddress: "",
        tokenDecimals: DEFAULT_DECIMALS,
        vmType: "",
      },
      destination: {
        chainId: 0,
        chainName: "",
        chainDisplayName: "",
        chainSymbol: "",
        chainImage: "",
        chainContractAddress: "",
        chainDecimals: DEFAULT_DECIMALS,
        chainSupportsBridging: false,
        tokenName: "",
        tokenSymbol: "",
        tokenImage: "",
        tokenContractAddress: "",
        tokenDecimals: DEFAULT_DECIMALS,
        vmType: "",
      },
      amount: 0,
      recipient: undefined,
      isRecipientAddressValid: false,
      slippage: undefined,
    },
  })

  // handle select token, based on the type, set the token
  const handleSelectToken = (
    token: BridgeFormSchema["origin"] | BridgeFormSchema["destination"],
    type: ExchangeT
  ) => {
    if (type === EXCHANGE_TYPE.SEND) {
      form.setValue("origin", token)
    } else {
      form.setValue("destination", token)
    }
    form.setValue("recipient", undefined)
  }

  const handleStep = (step: BridgeStage) => {
    setStep(step)
  }

  const handleToggleUsd = () => {
    setIsShowUsd(!isShowUsd)
  }

  const handleSetQuote = (quote: Quote) => {
    setQuote(quote)
  }

  useEffect(() => {
    if (chains && chains.length > 0) {
      const { chain, tokens } = getFirstChainAndTokens(chains)

      // Use the utility function for setting origin and destination
      form.setValue("origin", createBridgeTokenModel(tokens[0], chain))
      form.setValue("destination", createBridgeTokenModel(tokens[1], chain))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chains])

  const values = {
    chains,
    form,
    handleSelectToken,
    handleStep,
    step,
    quote,
    handleSetQuote,
    isShowUsd,
    handleToggleUsd,
  }

  return <BridgeContext.Provider value={values}>{children}</BridgeContext.Provider>
}

export default BridgeProvider

export const useBridge = () => {
  const context = useContext(BridgeContext)
  if (!context) {
    throw new Error("useBridge must be used within a BridgeProvider")
  }
  return context
}
