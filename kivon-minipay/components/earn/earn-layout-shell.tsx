"use client"

import { useState } from "react"

import { EarnIntroSheet } from "@/components/earn/earn-intro-sheet"
import { useHasMounted } from "@/hooks/use-has-mounted"
import { useVault } from "@/hooks/use-vault"
import {
  isEarnIntroDismissed,
  persistEarnIntroDismissed,
} from "@/lib/earn/intro-storage"

type EarnLayoutShellProps = {
  children: React.ReactNode
}

export function EarnLayoutShell({ children }: EarnLayoutShellProps) {
  const mounted = useHasMounted()
  const [introResolved, setIntroResolved] = useState(false)
  const { data: vault } = useVault()

  const shouldShowIntro = mounted && !isEarnIntroDismissed()
  const isPageVisible = mounted && (!shouldShowIntro || introResolved)
  const introOpen = shouldShowIntro && !introResolved && Boolean(vault)

  const handleContinue = (hideNextTime: boolean) => {
    if (hideNextTime) {
      persistEarnIntroDismissed()
    }
    setIntroResolved(true)
  }

  return (
    <>
      {isPageVisible ? (
        <div className="relative p-4">{children}</div>
      ) : null}

      {introOpen && vault ? (
        <EarnIntroSheet
          open
          netApyPercent={vault.apy.netApyPercent}
          onContinue={handleContinue}
        />
      ) : null}
    </>
  )
}
