"use client"

import type { BridgeAsset } from "@/lib/bridge/types"
import { formatAmount, formatUsd, truncateAddress } from "@/lib/bridge/format"
import { cn } from "@/lib/utils"

type ReviewSummaryProps = {
  origin: BridgeAsset
  destination: BridgeAsset
  sendAmount: number
  rate: string
  timeEstimate: number
  recipient: string
}

export function ReviewSummary({
  origin,
  destination,
  sendAmount,
  rate,
  timeEstimate,
  recipient,
}: ReviewSummaryProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <ReviewRow
        label="You send"
        value={
          <span className="inline-flex items-center gap-2">
            <TokenIcon image={origin.tokenImage} symbol={origin.tokenSymbol} />
            {formatAmount(sendAmount, 2)} {origin.tokenSymbol}
          </span>
        }
      />
      <ReviewRow
        label="Route"
        value={
          <span className="inline-flex items-center gap-1.5">
            <ChainIcon image={origin.chainImage} name={origin.chainDisplayName} />
            {origin.chainDisplayName}
            <span className="text-muted-foreground">→</span>
            <ChainIcon image={destination.chainImage} name={destination.chainDisplayName} />
            {destination.chainDisplayName}
          </span>
        }
      />
      <ReviewRow
        label="Rate"
        value={
          <span className="inline-flex items-center gap-1.5">
            1 {origin.tokenSymbol} ≈ {formatAmount(rate)} {destination.tokenSymbol}
          </span>
        }
      />
      <ReviewRow label="Est. arrival" value={`~${timeEstimate} seconds`} />
      <ReviewRow
        label="Recipient"
        value={truncateAddress(recipient)}
        isLast
      />
    </div>
  )
}

type ReviewHeroProps = {
  destination: BridgeAsset
  receiveAmount: string
  receiveSymbol: string
  receiveUsd: string
}

export function ReviewHero({
  destination,
  receiveAmount,
  receiveSymbol,
  receiveUsd,
}: ReviewHeroProps) {
  return (
    <div className="flex flex-col items-center gap-2 py-2 text-center">
      <p className="text-sm text-muted-foreground">You receive</p>
      <p className="text-5xl font-bold tracking-tight text-foreground">
        {formatAmount(receiveAmount)}{" "}
        <span className="text-3xl font-semibold text-muted-foreground">
          {receiveSymbol}
        </span>
      </p>
      <p className="inline-flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
        ≈ {formatUsd(receiveUsd)} on
        <ChainIcon image={destination.chainImage} name={destination.chainDisplayName} />
        {destination.chainDisplayName}
      </p>
    </div>
  )
}

function ReviewRow({
  label,
  value,
  isLast,
}: {
  label: string
  value: React.ReactNode
  isLast?: boolean
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 px-4 py-4",
        !isLast && "border-b border-border"
      )}
    >
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-right text-sm font-semibold text-foreground">{value}</span>
    </div>
  )
}

function TokenIcon({ image, symbol }: { image?: string; symbol: string }) {
  if (image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={image}
        alt={symbol}
        width={20}
        height={20}
        className="size-5 rounded-full object-cover"
      />
    )
  }
  return (
    <span className="flex size-5 items-center justify-center rounded-full bg-muted text-[10px] font-semibold uppercase">
      {symbol.slice(0, 1)}
    </span>
  )
}

function ChainIcon({ image, name }: { image?: string; name: string }) {
  if (image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={image}
        alt={name}
        width={16}
        height={16}
        className="size-4 rounded-full object-cover"
      />
    )
  }
  return (
    <span className="flex size-4 items-center justify-center rounded-full bg-muted text-[8px] font-semibold uppercase">
      {name.slice(0, 1)}
    </span>
  )
}
