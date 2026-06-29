"use client"

import { AmountInput } from "@/components/bridge/amount-input"
import { AmountModeToggle } from "@/components/bridge/amount-mode-toggle"
import { MinipayTopUpLink } from "@/components/bridge/minipay-top-up-prompt"
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
    maxSendable,
    hasInsufficientBalance,
    isLoading: isBalanceLoading,
    setAmount,
  } = useOriginBalance({ quote })

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

  const maxAmount = maxSendable

  const handleMax = () => {
    if (maxAmount <= 0) return
    setAmount(maxAmount.toString())
  }

  const previewLabel = hasInsufficientBalance
    ? "Insufficient balance"
    : "Preview Bridge"

  return (
    <div className="flex min-h-[calc(100svh-3rem)] flex-col gap-4 p-4">
      <Header
        heading="Bridge"
        // subHeading="Bridge your tokens from Celo to other networks"
      />

      <div className="flex flex-col gap-2">
        <RoutePicker />

        <AmountInput />
        <AmountModeToggle />
        {originAsset ? (
          <>
            <OriginBalance
              symbol={originAsset.tokenSymbol}
              balanceDisplay={balanceDisplay}
              hasInsufficientBalance={hasInsufficientBalance}
              isLoading={isBalanceLoading}
              canMax={maxAmount > 0}
              onMax={handleMax}
            />
            {hasInsufficientBalance ? (
              <p className="text-center text-sm text-muted-foreground">
                Amount is too small to cover fees required to execute this
                bridge. <MinipayTopUpLink /> in MiniPay to continue.
              </p>
            ) : null}
          </>
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
