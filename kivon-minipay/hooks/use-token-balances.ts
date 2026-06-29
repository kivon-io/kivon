"use client"

import { useMemo } from "react"
import { erc20Abi, formatUnits, zeroAddress } from "viem"
import { useBalance, useReadContracts } from "wagmi"

import {
  formatTokenBalanceUsd,
  isStablecoinSymbol,
} from "@/lib/wallet/token-balance-usd"
import { wagmiConfig } from "@/lib/wallet/wagmi"

type WagmiChainId = (typeof wagmiConfig)["chains"][number]["id"]

export type TokenBalanceEntry = {
  formatted: string
  amount: number
  usdLabel: string
}

function isNativeToken(token: Token) {
  return (
    token.metadata.isNative ||
    token.address.toLowerCase() === zeroAddress
  )
}

/**
 * Batch-read ERC-20 (+ native CELO) balances for a token picker list.
 */
export function useTokenBalances(
  tokens: Token[],
  chainId?: number,
  address?: `0x${string}`,
  celoUsdPrice?: number | null
) {
  const wagmiChainId = chainId as WagmiChainId | undefined
  const enabled = Boolean(address && wagmiChainId && tokens.length > 0)

  const erc20Tokens = useMemo(
    () => tokens.filter((token) => !isNativeToken(token)),
    [tokens]
  )

  const nativeToken = useMemo(
    () => tokens.find((token) => isNativeToken(token)),
    [tokens]
  )

  const { data: nativeBalance, isLoading: isNativeLoading } = useBalance({
    address,
    chainId: wagmiChainId,
    query: {
      enabled: enabled && Boolean(nativeToken),
    },
  })

  const { data: erc20Balances, isLoading: isErc20Loading } = useReadContracts({
    contracts: erc20Tokens.map((token) => ({
      address: token.address as `0x${string}`,
      abi: erc20Abi,
      functionName: "balanceOf" as const,
      args: [address!] as const,
      chainId: wagmiChainId!,
    })),
    query: {
      enabled: enabled && erc20Tokens.length > 0,
    },
  })

  const balances = useMemo(() => {
    const map = new Map<string, TokenBalanceEntry>()

    erc20Tokens.forEach((token, index) => {
      const result = erc20Balances?.[index]?.result
      if (result === undefined) return

      const formatted = formatUnits(result as bigint, token.decimals)
      const amount = Number(formatted)
      map.set(token.address.toLowerCase(), {
        formatted,
        amount,
        usdLabel: formatTokenBalanceUsd(
          token.symbol,
          amount,
          isStablecoinSymbol(token.symbol) ? undefined : celoUsdPrice
        ),
      })
    })

    if (nativeToken && nativeBalance) {
      const formatted = formatUnits(
        nativeBalance.value,
        nativeBalance.decimals
      )
      const amount = Number(formatted)
      map.set(nativeToken.address.toLowerCase(), {
        formatted,
        amount,
        usdLabel: formatTokenBalanceUsd(
          nativeToken.symbol,
          amount,
          celoUsdPrice
        ),
      })
    }

    return map
  }, [celoUsdPrice, erc20Balances, erc20Tokens, nativeBalance, nativeToken])

  return {
    balances,
    isLoading: (enabled && isNativeLoading) || (enabled && isErc20Loading),
  }
}
