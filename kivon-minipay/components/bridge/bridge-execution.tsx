import { ArrowRight, Check, X } from "lucide-react"

import { AssetIcon } from "@/components/bridge/asset-icon"
import { MinipayTopUpPrompt } from "@/components/bridge/minipay-top-up-prompt"
import { formatAmount } from "@/lib/bridge/format"
import { shouldOfferMinipayTopUp } from "@/lib/wallet/minipay-top-up"
import type { BridgeAsset } from "@/lib/bridge/types"
import type { ExecStepView } from "@/lib/bridge/view-model"
import { cn } from "@/lib/utils"

type BridgeExecutionProps = {
  origin: BridgeAsset
  destination: BridgeAsset
  sendAmount: number
  receiveAmount: string
  statusLabel: string
  statusTone: "progress" | "failed"
  timeLeftLabel?: string
  steps: ExecStepView[]
  helperText: string
  explorerUrl?: string
  onRetry?: () => void
  onCancel?: () => void
}

function AssetCard({ asset, amount }: { asset: BridgeAsset; amount: string }) {
  return (
    <div className="flex flex-1 flex-col gap-3 rounded-2xl border border-border bg-card p-4">
      <div className="relative">
        <AssetIcon
          tokenImage={asset.tokenImage}
          tokenSymbol={asset.tokenSymbol}
          chainImage={asset.chainImage}
          chainName={asset.chainDisplayName}
          size="md"
        />
      </div>
      <div className="space-y-0.5">
        <p className="text-sm text-muted-foreground">
          {asset.chainDisplayName}
        </p>
        <p className="text-sm font-semibold tracking-tight">
          {amount} {asset.tokenSymbol}
        </p>
      </div>
    </div>
  )
}

function StepIndicator({
  step,
  isLast,
}: {
  step: ExecStepView
  isLast: boolean
}) {
  return (
    <div className="flex flex-col items-center self-stretch">
      <div
        className={cn(
          "flex size-10 items-center justify-center rounded-full",
          step.state === "done" && "bg-primary text-primary-foreground",
          step.state === "failed" && "bg-destructive text-white",
          step.state === "active" && "border-2 border-muted",
          step.state === "upcoming" && "bg-muted"
        )}
      >
        {step.state === "done" && <Check className="size-5" strokeWidth={3} />}
        {step.state === "failed" && <X className="size-5" strokeWidth={3} />}
        {step.state === "active" && (
          <span className="size-6 animate-spin rounded-full border-2 border-muted border-t-primary" />
        )}
        {step.state === "upcoming" && (
          <span className="size-2 rounded-full bg-muted-foreground/40" />
        )}
      </div>
      {!isLast && (
        <span
          className={cn(
            "my-1 w-px flex-1",
            step.state === "done" ? "bg-primary/40" : "bg-border"
          )}
        />
      )}
    </div>
  )
}

const badgeTone: Record<NonNullable<ExecStepView["badge"]>["tone"], string> = {
  done: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
  active: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
  failed: "bg-destructive/15 text-destructive",
}

function StepRow({ step, isLast }: { step: ExecStepView; isLast: boolean }) {
  const dim = step.state === "upcoming"
  return (
    <div className="flex gap-4">
      <StepIndicator step={step} isLast={isLast} />
      <div className={cn("flex-1 pb-6", isLast && "pb-0")}>
        <div className="flex items-center gap-2">
          <p
            className={cn(
              "font-semibold tracking-tight",
              dim && "text-muted-foreground"
            )}
          >
            {step.title}
          </p>
          {step.badge && (
            <span
              className={cn(
                "rounded px-1.5 py-0.5 text-[0.65rem] font-bold tracking-wide",
                badgeTone[step.badge.tone]
              )}
            >
              {step.badge.label}
            </span>
          )}
        </div>
        <p
          className={cn(
            "text-sm",
            dim ? "text-muted-foreground/60" : "text-muted-foreground"
          )}
        >
          {step.subtitle}
        </p>
      </div>
    </div>
  )
}

export function BridgeExecution({
  origin,
  destination,
  sendAmount,
  receiveAmount,
  statusLabel,
  statusTone,
  timeLeftLabel,
  steps,
  helperText,
  explorerUrl,
  onRetry,
  onCancel,
}: BridgeExecutionProps) {
  const failed = statusTone === "failed"

  return (
    <div className="flex min-h-[calc(100svh-3rem)] flex-col gap-5 p-6">
      {/* Route header */}
      <div className="flex items-stretch gap-2">
        <AssetCard asset={origin} amount={formatAmount(sendAmount, 2)} />
        <div className="flex items-center text-muted-foreground">
          <ArrowRight className="size-5" />
        </div>
        <AssetCard asset={destination} amount={formatAmount(receiveAmount)} />
      </div>

      {/* Status line */}
      <div className="flex items-center justify-center gap-2 text-sm">
        <span
          className={cn(
            "size-2 rounded-full",
            failed ? "bg-destructive" : "bg-amber-500"
          )}
        />
        <span className="font-semibold">{statusLabel}</span>
        {timeLeftLabel && (
          <span className="text-muted-foreground">· {timeLeftLabel}</span>
        )}
      </div>

      {/* Steps */}
      <div className="rounded-2xl border border-border bg-card p-5">
        {steps.map((step, i) => (
          <StepRow key={step.key} step={step} isLast={i === steps.length - 1} />
        ))}
      </div>

      {failed && shouldOfferMinipayTopUp(helperText) ? (
        <MinipayTopUpPrompt message={helperText} />
      ) : (
        <p className="text-center text-sm text-muted-foreground">{helperText}</p>
      )}

      <div className="mt-auto flex flex-col gap-2">
        {failed && onRetry ? (
          <button
            type="button"
            onClick={onRetry}
            className="flex h-12 items-center justify-center rounded-full bg-primary text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90 active:translate-y-px"
          >
            Try again
          </button>
        ) : null}

        {onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            className="flex h-12 items-center justify-center rounded-full border border-border bg-card text-base font-semibold transition-colors hover:bg-muted"
          >
            {failed ? "Back to bridge" : "Cancel"}
          </button>
        ) : null}

        {explorerUrl ? (
          <a
            href={explorerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 items-center justify-center rounded-full border border-border bg-card text-base font-semibold transition-colors hover:bg-muted"
          >
            View on explorer
          </a>
        ) : null}
      </div>
    </div>
  )
}
