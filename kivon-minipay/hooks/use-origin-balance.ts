"use client"

import { useBridge } from "@/context/bridge-context"
import { useWallet } from "@/hooks/use-wallet"
import { useBalanceCheck } from "@/lib/wallet/use-balance-check"

/** Origin token balance for the active bridge route. */
export function useOriginBalance() {
  const { origin, tokenAmount, setAmount } = useBridge()
  const { address, chainId, isConnected } = useWallet()

  // Prefer the wallet's live chain (MiniPay testnet/mainnet) over static defaults.
  const balanceChainId = chainId ?? origin?.chainId

  const balance = useBalanceCheck(
    address,
    origin?.tokenAddress,
    balanceChainId,
    tokenAmount,
    origin?.tokenIsNative
  )

  return {
    origin,
    tokenAmount,
    setAmount,
    address,
    isConnected,
    ...balance,
  }
}
