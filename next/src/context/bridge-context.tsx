"use client"

import { bridgeFormSchema, BridgeFormSchema } from "@/components/swap-zone/bridge/constants"
import { DEFAULT_DECIMALS } from "@/lib/shared/constants"
import { getFirstChainAndTokens } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { createContext, useContext, useEffect } from "react"
import { useForm, UseFormReturn } from "react-hook-form"

const BridgeContext = createContext<{
  chains: Chain[]
  form: UseFormReturn<BridgeFormSchema>
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

  useEffect(() => {
    if (chains && chains.length > 0) {
      const { chain, tokens } = getFirstChainAndTokens(chains)

      form.setValue("origin", {
        chainId: chain.baseChainId,
        chainName: chain.name,
        chainDisplayName: chain.displayName,
        chainSymbol: chain.currency.symbol,
        chainImage: chain.iconUrl,
        chainContractAddress: chain.currency.address,
        chainDecimals: chain.currency.decimals,
        chainSupportsBridging: chain.currency.supportsBridging,
        tokenName: tokens[0].name,
        tokenSymbol: tokens[0].symbol,
        tokenImage: tokens[0].metadata.logoURI,
        tokenContractAddress: tokens[0].address,
        tokenDecimals: tokens[0].decimals,
      })

      form.setValue("destination", {
        chainId: chain.baseChainId,
        chainName: chain.name,
        chainDisplayName: chain.displayName,
        chainSymbol: chain.currency.symbol,
        chainImage: chain.iconUrl,
        chainContractAddress: chain.currency.address,
        chainDecimals: chain.currency.decimals,
        chainSupportsBridging: chain.currency.supportsBridging,
        tokenName: tokens[1].name,
        tokenSymbol: tokens[1].symbol,
        tokenImage: tokens[1].metadata.logoURI,
        tokenContractAddress: tokens[1].address,
        tokenDecimals: tokens[1].decimals,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chains])

  const values = {
    chains,
    form,
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
