"use client"

import {
  Clock,
  Globe,
  Info,
  RefreshCw,
  ShieldCheck,
  TrendingUp,
} from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet"
import { EARN_INFO } from "@/lib/earn/constants"
import { formatPercent } from "@/lib/earn/format"
import { cn } from "@/lib/utils"

type EarnIntroSheetProps = {
  open: boolean
  netApyPercent: number
  onContinue: (hideNextTime: boolean) => void
}

const FEATURES = [
  {
    icon: Clock,
    title: "Withdraw anytime",
    description:
      "Take your money out instantly, subject to available liquidity.",
  },
  {
    icon: RefreshCw,
    title: "Auto-compounding",
    description:
      "Your balance grows on its own. No manual claiming or payouts.",
  },
  {
    icon: Globe,
    title: "Powered by Morpho on Celo",
    description: "Built on audited, battle-tested DeFi lending infrastructure.",
  },
  {
    icon: ShieldCheck,
    title: "Your funds stay non-custodial",
    description: "Only you control your money. Kivon never holds it.",
    showInfo: true,
  },
] as const

function EarnIntroIllustration() {
  return (
    <div className="relative mx-auto flex h-36 w-full max-w-[280px] items-end justify-center">
      <div className="absolute inset-x-8 bottom-2 flex items-end justify-center gap-2">
        <div className="h-10 w-7 rounded-md bg-linear-to-t from-kivon-600/40 to-kivon-400/20" />
        <div className="h-16 w-7 rounded-md bg-linear-to-t from-kivon-600/50 to-kivon-400/30" />
        <div className="h-24 w-7 rounded-md bg-linear-to-t from-kivon-600/60 to-kivon-400/40" />
      </div>
      <div className="relative z-10 flex size-20 items-center justify-center rounded-full bg-linear-to-br from-kivon-400 to-kivon-600 shadow-[0_0_40px_rgba(224,154,171,0.35)]">
        <TrendingUp className="size-9 text-white" strokeWidth={2.5} />
      </div>
    </div>
  )
}

function FeatureRow({
  icon: Icon,
  title,
  description,
  showInfo,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  showInfo?: boolean
}) {
  return (
    <div className="flex gap-3 py-2">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground">
        <Icon className="size-4" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <p className="font-semibold text-foreground">{title}</p>
          {showInfo ? (
            <Info className="size-3.5 text-muted-foreground" aria-hidden />
          ) : null}
        </div>
        <p className="mt-0.5 text-sm leading-snug text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  )
}

export function EarnIntroSheet({
  open,
  netApyPercent,
  onContinue,
}: EarnIntroSheetProps) {
  const [hideNextTime, setHideNextTime] = useState(false)

  const handleContinue = () => {
    onContinue(hideNextTime)
  }

  return (
    <Sheet open={open}>
      <SheetContent
        side="bottom"
        showCloseButton={false}
        onInteractOutside={(event) => event.preventDefault()}
        onEscapeKeyDown={(event) => event.preventDefault()}
        className={cn(
          "inset-x-0 top-0 z-100 h-dvh w-full max-w-none gap-0 overflow-hidden rounded-none border-0 bg-background p-0",
          "data-[side=bottom]:top-0 data-[side=bottom]:bottom-auto data-[side=bottom]:h-dvh",
          "pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))]"
        )}
      >
        <div className="mx-auto flex h-full max-w-[430px] flex-col overflow-y-auto">
          <div className="relative px-4 pt-2 pb-2">
            <EarnIntroIllustration />

            <SheetTitle className="mt-4 text-center text-2xl leading-tight font-bold tracking-tight">
              Earn up to{" "}
              <span className="text-emerald-500">
                {formatPercent(netApyPercent)}
              </span>{" "}
              APY on your {EARN_INFO.assetSymbol}
            </SheetTitle>
            <SheetDescription className="text-center text-base text-muted-foreground">
              Put idle stablecoins to work in the {EARN_INFO.name} vault.
            </SheetDescription>
          </div>

          <div className="flex flex-col px-4 py-2">
            {FEATURES.map((feature) => (
              <FeatureRow key={feature.title} {...feature} />
            ))}
          </div>

          <div className="mt-auto flex flex-col gap-4 px-4 pt-4">
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={hideNextTime}
                onChange={(event) => setHideNextTime(event.target.checked)}
                className="size-4 shrink-0 rounded border border-border accent-kivon-500"
              />
              <span className="text-sm text-muted-foreground">
                Hide this next time
              </span>
            </label>

            <Button
              size="lg"
              className="h-12 w-full rounded-full bg-linear-to-r from-kivon-400 to-kivon-600 text-base font-semibold text-white hover:from-kivon-500 hover:to-kivon-700"
              onClick={handleContinue}
            >
              Continue
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
