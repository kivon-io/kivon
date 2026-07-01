import {
  formatUnits,
  zeroAddress,
  type Address,
  type Hex,
} from "viem"

import {
  adaptiveCurveIrmAbi,
  erc20MetadataAbi,
  metaMorphoVaultAbi,
  morphoAbi,
} from "@/lib/earn/abi"
import { createEarnPublicClient } from "@/lib/earn/client"
import {
  ADAPTIVE_CURVE_IRM,
  EARN_INFO,
  EARN_PREVIEW_AMOUNT_USDT,
  FEATHER_USDT_VAULT,
  MERKL_API,
  MORPHO_SINGLETON,
  SECONDS_PER_YEAR,
  USDT_DECIMALS,
  WAD,
} from "@/lib/earn/constants"
import type {
  VaultApyBreakdown,
  VaultDetails,
  VaultMarketExposure,
} from "@/lib/earn/types"
import { formatTimelock } from "@/lib/earn/format"

type MarketParams = {
  loanToken: Address
  collateralToken: Address
  oracle: Address
  irm: Address
  lltv: bigint
}

type MarketState = {
  totalSupplyAssets: bigint
  totalSupplyShares: bigint
  totalBorrowAssets: bigint
  totalBorrowShares: bigint
  lastUpdate: bigint
  fee: bigint
}

type MerklOpportunity = {
  identifier?: string
  type?: string
  status?: string
  apr?: number
}

function toNumber(value: bigint, decimals: number) {
  return Number(formatUnits(value, decimals))
}

function morphoSupplyAssets(
  supplyShares: bigint,
  market: MarketState
): bigint {
  if (market.totalSupplyShares === BigInt(0) || supplyShares === BigInt(0)) {
    return BigInt(0)
  }
  return (supplyShares * market.totalSupplyAssets) / market.totalSupplyShares
}

function computeSupplyApyPercent(
  ratePerSecondWad: bigint,
  market: MarketState
): number {
  if (market.totalSupplyAssets === BigInt(0)) return 0
  const util =
    Number(market.totalBorrowAssets) / Number(market.totalSupplyAssets)
  const rate = Number(ratePerSecondWad) / Number(WAD)
  if (rate <= 0 || util <= 0) return 0
  return ((1 + rate * util) ** SECONDS_PER_YEAR - 1) * 100
}

async function fetchTokenSymbol(
  client: ReturnType<typeof createEarnPublicClient>,
  address: Address
): Promise<string> {
  if (address === zeroAddress) return "Idle"
  try {
    return await client.readContract({
      address,
      abi: erc20MetadataAbi,
      functionName: "symbol",
    })
  } catch {
    return address.slice(0, 6)
  }
}

async function fetchMerklRewardApr(vaultAddress: string): Promise<number> {
  try {
    const response = await fetch(
      `${MERKL_API}/opportunities?chainId=42220`,
      { next: { revalidate: 300 } }
    )
    if (!response.ok) return 0
    const data = (await response.json()) as MerklOpportunity[]
    const match = data.find(
      (item) =>
        item.type === "MORPHOVAULT" &&
        item.status === "LIVE" &&
        item.identifier?.toLowerCase() === vaultAddress.toLowerCase()
    )
    return match?.apr ?? 0
  } catch {
    return 0
  }
}

export async function fetchVaultDetails(): Promise<VaultDetails> {
  const client = createEarnPublicClient()
  const vaultAddress = FEATHER_USDT_VAULT as Address
  const morphoAddress = MORPHO_SINGLETON as Address
  const irmAddress = ADAPTIVE_CURVE_IRM as Address

  const [
    totalAssets,
    feeRaw,
    curatorAddress,
    guardianAddress,
    timelockSeconds,
    queueLength,
    rewardAprPercent,
  ] = await Promise.all([
    client.readContract({
      address: vaultAddress,
      abi: metaMorphoVaultAbi,
      functionName: "totalAssets",
    }),
    client.readContract({
      address: vaultAddress,
      abi: metaMorphoVaultAbi,
      functionName: "fee",
    }),
    client.readContract({
      address: vaultAddress,
      abi: metaMorphoVaultAbi,
      functionName: "curator",
    }),
    client.readContract({
      address: vaultAddress,
      abi: metaMorphoVaultAbi,
      functionName: "guardian",
    }),
    client.readContract({
      address: vaultAddress,
      abi: metaMorphoVaultAbi,
      functionName: "timelock",
    }),
    client.readContract({
      address: vaultAddress,
      abi: metaMorphoVaultAbi,
      functionName: "withdrawQueueLength",
    }),
    fetchMerklRewardApr(FEATHER_USDT_VAULT),
  ])

  const feeRatio = Number(feeRaw) / Number(WAD)
  const performanceFeePercent = feeRatio * 100
  const totalDepositsAmount = toNumber(totalAssets, USDT_DECIMALS)
  const totalDepositsUsd = totalDepositsAmount

  const marketIds = await Promise.all(
    Array.from({ length: Number(queueLength) }, (_, index) =>
      client.readContract({
        address: vaultAddress,
        abi: metaMorphoVaultAbi,
        functionName: "withdrawQueue",
        args: [BigInt(index)],
      })
    )
  )

  const marketsRaw = await Promise.all(
    marketIds.map(async (marketId) => {
      const [params, state, position, config] = await Promise.all([
        client.readContract({
          address: morphoAddress,
          abi: morphoAbi,
          functionName: "idToMarketParams",
          args: [marketId as Hex],
        }),
        client.readContract({
          address: morphoAddress,
          abi: morphoAbi,
          functionName: "market",
          args: [marketId as Hex],
        }),
        client.readContract({
          address: morphoAddress,
          abi: morphoAbi,
          functionName: "position",
          args: [marketId as Hex, vaultAddress],
        }),
        client.readContract({
          address: vaultAddress,
          abi: metaMorphoVaultAbi,
          functionName: "config",
          args: [marketId as Hex],
        }),
      ])

      const vaultAssets = morphoSupplyAssets(position.supplyShares, state)
      const isIdle = params.collateralToken === zeroAddress

      let apyPercent = 0
      if (!isIdle && state.totalSupplyAssets > BigInt(0)) {
        const ratePerSecond = await client.readContract({
          address: irmAddress,
          abi: adaptiveCurveIrmAbi,
          functionName: "borrowRateView",
          args: [params as MarketParams, state as MarketState],
        })
        apyPercent = computeSupplyApyPercent(ratePerSecond, state)
      }

      const collateralSymbol = isIdle
        ? null
        : await fetchTokenSymbol(client, params.collateralToken)

      const marketAvailable =
        state.totalSupplyAssets > state.totalBorrowAssets
          ? state.totalSupplyAssets - state.totalBorrowAssets
          : BigInt(0)
      const withdrawableAssets = isIdle
        ? vaultAssets
        : vaultAssets < marketAvailable
          ? vaultAssets
          : marketAvailable

      return {
        id: marketId,
        params,
        state,
        vaultAssets,
        withdrawableAssets,
        apyPercent,
        collateralSymbol,
        isIdle,
        supplyCap: config[0],
      }
    })
  )

  let withdrawableAmount = 0
  let weightedNativeApy = 0

  const markets: VaultMarketExposure[] = marketsRaw.map((market) => {
    const allocationAmount = toNumber(market.vaultAssets, USDT_DECIMALS)
    const allocationUsd = allocationAmount
    const allocationPercent =
      totalDepositsAmount > 0
        ? (allocationAmount / totalDepositsAmount) * 100
        : 0
    const supplyCapAmount = toNumber(market.supplyCap, USDT_DECIMALS)
    const supplyCapUsd = supplyCapAmount

    withdrawableAmount += toNumber(market.withdrawableAssets, USDT_DECIMALS)
    weightedNativeApy += market.apyPercent * allocationPercent

    const label = market.isIdle
      ? "Idle Liquidity"
      : `${market.collateralSymbol} / USDT`

    return {
      id: market.id,
      label,
      collateralSymbol: market.collateralSymbol,
      collateralAddress: market.isIdle
        ? null
        : market.params.collateralToken,
      allocationUsd,
      allocationAmount,
      allocationPercent,
      supplyCapUsd,
      supplyCapAmount,
      apyPercent: market.apyPercent,
      isIdle: market.isIdle,
    }
  })

  markets.sort((a, b) => b.allocationPercent - a.allocationPercent)

  const nativeApyPercent =
    totalDepositsAmount > 0 ? weightedNativeApy / 100 : 0
  const performanceFeeDeductionPercent = nativeApyPercent * feeRatio
  const netApyPercent =
    nativeApyPercent - performanceFeeDeductionPercent + rewardAprPercent

  const apy: VaultApyBreakdown = {
    netApyPercent,
    nativeApyPercent,
    rewardAprPercent,
    performanceFeePercent: performanceFeeDeductionPercent,
  }

  const lendingAmount = Math.max(0, totalDepositsAmount - withdrawableAmount)
  const timelock = Number(timelockSeconds)

  const projectedYearlyEarningsUsdt =
    EARN_PREVIEW_AMOUNT_USDT * (netApyPercent / 100)
  const projectedMonthlyEarningsUsdt = projectedYearlyEarningsUsdt / 12

  const guardian =
    guardianAddress === zeroAddress ? null : guardianAddress

  return {
    name: EARN_INFO.name,
    vaultAddress: FEATHER_USDT_VAULT,
    assetSymbol: EARN_INFO.assetSymbol,
    assetDecimals: USDT_DECIMALS,
    totalDepositsUsd,
    totalDepositsAmount,
    lendingUsd: lendingAmount,
    lendingAmount,
    withdrawableUsd: withdrawableAmount,
    withdrawableAmount,
    marketCount: markets.length,
    apy,
    markets,
    curator: EARN_INFO.curator,
    guardian,
    timelockSeconds: timelock,
    timelockLabel: formatTimelock(timelock),
    vaultVersion: EARN_INFO.vaultVersion,
    performanceFeePercent,
    previewAmountUsdt: EARN_PREVIEW_AMOUNT_USDT,
    projectedYearlyEarningsUsdt,
    projectedMonthlyEarningsUsdt,
    fetchedAt: new Date().toISOString(),
  }
}
