export type EarnDrawerMode = "deposit" | "withdraw"

export type EarnDrawerStep =
  | "menu"
  | "form"
  | "review"
  | "processing"
  | "success"

export type VaultMarketExposure = {
  id: string
  label: string
  collateralSymbol: string | null
  collateralAddress: string | null
  allocationUsd: number
  allocationAmount: number
  allocationPercent: number
  supplyCapUsd: number
  supplyCapAmount: number
  apyPercent: number
  isIdle: boolean
}

export type VaultApyBreakdown = {
  netApyPercent: number
  nativeApyPercent: number
  rewardAprPercent: number
  performanceFeePercent: number
}

export type MerklReward = {
  tokenAddress: string
  symbol: string
  decimals: number
  /** Cumulative accumulated amount (raw) — the value passed to claim(). */
  accumulatedRaw: string
  /** Still-claimable amount (accumulated − claimed), formatted. */
  unclaimed: number
  priceUsd: number
  unclaimedUsd: number
  proofs: string[]
}

export type MerklRewardsResponse = {
  rewards: MerklReward[]
  totalUsd: number
}

export type VaultDetails = {
  name: string
  vaultAddress: string
  assetSymbol: string
  assetDecimals: number
  totalDepositsUsd: number
  totalDepositsAmount: number
  lendingUsd: number
  lendingAmount: number
  withdrawableUsd: number
  withdrawableAmount: number
  marketCount: number
  apy: VaultApyBreakdown
  markets: VaultMarketExposure[]
  curator: string
  guardian: string | null
  timelockSeconds: number
  timelockLabel: string
  vaultVersion: string
  performanceFeePercent: number
  previewAmountUsdt: number
  projectedYearlyEarningsUsdt: number
  projectedMonthlyEarningsUsdt: number
  fetchedAt: string
}
