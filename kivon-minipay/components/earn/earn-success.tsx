"use client"

import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { formatAmount } from "@/lib/bridge/format"
import { EARN_INFO } from "@/lib/earn/constants"
import { formatPercent } from "@/lib/earn/format"
import type { VaultDetails } from "@/lib/earn/types"
import type { EarnDrawerMode } from "@/lib/earn/types"

type EarnSuccessProps = {
  mode: EarnDrawerMode
  amount: number
  vault: VaultDetails
  onViewPosition: () => void
}

export function EarnSuccess({
  mode,
  amount,
  vault,
  onViewPosition,
}: EarnSuccessProps) {
  const isDeposit = mode === "deposit"
  const amountLabel = `${formatAmount(amount, 2)} ${EARN_INFO.assetSymbol}`

  return (
    <div className="flex flex-col items-center gap-5 py-2 text-center">
      <div className="relative flex size-24 items-center justify-center">
        <span
          aria-hidden
          className="absolute inline-flex size-20 animate-ping rounded-full bg-emerald-500/20"
        />
        <div className="relative flex size-20 items-center justify-center rounded-full bg-emerald-500 shadow-lg ring-4 ring-emerald-500/20">
          <Check className="size-10 text-white" strokeWidth={3} />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold">
          {isDeposit ? "You're earning!" : "Withdrawal complete"}
        </h2>
        <p className="mt-2 max-w-xs text-sm text-muted-foreground">
          {isDeposit
            ? `Your deposit is now earning ${formatPercent(vault.apy.netApyPercent)} APY, compounding automatically.`
            : "Your USDT has been sent back to your wallet."}
        </p>
      </div>

      <div className="w-full rounded-2xl border border-border bg-card/80 px-4 py-3.5">
        <div className="flex items-center justify-between gap-4 text-sm">
          <span className="text-muted-foreground">
            {isDeposit ? "You deposit" : "You withdraw"}
          </span>
          <span className="font-semibold tabular-nums">{amountLabel}</span>
        </div>
      </div>

      <Button
        size="lg"
        className="h-12 w-full rounded-full bg-linear-to-r from-kivon-400 to-kivon-600 text-base font-semibold text-white hover:from-kivon-500 hover:to-kivon-700"
        onClick={onViewPosition}
      >
        View position
      </Button>
    </div>
  )
}
