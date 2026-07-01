"use client"

import { Clock3 } from "lucide-react"

import { MarketPairIcon } from "@/components/earn/market-pair-icon"
import { formatCompactUsd } from "@/lib/earn/format"
import type { VaultMarketExposure } from "@/lib/earn/types"
import { cn } from "@/lib/utils"

type MarketExposureListProps = {
  markets: VaultMarketExposure[]
}

function capUsagePercent(market: VaultMarketExposure) {
  if (market.supplyCapAmount <= 0) return 0
  return Math.min(100, (market.allocationAmount / market.supplyCapAmount) * 100)
}

function MarketIcon({ market }: { market: VaultMarketExposure }) {
  if (market.isIdle) {
    return (
      <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted">
        <Clock3 className="size-4 text-muted-foreground" aria-hidden />
      </div>
    )
  }

  return (
    <MarketPairIcon collateralSymbol={market.collateralSymbol} />
  )
}

function MarketRow({ market }: { market: VaultMarketExposure }) {
  const capPercent = capUsagePercent(market)

  return (
    <div className="rounded-2xl border border-border bg-card/60 p-3.5">
      <div className="flex items-start gap-3">
        <MarketIcon market={market} />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate font-medium">{market.label}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {formatCompactUsd(market.allocationUsd)} · cap{" "}
                {formatCompactUsd(market.supplyCapUsd)}
              </p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-sm font-semibold tabular-nums">
                {market.allocationPercent.toFixed(1)}%
              </p>
              <p
                className={cn(
                  "text-xs tabular-nums",
                  market.apyPercent > 0
                    ? "text-emerald-500"
                    : "text-muted-foreground"
                )}
              >
                {market.apyPercent.toFixed(2)}%
              </p>
            </div>
          </div>
          <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-muted">
            <div
              className={cn(
                "h-full rounded-full transition-all",
                market.isIdle ? "bg-muted-foreground/40" : "bg-kivon-500"
              )}
              style={{ width: `${capPercent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export function MarketExposureList({
  markets,
}: MarketExposureListProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold">Market exposure</h2>
        <span className="text-xs text-muted-foreground">alloc · APY</span>
      </div>
      <div className="flex flex-col gap-2">
        {markets.map((market) => (
          <MarketRow key={market.id} market={market} />
        ))}
      </div>
    </div>
  )
}
