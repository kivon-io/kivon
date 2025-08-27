import { formatSmartBalance } from "@/lib/utils"
import { erc20Abi, formatUnits, zeroAddress } from "viem"
import { useBalance, useReadContracts } from "wagmi"

/**
 * Custom hook to check if a given amount exceeds the wallet balance
 * @param address - Wallet address
 * @param token - Token address to check balance on (undefined for native token)
 * @param chainId - Chain ID to check balance on
 * @param amount - Amount to compare against balance
 * @param isNative - Optional flag to explicitly indicate if token is native
 * @returns Object with balance data and insufficient balance check
 */
export const useBalanceCheck = (
  address?: `0x${string}`,
  token?: `0x${string}` | string,
  chainId?: number,
  amount?: number | string,
  isNative?: boolean
) => {
  const isNativeToken = isNative ?? (!token || token === "" || token === zeroAddress)

  const {
    data: nativeBalance,
    isLoading: isNativeLoading,
    error: nativeError,
  } = useBalance({
    address,
    chainId,
    query: {
      enabled: isNativeToken && !!address,
    },
  })

  const {
    data: tokenData,
    isLoading: isTokenLoading,
    error: tokenError,
  } = useReadContracts({
    allowFailure: false,
    contracts: [
      {
        address: token as `0x${string}`,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [address!],
      },
      {
        address: token as `0x${string}`,
        abi: erc20Abi,
        functionName: "decimals",
      },
      {
        address: token as `0x${string}`,
        abi: erc20Abi,
        functionName: "symbol",
      },
    ],
    query: {
      enabled: !isNativeToken && !!address && !!token,
    },
  })

  const isLoading = isNativeToken ? isNativeLoading : isTokenLoading
  const error = isNativeToken ? nativeError : tokenError

  let balance: { formatted: string; symbol: string; decimals: number; value: bigint } | undefined

  if (isNativeToken && nativeBalance) {
    balance = {
      formatted: nativeBalance.formatted,
      symbol: nativeBalance.symbol,
      decimals: nativeBalance.decimals,
      value: nativeBalance.value,
    }
  } else if (!isNativeToken && tokenData) {
    const [balanceValue, decimals, symbol] = tokenData
    const formatted = formatUnits(balanceValue as bigint, decimals as number)
    balance = {
      formatted,
      symbol: symbol as string,
      decimals: decimals as number,
      value: balanceValue as bigint,
    }
  }

  const hasInsufficientBalance = Boolean(
    amount && balance?.formatted && Number(balance.formatted) < Number(amount)
  )

  return {
    balance,
    isLoading,
    error,
    hasInsufficientBalance,
    balanceFormatted: balance?.formatted,
    balanceSmartFormatted: balance?.formatted ? formatSmartBalance(balance.formatted) : undefined,
    balanceSymbol: balance?.symbol,
  }
}
