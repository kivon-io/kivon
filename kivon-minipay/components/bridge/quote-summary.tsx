"use client"

import dynamic from "next/dynamic"

import { MinipayTopUpPrompt } from "@/components/bridge/minipay-top-up-prompt"
import { Skeleton } from "@/components/ui/skeleton"
import { useBridge } from "@/context/bridge-context"
import { useBridgeQuote } from "@/hooks/use-bridge-quote"
import { formatAmount } from "@/lib/bridge/format"

const DestinationTokenCarousel = dynamic(
  () =>
    import("@/components/bridge/destination-token-carousel").then((mod) => ({
      default: mod.DestinationTokenCarousel,
    })),
  {
    loading: () => (
      <div className="flex h-[92px] items-center justify-center">
        <Skeleton className="size-[72px] rounded-full" />
      </div>
    ),
  }
)

export function QuoteSummary() {
  const { origin, destination, tokenAmount, setDestination } = useBridge()
  const {
    quote,
    isLoading,
    isFetching,
    error,
    isPendingInput,
    quotesDisabled,
    quotesDisabledMessage,
  } = useBridgeQuote()

  if (!origin || !destination) return null

  const hasAmount = tokenAmount > 0
  const showQuoteLoading =
    hasAmount && !quotesDisabled && (isLoading || isPendingInput)
  const showQuoteError =
    hasAmount &&
    !quotesDisabled &&
    Boolean(error) &&
    !isLoading &&
    !isPendingInput
  const showQuoteDetails =
    hasAmount &&
    !quotesDisabled &&
    Boolean(quote) &&
    !isLoading &&
    !isPendingInput &&
    !error

  const receiveAmount = quote?.details.currencyOut.amountFormatted
  const receiveSymbol =
    quote?.details.currencyOut.currency.symbol ?? destination.tokenSymbol
  const rate = quote?.details.rate

  return (
    <div className="flex flex-col items-center">
      <p className="text-xs font-medium text-foreground">
        Receive {destination.tokenSymbol}
        {showQuoteDetails && isFetching ? (
          <span className="ml-2 text-muted-foreground">Updating…</span>
        ) : null}
      </p>

      <DestinationTokenCarousel
        destination={destination}
        onDestinationChange={setDestination}
      />

      {hasAmount && quotesDisabled ? (
        <div className="mt-2 w-full rounded-2xl border border-amber-500/30 bg-amber-500/5 px-4 py-3 text-center text-sm text-amber-800 dark:text-amber-200">
          {quotesDisabledMessage}
        </div>
      ) : null}

      {showQuoteLoading ? <QuoteDetailsSkeleton /> : null}

      {showQuoteError && error?.message ? (
        <MinipayTopUpPrompt message={error.message} className="mt-2 w-full" />
      ) : null}

      {showQuoteDetails && receiveAmount ? (
        <>
          <p className="text-sm font-bold text-foreground">
            {formatAmount(receiveAmount)} {receiveSymbol}
          </p>
          {rate ? (
            <p className="text-xs text-muted-foreground">
              1 {origin.tokenSymbol} ≈ {formatAmount(rate)}{" "}
              {destination.tokenSymbol}
            </p>
          ) : null}
        </>
      ) : null}
    </div>
  )
}

function QuoteDetailsSkeleton() {
  return (
    <div className="flex flex-col items-center gap-2 pt-1">
      <Skeleton className="h-5 w-36" />
      <Skeleton className="h-4 w-28" />
    </div>
  )
}
