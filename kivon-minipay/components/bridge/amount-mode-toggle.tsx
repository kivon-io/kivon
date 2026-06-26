"use client"

import { useBridge } from "@/context/bridge-context"
import { formatAmount } from "@/lib/bridge/format"
import { cn } from "@/lib/utils"
import { HiMiniArrowsUpDown } from "react-icons/hi2"

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
        "mx-auto flex w-fit items-center justify-center gap-3 rounded-full border border-border bg-neutral-50/50 px-3 py-2 text-muted-foreground backdrop-blur-2xl transition-colors hover:bg-muted/60 disabled:opacity-50 dark:bg-neutral-900/50",
        className
      )}
    >
      <span className="flex size-7 items-center justify-center rounded-full bg-muted">
        <HiMiniArrowsUpDown className="size-4" />
      </span>
      <span className="text-base font-medium">{secondary}</span>
    </button>
  )
}
