"use client"

import { useCallback, useState } from "react"
import {
  erc20Abi,
  maxUint256,
  parseUnits,
  type Address,
} from "viem"
import {
  readContract,
  waitForTransactionReceipt,
  writeContract,
} from "wagmi/actions"
import { useWalletClient } from "wagmi"

import { metaMorphoVaultAbi } from "@/lib/earn/abi"
import type { EarnProcessStep } from "@/components/earn/earn-processing"
import {
  FEATHER_USDT_VAULT,
  USDT_ADDRESS,
  USDT_DECIMALS,
} from "@/lib/earn/constants"
import { CELO_CHAIN_ID } from "@/lib/network/config"
import { resolveCeloFeeCurrency } from "@/lib/wallet/fee-currency"
import { wagmiConfig } from "@/lib/wallet/wagmi"

export type EarnExecuteMode = "deposit" | "withdraw"

type ExecuteEarnInput = {
  mode: EarnExecuteMode
  amount: number
  address: Address
  netApyPercent: number
}

export function useEarnExecute() {
  const { data: walletClient } = useWalletClient()
  const [steps, setSteps] = useState<EarnProcessStep[]>([])
  const [isExecuting, setIsExecuting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updateStep = useCallback(
    (id: string, status: EarnProcessStep["status"]) => {
      setSteps((current) =>
        current.map((step) => (step.id === id ? { ...step, status } : step))
      )
    },
    []
  )

  const execute = useCallback(
    async ({ mode, amount, address, netApyPercent }: ExecuteEarnInput) => {
      if (!walletClient) {
        throw new Error("Wallet not connected")
      }

      setError(null)
      setIsExecuting(true)

      const assets = parseUnits(amount.toString(), USDT_DECIMALS)
      const vault = FEATHER_USDT_VAULT as Address
      const asset = USDT_ADDRESS as Address

      // MiniPay on Celo: pay gas in USDT via the CIP-64 feeCurrency adapter so
      // users never need native CELO. Undefined on testnet (no adapter).
      const feeCurrency = resolveCeloFeeCurrency({
        chainId: CELO_CHAIN_ID,
        originTokenAddress: asset,
        originTokenSymbol: "USDT",
      })
      const feeOverride = feeCurrency ? { feeCurrency } : {}

      const initialSteps: EarnProcessStep[] =
        mode === "deposit"
          ? [
              {
                id: "approve",
                title: "Approve USDT",
                description: "Allow the vault to use your USDT",
                status: "pending",
              },
              {
                id: "deposit",
                title: "Deposit to vault",
                description: `Start earning ${netApyPercent.toFixed(2)}% APY`,
                status: "pending",
              },
            ]
          : [
              {
                id: "withdraw",
                title: "Withdraw from vault",
                description: "Receive USDT in your wallet",
                status: "pending",
              },
            ]

      setSteps(initialSteps)

      try {
        if (mode === "deposit") {
          const allowance = await readContract(wagmiConfig, {
            address: asset,
            abi: erc20Abi,
            functionName: "allowance",
            args: [address, vault],
            chainId: CELO_CHAIN_ID,
          })

          if (allowance < assets) {
            updateStep("approve", "active")
            const approveHash = await writeContract(wagmiConfig, {
              address: asset,
              abi: erc20Abi,
              functionName: "approve",
              args: [vault, maxUint256],
              chainId: CELO_CHAIN_ID,
              ...feeOverride,
            })
            await waitForTransactionReceipt(wagmiConfig, {
              hash: approveHash,
              chainId: CELO_CHAIN_ID,
            })
            updateStep("approve", "complete")
          } else {
            updateStep("approve", "complete")
          }

          updateStep("deposit", "active")
          const depositHash = await writeContract(wagmiConfig, {
            address: vault,
            abi: metaMorphoVaultAbi,
            functionName: "deposit",
            args: [assets, address],
            chainId: CELO_CHAIN_ID,
            ...feeOverride,
          })
          await waitForTransactionReceipt(wagmiConfig, {
            hash: depositHash,
            chainId: CELO_CHAIN_ID,
          })
          updateStep("deposit", "complete")
        } else {
          updateStep("withdraw", "active")
          const withdrawHash = await writeContract(wagmiConfig, {
            address: vault,
            abi: metaMorphoVaultAbi,
            functionName: "withdraw",
            args: [assets, address, address],
            chainId: CELO_CHAIN_ID,
            ...feeOverride,
          })
          await waitForTransactionReceipt(wagmiConfig, {
            hash: withdrawHash,
            chainId: CELO_CHAIN_ID,
          })
          updateStep("withdraw", "complete")
        }

        return true
      } catch (err) {
        setError(toEarnErrorMessage(err))
        setSteps((current) =>
          current.map((step) =>
            step.status === "active" ? { ...step, status: "failed" } : step
          )
        )
        return false
      } finally {
        setIsExecuting(false)
      }
    },
    [updateStep, walletClient]
  )

  const reset = useCallback(() => {
    setSteps([])
    setError(null)
    setIsExecuting(false)
  }, [])

  return {
    steps,
    isExecuting,
    error,
    execute,
    reset,
  }
}

/**
 * Map noisy viem/wallet errors to short, user-facing messages. Fee/balance
 * shortfalls use wording that {@link shouldOfferMinipayTopUp} recognizes so the
 * UI can surface the MiniPay add-cash link.
 */
function toEarnErrorMessage(err: unknown): string {
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
    lower.includes("cover fees") ||
    lower.includes("gas required exceeds")
  ) {
    return "Not enough stablecoin balance to cover network fees."
  }
  if (lower.includes("reverted") || lower.includes("execution reverted")) {
    return "The transaction couldn't be completed. Please try again."
  }
  return "Something went wrong. Please try again."
}
