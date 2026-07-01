"use client"

import { Info } from "lucide-react"

import { MarketAssetIcon } from "@/components/earn/market-pair-icon"
import { formatCompactUsd } from "@/lib/earn/format"
import type { VaultDetails } from "@/lib/earn/types"
type VaultStatsGridProps = {
  vault: Pick<
    VaultDetails,
    | "totalDepositsUsd"
    | "lendingUsd"
    | "withdrawableUsd"
    | "marketCount"
    | "markets"
  >
}

function StatCard({
  label,
  value,
  showInfo,
  children,
}: {
  label: string
  value: string
  showInfo?: boolean
  children?: React.ReactNode
}) {
  return (
    <div className="rounded-2xl border border-border bg-card/80 p-3.5">
      <p className="flex items-center gap-1 text-xs text-muted-foreground">
        {label}
        {showInfo ? <Info className="size-3 opacity-60" aria-hidden /> : null}
      </p>
      {children ?? (
        <p className="mt-1 text-base font-semibold tabular-nums">{value}</p>
      )}
    </div>
  )
}

function ExposureBadges({
  markets,
  marketCount,
}: {
  markets: VaultDetails["markets"]
  marketCount: number
}) {
  const collateralSymbols = markets
    .filter((market) => !market.isIdle && market.collateralSymbol)
    .map((market) => market.collateralSymbol!)
    .slice(0, 3)

  return (
    <div className="mt-1 flex items-center gap-2">
      <div className="flex -space-x-2">
        {collateralSymbols.map((symbol) => (
          <MarketAssetIcon key={symbol} symbol={symbol} size={24} />
        ))}
      </div>
      <span className="text-sm font-semibold tabular-nums">
        {marketCount} markets
      </span>
    </div>
  )
}

export function VaultStatsGrid({ vault }: VaultStatsGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <StatCard
        label="Deposits"
        value={formatCompactUsd(vault.totalDepositsUsd)}
      />
      <StatCard label="Lending" value={formatCompactUsd(vault.lendingUsd)} />
      <StatCard
        label="Withdrawable"
        value={formatCompactUsd(vault.withdrawableUsd)}
        showInfo
      />
      <StatCard label="Exposure" value="">
        <ExposureBadges
          markets={vault.markets}
          marketCount={vault.marketCount}
        />
      </StatCard>
    </div>
  )
}
