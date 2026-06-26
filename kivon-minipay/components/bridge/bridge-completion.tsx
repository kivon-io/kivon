"use client"

import { ArrowUpRight, Check } from "lucide-react"
import { Button } from "../ui/button"

const TEAL = "#6fb3aa"

type BridgeCompletionProps = {
  sentLabel: string
  receivedLabel: string
  route: string
  destChainName: string
  durationLabel: string
  explorerUrl?: string
  onDone: () => void
}

function SummaryRow({
  label,
  value,
  accent,
}: {
  label: string
  value: string
  accent?: boolean
}) {
  return (
    <div className="flex items-center justify-between py-3">
      <span className="text-sm text-white/50">{label}</span>
      <span
        className="text-sm font-semibold"
        style={{ color: accent ? "var(--color-kivon-500)" : "#fff" }}
      >
        {value}
      </span>
    </div>
  )
}

export function BridgeCompletion({
  sentLabel,
  receivedLabel,
  route,
  destChainName,
  durationLabel,
  explorerUrl,
  onDone,
}: BridgeCompletionProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center bg-linear-to-b from-kivon-300/50 via-white to-white px-6 pt-[max(4rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))] dark:from-kivon-500/50 dark:via-black dark:to-black">
      <div className="mx-auto flex w-full max-w-[360px] flex-1 flex-col">
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <div className="relative flex size-24 items-center justify-center">
            <span
              aria-hidden
              className="absolute inline-flex size-20 animate-ping rounded-full bg-white/20"
            />
            <div className="relative flex size-24 items-center justify-center rounded-full bg-white shadow-lg ring-4 ring-white/15">
              <Check
                className="size-12"
                strokeWidth={3}
                style={{ color: "#3f8d84" }}
              />
            </div>
          </div>
          <h1 className="mt-7 text-3xl font-bold tracking-tight text-foreground">
            Bridge complete
          </h1>
          <p className="mt-2 text-balance text-muted-foreground dark:text-muted-foreground">
            {receivedLabel} arrived on {destChainName} in {durationLabel}.
          </p>

          <div className="mt-7 w-full rounded-2xl bg-white/5 px-4 py-1 text-left">
            <SummaryRow label="Sent" value={sentLabel} />
            <div className="border-t border-white/5" />
            <SummaryRow label="Received" value={receivedLabel} accent />
            <div className="border-t border-white/5" />
            <SummaryRow label="Route" value={route} />
          </div>

          {explorerUrl && (
            <a
              href={explorerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-kivon-500 dark:text-kivon-600"
            >
              View on explorer
              <ArrowUpRight className="size-4" />
            </a>
          )}
        </div>

        <Button
          type="button"
          onClick={onDone}
          className="h-14 w-full rounded-full text-base font-semibold text-white transition-opacity hover:opacity-90 active:translate-y-px"
        >
          Done
        </Button>
      </div>
    </div>
  )
}
