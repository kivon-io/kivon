"use client"

import { useBridge } from "@/context/bridge-context"
import { formatAmount } from "@/lib/bridge/format"
import { cn } from "@/lib/utils"
import { ArrowUpDown } from "lucide-react"

export function AmountModeToggle({ className }: { className?: string }) {
  const {
    amountMode,
    toggleAmountMode,
    origin,
    tokenAmount,
    usdAmount,
    originUsdPrice,
  } = useBridge()

  const hasPrice = originUsdPrice != null

  const secondary = (() => {
    if (amountMode === "token") {
      if (!hasPrice) return "Show in USD"
      return `≈ ${formatAmount(usdAmount ?? 0)} USD`
    }
    return `≈ ${formatAmount(tokenAmount)} ${origin?.tokenSymbol ?? ""}`.trim()
  })()

  return (
    <button
      type="button"
      onClick={toggleAmountMode}
      disabled={!hasPrice && amountMode === "token"}
      className={cn(
        "mx-auto flex w-fit items-center justify-center gap-3 rounded-full border border-border bg-neutral-50/50 px-1 py-0.5 text-muted-foreground backdrop-blur-2xl transition-colors hover:bg-muted/60 disabled:opacity-50 dark:bg-neutral-900/50",
        className
      )}
    >
      <span className="flex size-7 items-center justify-center rounded-full bg-muted">
        <ArrowUpDown className="size-3" />
      </span>
      <span className="text-sm font-medium">{secondary}</span>
    </button>
  )
}
