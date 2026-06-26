"use client"

import { useBridge } from "@/context/bridge-context"
import { cn } from "@/lib/utils"

export function AmountInput({ className }: { className?: string }) {
  const { amount, setAmount, amountMode, origin } = useBridge()

  const unitLabel = amountMode === "usd" ? "USD" : (origin?.tokenSymbol ?? "")

  // Grow the field with its content; keep a sensible minimum so "0" is centered.
  const charWidth = Math.max(1, (amount || "0").length)

  return (
    <div className={cn("flex items-center justify-center gap-3", className)}>
      <input
        inputMode="decimal"
        autoComplete="off"
        value={amount}
        onChange={(event) => setAmount(event.target.value)}
        placeholder="0"
        aria-label={`Amount in ${unitLabel}`}
        className="min-w-0 bg-transparent text-right text-6xl font-bold tracking-tight text-foreground outline-none placeholder:text-muted-foreground"
        style={{ width: `${charWidth}ch` }}
      />
      {/* <span className="h-12 w-0.5 shrink-0 rounded-full bg-primary" /> */}
      <span className="text-3xl font-bold text-muted-foreground">
        {unitLabel}
      </span>
    </div>
  )
}
