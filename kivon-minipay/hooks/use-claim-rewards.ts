"use client"

import { useCallback, useState } from "react"
import { type Address, type Hex } from "viem"
import { useWalletClient } from "wagmi"
import { waitForTransactionReceipt, writeContract } from "wagmi/actions"

import { merklDistributorAbi } from "@/lib/earn/abi"
import { MERKL_DISTRIBUTOR, USDT_ADDRESS } from "@/lib/earn/constants"
import type { MerklReward } from "@/lib/earn/types"
import { CELO_CHAIN_ID } from "@/lib/network/config"
import { resolveCeloFeeCurrency } from "@/lib/wallet/fee-currency"
import { wagmiConfig } from "@/lib/wallet/wagmi"

export type ClaimStatus = "idle" | "claiming" | "success" | "failed"

export function useClaimRewards() {
  const { data: walletClient } = useWalletClient()
  const [status, setStatus] = useState<ClaimStatus>("idle")
  const [error, setError] = useState<string | null>(null)

  const claim = useCallback(
    async (address: Address, rewards: MerklReward[]) => {
      if (!walletClient) throw new Error("Wallet not connected")
      if (rewards.length === 0) return false

      setError(null)
      setStatus("claiming")

      const users = rewards.map(() => address)
      const tokens = rewards.map((reward) => reward.tokenAddress as Address)
      const amounts = rewards.map((reward) => BigInt(reward.accumulatedRaw))
      const proofs = rewards.map((reward) => reward.proofs as Hex[])

      // Pay gas in USDT (CIP-64) so users never need native CELO.
      const feeCurrency = resolveCeloFeeCurrency({
        chainId: CELO_CHAIN_ID,
        originTokenAddress: USDT_ADDRESS,
        originTokenSymbol: "USDT",
      })
      const feeOverride = feeCurrency ? { feeCurrency } : {}

      try {
        const hash = await writeContract(wagmiConfig, {
          address: MERKL_DISTRIBUTOR as Address,
          abi: merklDistributorAbi,
          functionName: "claim",
          args: [users, tokens, amounts, proofs],
          chainId: CELO_CHAIN_ID,
          ...feeOverride,
        })
        await waitForTransactionReceipt(wagmiConfig, {
          hash,
          chainId: CELO_CHAIN_ID,
        })
        setStatus("success")
        return true
      } catch (err) {
        setError(toClaimErrorMessage(err))
        setStatus("failed")
        return false
      }
    },
    [walletClient]
  )

  const reset = useCallback(() => {
    setStatus("idle")
    setError(null)
  }, [])

  return {
    status,
    error,
    isClaiming: status === "claiming",
    claim,
    reset,
  }
}

function toClaimErrorMessage(err: unknown): string {
  const raw = err instanceof Error ? err.message : ""
  const lower = raw.toLowerCase()
  if (
    lower.includes("user rejected") ||
    lower.includes("user denied") ||
    lower.includes("rejected the request")
  ) {
    return "You rejected the transaction."
  }
  if (
    lower.includes("insufficient funds") ||
    lower.includes("insufficient balance") ||
    lower.includes("cover fees")
  ) {
    return "Not enough stablecoin balance to cover network fees."
  }
  return "Couldn't claim rewards. Please try again."
}
