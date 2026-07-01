import { NextResponse } from "next/server"
import { formatUnits, isAddress } from "viem"

import { MERKL_API } from "@/lib/earn/constants"
import type { MerklReward, MerklRewardsResponse } from "@/lib/earn/types"
import { CELO_MAINNET_CHAIN_ID, IS_TESTNET } from "@/lib/network/config"

type MerklApiReward = {
  amount: string
  claimed: string
  pending: string
  proofs: string[]
  token: {
    address: string
    decimals: number
    symbol: string
    price?: number | null
  }
}

type MerklApiChainRewards = {
  chain?: { id?: number }
  rewards?: MerklApiReward[]
}

export async function GET(request: Request) {
  if (IS_TESTNET) {
    return NextResponse.json<MerklRewardsResponse>({ rewards: [], totalUsd: 0 })
  }

  const address = new URL(request.url).searchParams.get("address")
  if (!address || !isAddress(address)) {
    return NextResponse.json({ error: "Invalid address" }, { status: 400 })
  }

  try {
    const response = await fetch(
      `${MERKL_API}/users/${address}/rewards?chainId=${CELO_MAINNET_CHAIN_ID}`,
      { next: { revalidate: 30 } }
    )
    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch rewards" },
        { status: 502 }
      )
    }

    const data = (await response.json()) as MerklApiChainRewards[]
    const rawRewards = data.flatMap((entry) => entry.rewards ?? [])

    const rewards: MerklReward[] = []
    let totalUsd = 0

    for (const item of rawRewards) {
      const accumulated = safeBigInt(item.amount)
      const claimed = safeBigInt(item.claimed)
      const unclaimedRaw = accumulated > claimed ? accumulated - claimed : BigInt(0)

      if (unclaimedRaw <= BigInt(0) || (item.proofs?.length ?? 0) === 0) continue

      const decimals = item.token.decimals
      const unclaimed = Number(formatUnits(unclaimedRaw, decimals))
      const priceUsd = item.token.price ?? 0
      const unclaimedUsd = unclaimed * priceUsd
      totalUsd += unclaimedUsd

      rewards.push({
        tokenAddress: item.token.address,
        symbol: item.token.symbol,
        decimals,
        accumulatedRaw: accumulated.toString(),
        unclaimed,
        priceUsd,
        unclaimedUsd,
        proofs: item.proofs,
      })
    }

    rewards.sort((a, b) => b.unclaimedUsd - a.unclaimedUsd)

    return NextResponse.json<MerklRewardsResponse>({ rewards, totalUsd })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch rewards"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

function safeBigInt(value?: string | null): bigint {
  try {
    return value ? BigInt(value) : BigInt(0)
  } catch {
    return BigInt(0)
  }
}
