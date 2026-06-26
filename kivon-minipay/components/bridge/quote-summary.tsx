"use client"

import { AssetIcon } from "@/components/bridge/asset-icon"
import { Skeleton } from "@/components/ui/skeleton"
import { useBridge } from "@/context/bridge-context"
import { useBridgeQuote } from "@/hooks/use-bridge-quote"
import { formatAmount } from "@/lib/bridge/format"

export function QuoteSummary() {
  const { origin, destination, tokenAmount } = useBridge()
  const { quote, isLoading, isFetching, error, isPendingInput, quotesDisabled, quotesDisabledMessage } =
    useBridgeQuote()

  if (!origin || !destination || tokenAmount <= 0) return null

  if (quotesDisabled) {
    return (
      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 px-4 py-3 text-center text-sm text-amber-800 dark:text-amber-200">
        {quotesDisabledMessage}
      </div>
    )
  }

  if (isLoading || isPendingInput) {
    return <QuoteSummarySkeleton />
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-center text-sm text-destructive">
        {error.message}
      </div>
    )
  }

  if (!quote) return null

  const { details } = quote
  const receiveAmount = details.currencyOut.amountFormatted
  const receiveSymbol = details.currencyOut.currency.symbol
  const rate = details.rate

  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-xs font-medium text-foreground">
        Receive {receiveSymbol}
        {isFetching ? (
          <span className="ml-2 text-muted-foreground">Updating…</span>
        ) : null}
      </p>
      <AssetIcon
        tokenImage={destination.tokenImage}
        tokenSymbol={destination.tokenSymbol}
        chainImage={destination.chainImage}
        chainName={destination.chainDisplayName}
        size="lg"
      />
      <p className="text-sm font-bold text-foreground">
        {formatAmount(receiveAmount)} {receiveSymbol}
      </p>
      <p className="text-xs text-muted-foreground">
        1 {origin.tokenSymbol} ≈ {formatAmount(rate)} {destination.tokenSymbol}
      </p>
    </div>
  )
}

function QuoteSummarySkeleton() {
  return (
    <div className="flex flex-col items-center gap-3">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="size-18 rounded-full" />
      <Skeleton className="h-8 w-40" />
      <Skeleton className="h-4 w-32" />
    </div>
  )
}
