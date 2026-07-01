"use client"

import { useState } from "react"

import { ApyCard } from "@/components/earn/apy-card"
import { EarnActionDrawer } from "@/components/earn/earn-action-drawer"
import { MarketExposureList } from "@/components/earn/market-exposure-list"
import { VaultInfoSkeleton } from "@/components/earn/vault-info-skeleton"
import { VaultMetadata } from "@/components/earn/vault-metadata"
import { VaultStatsGrid } from "@/components/earn/vault-stats-grid"
import { Button } from "@/components/ui/button"
import { useVault } from "@/hooks/use-vault"
import type { EarnDrawerMode } from "@/lib/earn/types"

export default function VaultInfo() {
  const { data: vault, isLoading, isError, error, refetch } = useVault()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerMode, setDrawerMode] = useState<EarnDrawerMode>("deposit")

  const openDrawer = (mode: EarnDrawerMode) => {
    setDrawerMode(mode)
    setDrawerOpen(true)
  }

  if (isLoading) {
    return <VaultInfoSkeleton />
  }

  if (isError || !vault) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card/80 p-6 text-center">
        <p className="text-sm text-muted-foreground">
          {error?.message ?? "Could not load vault data."}
        </p>
        <Button variant="outline" size="sm" onClick={() => refetch()}>
          Try again
        </Button>
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-col gap-4 pb-28">
        <ApyCard
          apy={vault.apy}
          previewAmountUsdt={vault.previewAmountUsdt}
          projectedYearlyEarningsUsdt={vault.projectedYearlyEarningsUsdt}
          assetSymbol={vault.assetSymbol}
        />

        <VaultStatsGrid vault={vault} />

        <MarketExposureList markets={vault.markets} />

        <VaultMetadata vault={vault} />
      </div>

      <div className="fixed inset-x-0 bottom-0 z-10 mx-auto w-full max-w-[430px] border-t border-border bg-background/95 px-4 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur supports-backdrop-filter:bg-background/80">
        <Button
          size="lg"
          className="h-12 w-full rounded-full bg-linear-to-r from-kivon-400 to-kivon-600 text-base font-semibold text-white hover:from-kivon-500 hover:to-kivon-700"
          onClick={() => openDrawer("deposit")}
        >
          Deposit & Withdraw
        </Button>
      </div>

      <EarnActionDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        vault={vault}
        initialMode={drawerMode}
      />
    </>
  )
}
