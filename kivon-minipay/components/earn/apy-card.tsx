"use client"

import { Info } from "lucide-react"

import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { formatPercent, formatSignedPercent } from "@/lib/earn/format"
import type { VaultApyBreakdown } from "@/lib/earn/types"
import { cn } from "@/lib/utils"

const APY_INFO = {
  netApy: {
    title: "Net APY",
    description:
      "Your total estimated annual return: native lending yield plus reward incentives, minus the vault performance fee on native yield.",
  },
  nativeApy: {
    title: "Native APY",
    description:
      "Organic yield from Morpho lending markets, paid by borrowers. It compounds automatically as your vault shares increase in value.",
  },
  rewardApr: {
    title: "Reward APR",
    description:
      "Extra incentives for supplying to this vault, distributed via Merkl. These rewards are claimed separately from your deposited balance.",
  },
  performanceFee: {
    title: "Performance fee",
    description:
      "Fee charged by the vault curator on native lending yield only. Reward incentives are not subject to this fee.",
  },
} as const

type ApyCardProps = {
  apy: VaultApyBreakdown
  previewAmountUsdt: number
  projectedYearlyEarningsUsdt: number
  assetSymbol: string
}

function ApyInfoPopover({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="inline-flex rounded-full text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          aria-label={`More about ${title}`}
        >
          <Info className="size-3.5 opacity-60" aria-hidden />
        </button>
      </PopoverTrigger>
      <PopoverContent side="top" align="start" className="w-64">
        <PopoverHeader>
          <PopoverTitle>{title}</PopoverTitle>
          <PopoverDescription>{description}</PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  )
}

function ApyRow({
  label,
  value,
  valueClassName,
  info,
}: {
  label: string
  value: string
  valueClassName?: string
  info: { title: string; description: string }
}) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className="flex items-center gap-1 text-muted-foreground">
        {label}
        <ApyInfoPopover title={info.title} description={info.description} />
      </span>
      <span className={cn("font-medium tabular-nums", valueClassName)}>
        {value}
      </span>
    </div>
  )
}

export function ApyCard({
  apy,
  previewAmountUsdt,
  projectedYearlyEarningsUsdt,
  assetSymbol,
}: ApyCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-card/80 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            Net APY
            <ApyInfoPopover
              title={APY_INFO.netApy.title}
              description={APY_INFO.netApy.description}
            />
          </p>
          <p className="mt-1 text-3xl font-bold text-emerald-500 tabular-nums">
            {formatPercent(apy.netApyPercent)}
          </p>
        </div>
        {/* <div className="text-right">
          <p className="text-xs text-muted-foreground">
            est. per year on {previewAmountUsdt} {assetSymbol}
          </p>
          <p className="mt-0.5 text-sm font-semibold tabular-nums text-emerald-500">
            {formatEarnings(projectedYearlyEarningsUsdt, assetSymbol)}
          </p>
        </div> */}
      </div>

      <div className="mt-4 space-y-2 border-t border-border pt-4">
        <ApyRow
          label="Native APY"
          value={formatPercent(apy.nativeApyPercent)}
          info={APY_INFO.nativeApy}
        />
        <ApyRow
          label="Reward APR"
          value={formatSignedPercent(apy.rewardAprPercent)}
          valueClassName="text-emerald-500"
          info={APY_INFO.rewardApr}
        />
        <ApyRow
          label="Performance fee"
          value={formatSignedPercent(-apy.performanceFeePercent)}
          valueClassName="text-kivon-400"
          info={APY_INFO.performanceFee}
        />
      </div>
    </div>
  )
}
