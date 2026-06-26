"use client"

import { AmountInput } from "@/components/bridge/amount-input"
import { AmountModeToggle } from "@/components/bridge/amount-mode-toggle"
import { OriginBalance } from "@/components/bridge/origin-balance"
import { QuoteSummary } from "@/components/bridge/quote-summary"
import { RecipientSelector } from "@/components/bridge/recipient-selector"
import { RoutePicker } from "@/components/bridge/route-picker"
import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { useBridge } from "@/context/bridge-context"
import { useBridgeQuote } from "@/hooks/use-bridge-quote"
import { useEffectiveRecipient } from "@/hooks/use-effective-recipient"
import { useOriginBalance } from "@/hooks/use-origin-balance"
import { useRouter } from "next/navigation"

export function BridgeView() {
  const router = useRouter()
  const { origin, destination, tokenAmount } = useBridge()
  const effectiveRecipient = useEffectiveRecipient()
  const { quote, isLoading, error } = useBridgeQuote()
  const {
    origin: originAsset,
    balanceDisplay,
    balanceFormatted,
    hasInsufficientBalance,
    isLoading: isBalanceLoading,
    setAmount,
  } = useOriginBalance()

  const canPreview = Boolean(
    origin &&
    destination &&
    tokenAmount > 0 &&
    quote &&
    !isLoading &&
    !error &&
    effectiveRecipient &&
    !hasInsufficientBalance &&
    !isBalanceLoading
  )

  const handleMax = () => {
    if (!balanceFormatted) return
    setAmount(parseFloat(parseFloat(balanceFormatted).toFixed(6)).toString())
  }

  const previewLabel = hasInsufficientBalance ? "Insufficient balance" : "Preview Bridge"

  return (
    <div className="flex min-h-svh flex-col gap-8 p-6">
      <Header
        heading="Bridge"
        subHeading="Bridge your tokens from Celo to other networks"
      />

      <div className="flex flex-col gap-2">
        <RoutePicker />

        <AmountInput />
        <AmountModeToggle />
        {originAsset ? (
          <OriginBalance
            symbol={originAsset.tokenSymbol}
            balanceDisplay={balanceDisplay}
            balanceFormatted={balanceFormatted}
            hasInsufficientBalance={hasInsufficientBalance}
            isLoading={isBalanceLoading}
            onMax={handleMax}
          />
        ) : null}
      </div>

      <QuoteSummary />

      <div className="mt-auto flex flex-col gap-2">
        <RecipientSelector />
        <Button
          variant="default"
          size="lg"
          className="h-12 w-full rounded-full"
          disabled={!canPreview}
          onClick={() => router.push("/bridge/preview")}
        >
          {previewLabel}
        </Button>
      </div>
    </div>
  )
}
