"use client"

import { Button } from "@/components/ui/button"
import { formatAmount } from "@/lib/bridge/format"
import { EARN_INFO } from "@/lib/earn/constants"
import { formatPercent } from "@/lib/earn/format"
import type { EarnDrawerMode, VaultDetails } from "@/lib/earn/types"

type EarnReviewProps = {
  mode: EarnDrawerMode
  amount: number
  vault: VaultDetails
  networkFeeLabel?: string
  onBack: () => void
  onConfirm: () => void
  isConfirming?: boolean
}

function ReviewRow({
  label,
  value,
  valueClassName,
}: {
  label: string
  value: string
  valueClassName?: string
}) {
  return (
    <>
      <div className="flex items-center justify-between gap-4 py-3.5 text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className={`font-semibold tabular-nums ${valueClassName ?? ""}`}>
          {value}
        </span>
      </div>
      <div className="border-t border-border" />
    </>
  )
}

export function EarnReview({
  mode,
  amount,
  vault,
  networkFeeLabel = "~$0.001",
  onBack,
  onConfirm,
  isConfirming = false,
}: EarnReviewProps) {
  const isDeposit = mode === "deposit"
  const amountLabel = `${formatAmount(amount, 2)} ${EARN_INFO.assetSymbol}`

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-center text-lg font-bold">
        Review {isDeposit ? "deposit" : "withdrawal"}
      </h2>

      <div className="rounded-2xl border border-border bg-card/80 px-4">
        <ReviewRow
          label={isDeposit ? "You deposit" : "You withdraw"}
          value={amountLabel}
        />
        <ReviewRow label="Vault" value={vault.name} />
        {isDeposit ? (
          <ReviewRow
            label="Net APY"
            value={formatPercent(vault.apy.netApyPercent)}
            valueClassName="text-emerald-500"
          />
        ) : null}
        <div className="flex items-center justify-between gap-4 py-3.5 text-sm">
          <span className="text-muted-foreground">Network fee</span>
          <span className="font-semibold tabular-nums">{networkFeeLabel}</span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="h-12 rounded-full"
          onClick={onBack}
          disabled={isConfirming}
        >
          Back
        </Button>
        <Button
          type="button"
          size="lg"
          className="h-12 rounded-full bg-linear-to-r from-kivon-400 to-kivon-600 text-base font-semibold text-white hover:from-kivon-500 hover:to-kivon-700"
          onClick={onConfirm}
          disabled={isConfirming}
        >
          {isConfirming ? "Confirming..." : "Confirm"}
        </Button>
      </div>
    </div>
  )
}
