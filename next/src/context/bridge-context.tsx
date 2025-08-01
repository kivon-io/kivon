"use client"

import { ExchangeT } from "@/components/elements/exchange-type"
import {
  bridgeFormSchema,
  BridgeFormSchema,
  createBridgeTokenModel,
} from "@/components/swap-zone/bridge/constants"
import { DEFAULT_DECIMALS, EXCHANGE_TYPE } from "@/lib/shared/constants"
import { getFirstChainAndTokens } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { createContext, useContext, useEffect } from "react"
import { useForm, UseFormReturn } from "react-hook-form"

const BridgeContext = createContext<{
  chains: Chain[]
  form: UseFormReturn<BridgeFormSchema>
  handleSelectToken: (
    token: BridgeFormSchema["origin"] | BridgeFormSchema["destination"],
    type: ExchangeT
  ) => void
} | null>(null)

const BridgeProvider = ({ chains, children }: { chains: Chain[]; children: React.ReactNode }) => {
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
      },
      amount: 0,
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
