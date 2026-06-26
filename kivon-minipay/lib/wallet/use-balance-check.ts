"use client"

import { formatAmount } from "@/lib/bridge/format"
import { wagmiConfig } from "@/lib/wallet/wagmi"
import { erc20Abi, formatUnits, zeroAddress } from "viem"
import { useBalance, useReadContracts } from "wagmi"

type WagmiChainId = (typeof wagmiConfig)["chains"][number]["id"]

/**
 * Reads the wallet balance for a native or ERC-20 token and compares it to
 * `amount` (token units).
 */
export function useBalanceCheck(
  address?: `0x${string}`,
  token?: string,
  chainId?: number,
  amount?: number,
  isNative?: boolean
) {
  const wagmiChainId = chainId as WagmiChainId | undefined
  const isNativeToken =
    isNative ?? (!token || token === "" || token.toLowerCase() === zeroAddress)

  const {
    data: nativeBalance,
    isLoading: isNativeLoading,
    error: nativeError,
  } = useBalance({
    address,
    chainId: wagmiChainId,
    query: {
      enabled: isNativeToken && Boolean(address) && Boolean(wagmiChainId),
    },
  })

  const tokenAddress =
    token && !isNativeToken ? (token as `0x${string}`) : undefined

  const {
    data: tokenData,
    isLoading: isTokenLoading,
    error: tokenError,
  } = useReadContracts({
    allowFailure: false,
    contracts: [
      {
        address: tokenAddress!,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [address!],
        chainId: wagmiChainId!,
      },
      {
        address: tokenAddress!,
        abi: erc20Abi,
        functionName: "decimals",
        chainId: wagmiChainId!,
      },
    ],
    query: {
      enabled: Boolean(address) && Boolean(wagmiChainId) && Boolean(tokenAddress),
    },
  })

  const isLoading = isNativeToken ? isNativeLoading : isTokenLoading
  const error = isNativeToken ? nativeError : tokenError

  let balanceFormatted: string | undefined
  let balanceSymbol: string | undefined

  if (isNativeToken && nativeBalance) {
    balanceFormatted = formatUnits(nativeBalance.value, nativeBalance.decimals)
    balanceSymbol = nativeBalance.symbol
  } else if (!isNativeToken && tokenData) {
    const [balanceValue, decimals] = tokenData
    balanceFormatted = formatUnits(balanceValue as bigint, decimals as number)
  }

  const balanceNumber = balanceFormatted ? Number(balanceFormatted) : undefined

  const hasInsufficientBalance = Boolean(
    amount &&
      amount > 0 &&
      !isLoading &&
      balanceNumber != null &&
      balanceNumber < amount
  )

  const balanceDisplay =
    balanceFormatted != null
      ? formatAmount(balanceFormatted, 2)
      : undefined

  return {
    isLoading,
    error,
    balanceFormatted,
    balanceDisplay,
    balanceSymbol,
    balanceNumber,
    hasInsufficientBalance,
  }
}
