"use client"

import { MINIPAY_ADD_CASH_URL } from "@/lib/app/config"
import { shouldOfferMinipayTopUp } from "@/lib/wallet/minipay-top-up"
import { cn } from "@/lib/utils"

type MinipayTopUpPromptProps = {
  message: string
  className?: string
}

/** Fee / balance error with optional MiniPay add-cash link. */
export function MinipayTopUpPrompt({ message, className }: MinipayTopUpPromptProps) {
  const showTopUp = shouldOfferMinipayTopUp(message)

  return (
    <div
      className={cn(
        "rounded-2xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-center text-sm text-destructive",
        className
      )}
    >
      <p>{message}</p>
      {showTopUp ? (
        <p className="mt-2 text-foreground">
          <a
            href={MINIPAY_ADD_CASH_URL}
            className="font-semibold text-kivon-600 underline underline-offset-2"
          >
            Top up
          </a>{" "}
          in MiniPay to continue.
        </p>
      ) : null}
    </div>
  )
}

type MinipayTopUpLinkProps = {
  className?: string
  label?: string
}

export function MinipayTopUpLink({
  className,
  label = "Top up",
}: MinipayTopUpLinkProps) {
  return (
    <a
      href={MINIPAY_ADD_CASH_URL}
      className={cn(
        "font-semibold text-kivon-600 underline underline-offset-2",
        className
      )}
    >
      {label}
    </a>
  )
}
