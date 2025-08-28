"use client"

import { ExchangeT } from "@/components/elements/exchange-type"
import {
  BRIDGE_STAGES,
  bridgeFormSchema,
  BridgeFormSchema,
  BridgeStage,
  createBridgeTokenModel,
} from "@/components/swap-zone/bridge/constants"
import { useBridgePersistence } from "@/hooks/use-bridge-persistence"
import { useBridgeUrl } from "@/hooks/use-bridge-url"
import { DEFAULT_DECIMALS, EXCHANGE_TYPE } from "@/lib/shared/constants"
import { getFirstChainAndTokens } from "@/lib/utils"
import { CheckResultT, useExecuteSteps } from "@/lib/wallet/use-execute-steps"
import { zodResolver } from "@hookform/resolvers/zod"

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
  handleSetQuote: (quote: Quote | null) => void
  isShowUsd: boolean
  handleToggleUsd: () => void
  isExecuteTransactionDialogOpen: boolean
  handleOpenExecuteTransactionDialog: (status: boolean) => void
  // Execution state & actions
  executeSteps: (quote: Quote) => Promise<void>
  currentStepIndex: number
  currentItemIndex: number
  executionStatus: string
  executionSteps: Step[]
  executionError: string | null
  resetExecution: () => void
  isExecuting: boolean
  checkResult: CheckResultT | null
  isRecipientAddressDialogOpen: boolean
  handleOpenRecipientAddressDialog: (status: boolean) => void
} | null>(null)

const BridgeProvider = ({ chains, children }: { chains: Chain[]; children: React.ReactNode }) => {
  const { setOriginParams, setDestinationParams, setStepParam } = useBridgeUrl()

  const [step, setStep] = useState<BridgeStage>(BRIDGE_STAGES.SELECT_ASSET)
  const [quote, setQuote] = useState<Quote | null>(null)
  const [isShowUsd, setIsShowUsd] = useState(false)
  const [isExecuteTransactionDialogOpen, setIsExecuteTransactionDialogOpen] = useState(false)
  const [isRecipientAddressDialogOpen, setIsRecipientAddressDialogOpen] = useState(false)

  const {
    executeSteps,
    currentStepIndex,
    currentItemIndex,
    executionStatus,
    steps: executionSteps,
    error: executionError,
    reset: resetExecution,
    isExecuting,
    checkResult,
  } = useExecuteSteps()

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
        explorerUrl: "",
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
        explorerUrl: "",
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
      // Update URL params for origin token
      setOriginParams(token.tokenContractAddress, token.chainId)
    } else {
      form.setValue("destination", token)
      // Update URL params for destination token
      setDestinationParams(token.tokenContractAddress, token.chainId)
    }
    form.setValue("recipient", undefined)
  }

  const handleStep = (step: BridgeStage) => {
    setStep(step)
    // Update URL parameter to reflect current step
    setStepParam(step)
  }

  const handleToggleUsd = () => {
    setIsShowUsd(!isShowUsd)
  }

  const handleSetQuote = (quote: Quote | null) => {
    setQuote(quote)
  }

  const handleOpenExecuteTransactionDialog = (status: boolean) => {
    setIsExecuteTransactionDialogOpen(status)
  }

  const handleOpenRecipientAddressDialog = (status: boolean) => {
    setIsRecipientAddressDialogOpen(status)
  }

  // Persist and restore from URL
  useBridgePersistence({
    chains,
    form,
    onSetStep: (s) => setStep(s),
  })

  useEffect(() => {
    if (!chains || chains.length === 0) return

    const currentOrigin = form.getValues("origin")
    const currentDestination = form.getValues("destination")

    // Only set defaults if not already selected
    const needsOrigin = !currentOrigin?.chainId || !currentOrigin?.tokenContractAddress
    const needsDestination =
      !currentDestination?.chainId || !currentDestination?.tokenContractAddress

    if (!needsOrigin && !needsDestination) return

    const { chain, tokens } = getFirstChainAndTokens(chains)

    if (needsOrigin) {
      const originToken = createBridgeTokenModel(tokens[0], chain)
      form.setValue("origin", originToken)
      setOriginParams(originToken.tokenContractAddress, originToken.chainId)
    }

    if (needsDestination) {
      const destinationToken = createBridgeTokenModel(tokens[1], chain)
      form.setValue("destination", destinationToken)
      setDestinationParams(destinationToken.tokenContractAddress, destinationToken.chainId)
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
    isExecuteTransactionDialogOpen,
    handleOpenExecuteTransactionDialog,
    isRecipientAddressDialogOpen,
    handleOpenRecipientAddressDialog,
    // Execution state & actions
    executeSteps,
    currentStepIndex,
    currentItemIndex,
    executionStatus,
    executionSteps,
    executionError,
    resetExecution,
    isExecuting,
    checkResult,
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
