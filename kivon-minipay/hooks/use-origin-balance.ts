"use client"

import { useMemo } from "react"

import { useBridge } from "@/context/bridge-context"
import { useWallet } from "@/hooks/use-wallet"
import { computeMaxBridgeAmount } from "@/lib/wallet/gas-reserve"
import { useBalanceCheck } from "@/lib/wallet/use-balance-check"

type UseOriginBalanceOptions = {
  quote?: Quote | null
}

/** Origin token balance for the active bridge route. */
export function useOriginBalance(options?: UseOriginBalanceOptions) {
  const { origin, tokenAmount, setAmount, originUsdPrice } = useBridge()
  const { address, chainId, isConnected } = useWallet()

  const balanceChainId = chainId ?? origin?.chainId

  const balance = useBalanceCheck(
    address,
    origin?.tokenAddress,
    balanceChainId,
    tokenAmount,
    origin?.tokenIsNative
  )

  const maxSendable = useMemo(() => {
    if (balance.balanceNumber == null || !origin) return 0
    return computeMaxBridgeAmount({
      balance: balance.balanceNumber,
      tokenSymbol: origin.tokenSymbol,
      tokenUsdPrice: originUsdPrice,
      quote: options?.quote,
    })
  }, [balance.balanceNumber, origin, originUsdPrice, options?.quote])

  const hasInsufficientBalance = Boolean(
    tokenAmount > 0 &&
      !balance.isLoading &&
      balance.balanceNumber != null &&
      tokenAmount > maxSendable + 1e-9
  )

  return {
    origin,
    tokenAmount,
    setAmount,
    address,
    isConnected,
    ...balance,
    maxSendable,
    hasInsufficientBalance,
  }
}
