"use client"

import { formatUnits } from "viem"
import { erc20Abi } from "viem"
import { useReadContracts } from "wagmi"

import { metaMorphoVaultAbi } from "@/lib/earn/abi"
import {
  FEATHER_USDT_VAULT,
  USDT_ADDRESS,
  USDT_DECIMALS,
} from "@/lib/earn/constants"
import { CELO_CHAIN_ID } from "@/lib/network/config"

export function useEarnBalances(address?: `0x${string}`) {
  const enabled = Boolean(address)

  const { data, isLoading, refetch } = useReadContracts({
    contracts: [
      {
        address: USDT_ADDRESS,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [address!],
        chainId: CELO_CHAIN_ID,
      },
      {
        address: FEATHER_USDT_VAULT,
        abi: metaMorphoVaultAbi,
        functionName: "balanceOf",
        args: [address!],
        chainId: CELO_CHAIN_ID,
      },
      {
        address: FEATHER_USDT_VAULT,
        abi: metaMorphoVaultAbi,
        functionName: "maxWithdraw",
        args: [address!],
        chainId: CELO_CHAIN_ID,
      },
    ],
    query: {
      enabled,
      refetchInterval: 30_000,
    },
  })

  const walletBalanceRaw = data?.[0]?.result as bigint | undefined
  const vaultSharesRaw = data?.[1]?.result as bigint | undefined
  const maxWithdrawRaw = data?.[2]?.result as bigint | undefined

  const walletBalance = walletBalanceRaw
    ? Number(formatUnits(walletBalanceRaw, USDT_DECIMALS))
    : 0
  const vaultPosition = maxWithdrawRaw
    ? Number(formatUnits(maxWithdrawRaw, USDT_DECIMALS))
    : 0

  return {
    walletBalance,
    vaultPosition,
    vaultShares: vaultSharesRaw ?? BigInt(0),
    isLoading: enabled && isLoading,
    refetch,
  }
}
