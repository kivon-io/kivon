"use client"

import { cn } from "@/lib/utils"

type OriginBalanceProps = {
  symbol: string
  balanceDisplay?: string
  hasInsufficientBalance: boolean
  isLoading: boolean
  canMax?: boolean
  onMax: () => void
  className?: string
}

export function OriginBalance({
  symbol,
  balanceDisplay,
  hasInsufficientBalance,
  isLoading,
  canMax = true,
  onMax,
  className,
}: OriginBalanceProps) {
  const showBalance = !isLoading && balanceDisplay != null

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-3 text-sm",
        className
      )}
    >
      <span
        className={cn(
          "text-muted-foreground",
          hasInsufficientBalance && "text-destructive"
        )}
      >
        Balance{" "}
        {showBalance ? (
          <>
            {balanceDisplay} {symbol}
          </>
        ) : (
          "…"
        )}
      </span>

      <button
        type="button"
        onClick={onMax}
        disabled={!canMax}
        className="rounded-full border border-border bg-neutral-900/80 px-3 py-1 text-xs font-semibold text-kivon-400 transition-opacity hover:opacity-80 disabled:opacity-40 dark:bg-neutral-900/50"
      >
        MAX
      </button>
    </div>
  )
}
