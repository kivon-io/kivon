"use client"

import { ReviewHeader } from "@/components/bridge/review-header"
import { ReviewHero, ReviewSummary } from "@/components/bridge/review-summary"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useBridge } from "@/context/bridge-context"
import { useBridgeQuote } from "@/hooks/use-bridge-quote"
import { useEffectiveRecipient } from "@/hooks/use-effective-recipient"
import { useWallet } from "@/hooks/use-wallet"
import { countWalletPrompts } from "@/lib/bridge/format"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export function PreviewView() {
  const router = useRouter()
  const { origin, destination, tokenAmount } = useBridge()
  const { address } = useWallet()
  const effectiveRecipient = useEffectiveRecipient()
  const { quote, isLoading, error } = useBridgeQuote()

  const isReady = Boolean(
    origin && destination && tokenAmount > 0 && quote && !error
  )

  useEffect(() => {
    if (!origin || !destination || tokenAmount <= 0) {
      router.replace("/bridge")
    }
  }, [origin, destination, tokenAmount, router])

  if (!origin || !destination) return null

  if (isLoading || !quote) {
    return (
      <div className="flex min-h-svh flex-col gap-6 p-6">
        <ReviewHeader />
        <Skeleton className="mx-auto h-16 w-48" />
        <Skeleton className="h-64 w-full rounded-2xl" />
        <Skeleton className="mt-auto h-12 w-full rounded-full" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-svh flex-col gap-6 p-6">
        <ReviewHeader />
        <div className="rounded-2xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-center text-sm text-destructive">
          {error.message}
        </div>
      </div>
    )
  }

  const { details } = quote
  const receiveAmount = details.currencyOut.amountFormatted
  const receiveSymbol = details.currencyOut.currency.symbol
  const receiveUsd = details.currencyOut.amountUsd
  const recipient = effectiveRecipient || details.recipient || address || ""
  const promptCount = countWalletPrompts(quote)

  return (
    <div className="flex min-h-svh flex-col gap-4 p-6">
      <div className="flex flex-col gap-2">
        <ReviewHeader />

        <ReviewHero
          destination={destination}
          receiveAmount={receiveAmount}
          receiveSymbol={receiveSymbol}
          receiveUsd={receiveUsd}
        />
      </div>

      <ReviewSummary
        origin={origin}
        destination={destination}
        sendAmount={tokenAmount}
        rate={details.rate}
        timeEstimate={details.timeEstimate}
        recipient={recipient}
      />

      <p className="text-center text-sm text-muted-foreground">
        You&apos;ll sign {promptCount} prompt{promptCount === 1 ? "" : "s"} in
        your wallet to complete this bridge.
      </p>

      <div className="mt-auto">
        <Button
          variant="default"
          size="lg"
          className="h-12 w-full rounded-full text-base font-semibold"
          disabled={!isReady}
          onClick={() => router.push("/bridge/execute")}
        >
          Confirm bridge
        </Button>
      </div>
    </div>
  )
}
