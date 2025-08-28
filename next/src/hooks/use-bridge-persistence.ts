"use client"

import {
  BRIDGE_STAGES,
  BridgeFormSchema,
  BridgeStage,
  createBridgeTokenModel,
} from "@/components/swap-zone/bridge/constants"
import { useBridgeUrl } from "@/hooks/use-bridge-url"
import { useEffect } from "react"
import { UseFormReturn } from "react-hook-form"

type UseBridgePersistenceOptions = {
  chains: Chain[]
  form: UseFormReturn<BridgeFormSchema>
  onSetStep: (step: BridgeStage) => void
}

export function useBridgePersistence({ chains, form, onSetStep }: UseBridgePersistenceOptions) {
  const { getCurrentParams, setOriginParams, setDestinationParams, setStepParam } = useBridgeUrl()

  // Helper: find token within already-fetched chains (no network calls)
  const findTokenFromParams = (tokenAddress: string, chainId: string) => {
    const parsedChainId = parseInt(chainId)
    const chain = chains?.find((c) => c.id === parsedChainId)
    if (!chain) return null

    // 1) Check featured tokens first
    const featuredToken = chain.featuredTokens.find(
      (token) => token.address.toLowerCase() === tokenAddress.toLowerCase()
    )
    if (featuredToken) return { token: featuredToken, chain }

    // 2) Check erc20Currencies
    const erc20Token = chain.erc20Currencies.find(
      (currency) => currency.address.toLowerCase() === tokenAddress.toLowerCase()
    )
    if (erc20Token) {
      const token: Token = {
        id: 0,
        address: erc20Token.address,
        name: erc20Token.name,
        symbol: erc20Token.symbol,
        decimals: erc20Token.decimals,
        chainId: chain.id,
        supportsBridging: erc20Token.supportsBridging,
        metadata: { logoURI: "", verified: true, isNative: false },
      }
      return { token, chain }
    }

    // 3) Check solverCurrencies
    const solverToken = chain.solverCurrencies.find(
      (currency) => currency.address.toLowerCase() === tokenAddress.toLowerCase()
    )
    if (solverToken) {
      const token: Token = {
        id: 0,
        address: solverToken.address,
        name: solverToken.name,
        symbol: solverToken.symbol,
        decimals: solverToken.decimals,
        chainId: chain.id,
        supportsBridging: true,
        metadata: { logoURI: "", verified: true, isNative: false },
      }
      return { token, chain }
    }

    // 4) Native token (zero address)
    if (tokenAddress.toLowerCase() === "0x0000000000000000000000000000000000000000") {
      const nativeToken = chain.featuredTokens.find(
        (token) => token.address.toLowerCase() === "0x0000000000000000000000000000000000000000"
      )
      if (nativeToken) return { token: nativeToken, chain }
    }

    return null
  }

  useEffect(() => {
    if (!chains || chains.length === 0) return

    const url = getCurrentParams()

    // Restore step first
    if (url.step && Object.values(BRIDGE_STAGES).includes(url.step as BridgeStage)) {
      onSetStep(url.step as BridgeStage)
    } else {
      onSetStep(BRIDGE_STAGES.SELECT_ASSET)
      setStepParam(BRIDGE_STAGES.SELECT_ASSET)
    }

    // Only set tokens if form is not already set
    const currentOrigin = form.getValues("origin")
    const currentDestination = form.getValues("destination")
    const needsOrigin = !currentOrigin?.chainId || !currentOrigin?.tokenContractAddress
    const needsDestination =
      !currentDestination?.chainId || !currentDestination?.tokenContractAddress

    if (needsOrigin && url.fromCurrency && url.fromChainId) {
      const res = findTokenFromParams(url.fromCurrency, url.fromChainId)
      if (res) {
        const originToken = createBridgeTokenModel(res.token, res.chain)
        form.setValue("origin", originToken)
        setOriginParams(originToken.tokenContractAddress, originToken.chainId)
      }
    }

    if (needsDestination && url.toCurrency && url.toChainId) {
      const res = findTokenFromParams(url.toCurrency, url.toChainId)
      if (res) {
        const destinationToken = createBridgeTokenModel(res.token, res.chain)
        form.setValue("destination", destinationToken)
        setDestinationParams(destinationToken.tokenContractAddress, destinationToken.chainId)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chains])
}
