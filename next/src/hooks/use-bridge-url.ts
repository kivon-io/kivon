"use client"

import { useCallback } from "react"

export interface BridgeUrlParams {
  fromCurrency?: string
  fromChainId?: string
  toCurrency?: string
  toChainId?: string
  step?: string
}

export const useBridgeUrl = () => {
  const getCurrentParams = useCallback((): BridgeUrlParams => {
    if (typeof window === "undefined") return {}
    const sp = new URLSearchParams(window.location.search)
    return {
      fromCurrency: sp.get("fromCurrency") || undefined,
      fromChainId: sp.get("fromChainId") || undefined,
      toCurrency: sp.get("toCurrency") || undefined,
      toChainId: sp.get("toChainId") || undefined,
      step: sp.get("step") || undefined,
    }
  }, [])

  const updateBridgeParams = useCallback((params: Partial<BridgeUrlParams>) => {
    if (typeof window === "undefined") return
    const url = new URL(window.location.href)
    const sp = url.searchParams

    Object.entries(params).forEach(([key, value]) => {
      if (value) sp.set(key, value)
      else sp.delete(key)
    })

    window.history.replaceState({}, "", `${url.pathname}?${sp.toString()}`)
  }, [])

  const setOriginParams = useCallback(
    (tokenAddress: string, chainId: number) => {
      updateBridgeParams({
        fromCurrency: tokenAddress,
        fromChainId: chainId.toString(),
      })
    },
    [updateBridgeParams]
  )

  const setDestinationParams = useCallback(
    (tokenAddress: string, chainId: number) => {
      updateBridgeParams({
        toCurrency: tokenAddress,
        toChainId: chainId.toString(),
      })
    },
    [updateBridgeParams]
  )

  const setStepParam = useCallback(
    (step: string) => {
      updateBridgeParams({ step })
    },
    [updateBridgeParams]
  )

  const clearAllParams = useCallback(() => {
    updateBridgeParams({
      fromCurrency: undefined,
      fromChainId: undefined,
      toCurrency: undefined,
      toChainId: undefined,
      step: undefined,
    })
  }, [updateBridgeParams])

  return {
    getCurrentParams,
    updateBridgeParams,
    setOriginParams,
    setDestinationParams,
    setStepParam,
    clearAllParams,
  }
}
