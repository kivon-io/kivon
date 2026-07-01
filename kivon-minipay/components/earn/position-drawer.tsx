"use client"

import { ChevronDown, Gift, Loader2 } from "lucide-react"
import Image from "next/image"

import { MinipayTopUpPrompt } from "@/components/bridge/minipay-top-up-prompt"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from "@/components/ui/drawer"
import { useClaimRewards } from "@/hooks/use-claim-rewards"
import { useEarnBalances } from "@/hooks/use-earn-balances"
import { useMerklRewards } from "@/hooks/use-merkl-rewards"
import { useVault } from "@/hooks/use-vault"
import { useWallet } from "@/hooks/use-wallet"
import { formatAmount, formatUsd } from "@/lib/bridge/format"
import { EARN_INFO } from "@/lib/earn/constants"
import { formatPercent } from "@/lib/earn/format"
import type { Address } from "viem"

type PositionDrawerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

function StatCard({
  label,
  value,
  valueClassName,
}: {
  label: string
  value: string
  valueClassName?: string
}) {
  return (
    <div className="flex flex-col gap-1 rounded-2xl border border-border bg-card/80 p-3">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className={`text-base font-bold tabular-nums ${valueClassName ?? ""}`}>
        {value}
      </span>
    </div>
  )
}

export function PositionDrawer({ open, onOpenChange }: PositionDrawerProps) {
  const { address, isConnected } = useWallet()
  const { vaultPosition, isLoading: isBalanceLoading } = useEarnBalances(address)
  const { data: vault } = useVault()
  const {
    data: rewardsData,
    isLoading: isRewardsLoading,
    refetch: refetchRewards,
  } = useMerklRewards(address)
  const {
    claim,
    isClaiming,
    error: claimError,
    reset: resetClaim,
  } = useClaimRewards()

  const netApy = vault?.apy.netApyPercent ?? 0
  const apyRatio = netApy / 100
  const perYear = vaultPosition * apyRatio
  const perMonth = perYear / 12

  const rewards = rewardsData?.rewards ?? []
  const totalRewardsUsd = rewardsData?.totalUsd ?? 0
  const hasRewards = rewards.length > 0
  const singleReward = rewards.length === 1 ? rewards[0] : null

  const handleClaim = async () => {
    if (!address || !hasRewards) return
    const success = await claim(address as Address, rewards)
    if (success) {
      await refetchRewards()
    }
  }

  const handleDrawerOpenChange = (next: boolean) => {
    if (!next && isClaiming) return
    if (!next) resetClaim()
    onOpenChange(next)
  }

  const showEmpty =
    isConnected && !isBalanceLoading && vaultPosition <= 0 && !hasRewards

  return (
    <Drawer open={open} onOpenChange={handleDrawerOpenChange}>
      <DrawerContent className="mx-auto max-w-[430px] bg-background pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <div className="flex max-h-[80vh] flex-col gap-5 overflow-y-auto px-4 pt-2">
          <DrawerDescription className="sr-only">
            Your Feather USDT vault position and claimable rewards.
          </DrawerDescription>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              aria-label="Close"
              className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:text-foreground"
            >
              <ChevronDown className="size-5" />
            </button>
            <DrawerTitle className="text-lg font-bold">
              Your position
            </DrawerTitle>
          </div>

          {!isConnected ? (
            <div className="rounded-2xl border border-border bg-card/80 p-6 text-center text-sm text-muted-foreground">
              Connect your wallet to view your position.
            </div>
          ) : isBalanceLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="size-6 animate-spin text-muted-foreground" />
            </div>
          ) : showEmpty ? (
            <div className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card/80 p-8 text-center">
              <p className="font-semibold">No position yet</p>
              <p className="text-sm text-muted-foreground">
                Deposit USDT into {EARN_INFO.name} to start earning yield.
              </p>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-1">
                <span className="text-sm text-muted-foreground">
                  Position value
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold tracking-tight tabular-nums">
                    {formatAmount(vaultPosition, 2)}
                  </span>
                  <span className="text-lg font-semibold text-muted-foreground">
                    {EARN_INFO.assetSymbol}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground tabular-nums">
                  ≈ {formatUsd(vaultPosition)}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <StatCard
                  label="Net APY"
                  value={formatPercent(netApy)}
                  valueClassName="text-emerald-500"
                />
                <StatCard
                  label="Per month"
                  value={`+${formatAmount(perMonth, 2)}`}
                  valueClassName="text-emerald-500"
                />
                <StatCard
                  label="Per year"
                  value={`+${formatAmount(perYear, 2)}`}
                  valueClassName="text-emerald-500"
                />
              </div>

              <div className="rounded-2xl border border-border bg-card/80 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm text-muted-foreground">
                      Claimable rewards
                    </p>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="text-2xl font-bold tabular-nums">
                        {isRewardsLoading
                          ? "…"
                          : singleReward
                            ? formatAmount(singleReward.unclaimed, 2)
                            : formatUsd(totalRewardsUsd)}
                      </span>
                      {singleReward ? (
                        <span className="text-sm font-semibold text-muted-foreground">
                          {singleReward.symbol}
                        </span>
                      ) : null}
                    </div>
                    {singleReward && singleReward.priceUsd > 0 ? (
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        ≈ {formatUsd(totalRewardsUsd)}
                      </p>
                    ) : null}
                  </div>
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted text-kivon-500">
                    <Gift className="size-5" />
                  </div>
                </div>

                <Button
                  size="lg"
                  className="mt-4 h-12 w-full rounded-full bg-linear-to-r from-kivon-400 to-kivon-600 text-base font-semibold text-white hover:from-kivon-500 hover:to-kivon-700"
                  disabled={!hasRewards || isClaiming || isRewardsLoading}
                  onClick={handleClaim}
                >
                  {isClaiming
                    ? "Claiming..."
                    : hasRewards
                      ? "Claim rewards"
                      : "No rewards to claim"}
                </Button>

                {claimError ? (
                  <MinipayTopUpPrompt message={claimError} className="mt-3" />
                ) : null}
              </div>

              <div className="flex items-center gap-2 rounded-2xl border border-border bg-card/40 px-4 py-3">
                <div className="relative size-5 shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={EARN_INFO.chainImage}
                    alt={EARN_INFO.chainName}
                    width={20}
                    height={20}
                    className="object-cover"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Deposited in {EARN_INFO.name} on {EARN_INFO.chainName}.
                  Rewards are distributed via Merkl.
                </p>
              </div>
            </>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  )
}
