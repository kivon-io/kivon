"use client"

import { Check, Loader2, X } from "lucide-react"

import { MinipayTopUpPrompt } from "@/components/bridge/minipay-top-up-prompt"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type EarnProcessStep = {
  id: string
  title: string
  description: string
  status: "pending" | "active" | "complete" | "failed"
}

type EarnProcessingProps = {
  steps: EarnProcessStep[]
  error?: string | null
  onRetry?: () => void
  onBack?: () => void
}

function StepIcon({ status }: { status: EarnProcessStep["status"] }) {
  if (status === "complete") {
    return (
      <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-emerald-500">
        <Check className="size-4 text-white" strokeWidth={3} />
      </div>
    )
  }

  if (status === "active") {
    return (
      <div className="relative flex size-9 shrink-0 items-center justify-center">
        <Loader2 className="size-5 animate-spin text-kivon-400" />
      </div>
    )
  }

  if (status === "failed") {
    return (
      <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-destructive">
        <X className="size-4 text-white" strokeWidth={3} />
      </div>
    )
  }

  return (
    <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-muted">
      <span className="size-2 rounded-full bg-muted-foreground/40" />
    </div>
  )
}

export function EarnProcessing({
  steps,
  error,
  onRetry,
  onBack,
}: EarnProcessingProps) {
  const hasError = Boolean(error)

  return (
    <div className="flex flex-col gap-5">
      <div className="text-center">
        <h2 className="text-lg font-bold">
          {hasError ? "Transaction failed" : "Processing"}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {hasError
            ? "Your funds are safe. Nothing was deducted."
            : "Confirm the prompts in your wallet"}
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {steps.map((step) => (
          <div
            key={step.id}
            className={cn(
              "flex items-start gap-3 rounded-2xl border border-border bg-card/80 p-4",
              step.status === "active" && "border-kivon-400/40",
              step.status === "failed" && "border-destructive/40"
            )}
          >
            <StepIcon status={step.status} />
            <div className="min-w-0 flex-1">
              <p className="font-semibold">{step.title}</p>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {hasError && error ? (
        <MinipayTopUpPrompt message={error} />
      ) : null}

      {hasError ? (
        <div className="flex flex-col gap-3">
          {onRetry ? (
            <Button
              type="button"
              size="lg"
              className="h-12 rounded-full bg-linear-to-r from-kivon-400 to-kivon-600 text-base font-semibold text-white hover:from-kivon-500 hover:to-kivon-700"
              onClick={onRetry}
            >
              Try again
            </Button>
          ) : null}
          {onBack ? (
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="h-12 rounded-full"
              onClick={onBack}
            >
              Back
            </Button>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
