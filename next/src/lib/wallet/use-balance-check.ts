import { useBalance } from "wagmi"

/**
 * Custom hook to check if a given amount exceeds the wallet balance
 * @param address - Wallet address
 * @param chainId - Chain ID to check balance on
 * @param amount - Amount to compare against balance
 * @returns Object with balance data and insufficient balance check
 */
export const useBalanceCheck = (
  address?: `0x${string}`,
  chainId?: number,
  amount?: number | string
) => {
  const {
    data: balance,
    isLoading,
    error,
  } = useBalance({
    address,
    chainId,
  })

  const hasInsufficientBalance = Boolean(
    amount && balance?.formatted && Number(balance.formatted) < Number(amount)
  )

  return {
    balance,
    isLoading,
    error,
    hasInsufficientBalance,
    balanceFormatted: balance?.formatted,
    balanceSymbol: balance?.symbol,
  }
}
