"use client"

import { ChevronDown, ChevronRight, Minus, Plus } from "lucide-react"
import Image from "next/image"
import { useEffect, useMemo, useState } from "react"

import { MinipayTopUpLink } from "@/components/bridge/minipay-top-up-prompt"
import { EarnProcessing } from "@/components/earn/earn-processing"
import { EarnReview } from "@/components/earn/earn-review"
import { EarnSuccess } from "@/components/earn/earn-success"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from "@/components/ui/drawer"
import { useEarnBalances } from "@/hooks/use-earn-balances"
import { useEarnExecute } from "@/hooks/use-earn-execute"
import { useWallet } from "@/hooks/use-wallet"
import { formatAmount, formatUsd } from "@/lib/bridge/format"
import { EARN_INFO } from "@/lib/earn/constants"
import { formatPercent } from "@/lib/earn/format"
import type {
  EarnDrawerMode,
  EarnDrawerStep,
  VaultDetails,
} from "@/lib/earn/types"
import { cn } from "@/lib/utils"
import { DEFAULT_STABLE_GAS_RESERVE } from "@/lib/wallet/gas-reserve"

export type { EarnDrawerMode }

type EarnActionDrawerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  vault: VaultDetails
  initialMode?: EarnDrawerMode
}

function sanitizeAmountInput(value: string) {
  const cleaned = value.replace(/[^\d.]/g, "")
  const [whole, ...rest] = cleaned.split(".")
  if (rest.length === 0) return whole
  return `${whole}.${rest.join("").slice(0, 6)}`
}

function parseAmount(value: string) {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : 0
}

function ModeToggle({
  mode,
  onChange,
}: {
  mode: EarnDrawerMode
  onChange: (mode: EarnDrawerMode) => void
}) {
  return (
    <div className="grid grid-cols-2 gap-1 rounded-2xl bg-muted/50 p-1">
      {(["deposit", "withdraw"] as const).map((option) => {
        const isActive = mode === option
        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={cn(
              "rounded-xl px-4 py-2.5 text-sm font-semibold capitalize transition-colors",
              isActive
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {option}
          </button>
        )
      })}
    </div>
  )
}

function TokenPill() {
  return (
    <div className="flex items-center gap-1.5 rounded-full bg-muted px-2 py-1">
      <div className="relative size-5 overflow-hidden rounded-full">
        <Image
          src={EARN_INFO.assetImage}
          alt={EARN_INFO.assetSymbol}
          width={20}
          height={20}
          className="object-cover"
        />
      </div>
      <span className="text-sm font-semibold">{EARN_INFO.assetSymbol}</span>
    </div>
  )
}

function DrawerHeaderBar({
  title,
  onCollapse,
}: {
  title: string
  onCollapse: () => void
}) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={onCollapse}
        aria-label="Back"
        className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:text-foreground"
      >
        <ChevronDown className="size-5" />
      </button>
      <h2 className="text-lg font-bold">{title}</h2>
    </div>
  )
}

function MenuRow({
  icon,
  title,
  description,
  onClick,
}: {
  icon: React.ReactNode
  title: string
  description: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 py-4 text-left transition-opacity hover:opacity-80"
    >
      <span className="flex size-6 shrink-0 items-center justify-center text-foreground">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-semibold">{title}</span>
        <span className="block text-sm text-muted-foreground">
          {description}
        </span>
      </span>
      <ChevronRight className="size-5 shrink-0 text-muted-foreground" />
    </button>
  )
}

function DetailRow({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between gap-3 py-1.5 text-sm">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="flex items-center gap-1.5 font-medium tabular-nums">
        {children}
      </span>
    </div>
  )
}

function Transition({ from, to }: { from: string; to: string }) {
  return (
    <>
      <span className="text-muted-foreground">{from}</span>
      <ChevronRight className="size-3.5 text-muted-foreground" />
      <span className="text-foreground">{to}</span>
    </>
  )
}

export function EarnActionDrawer({
  open,
  onOpenChange,
  vault,
  initialMode = "deposit",
}: EarnActionDrawerProps) {
  const { address, isConnected, connect, isConnecting } = useWallet()
  const {
    walletBalance,
    vaultPosition,
    isLoading: isBalanceLoading,
    refetch,
  } = useEarnBalances(address)
  const {
    steps,
    isExecuting,
    error: executeError,
    execute,
    reset: resetExecute,
  } = useEarnExecute()

  const [mode, setMode] = useState<EarnDrawerMode>(initialMode)
  const [step, setStep] = useState<EarnDrawerStep>("menu")
  const [amount, setAmount] = useState("")
  const [confirmedAmount, setConfirmedAmount] = useState(0)

  useEffect(() => {
    if (open) {
      setMode(initialMode)
      setStep("menu")
      setAmount("")
      setConfirmedAmount(0)
      resetExecute()
    }
  }, [open, initialMode, resetExecute])

  const numericAmount = parseAmount(amount)
  const isDeposit = mode === "deposit"
  const availableBalance = isDeposit ? walletBalance : vaultPosition

  const apyRatio = vault.apy.netApyPercent / 100
  const newPosition = isDeposit
    ? vaultPosition + numericAmount
    : Math.max(0, vaultPosition - numericAmount)

  const monthlyBefore = (vaultPosition * apyRatio) / 12
  const monthlyAfter = (newPosition * apyRatio) / 12
  const yearlyBefore = vaultPosition * apyRatio
  const yearlyAfter = newPosition * apyRatio

  const exceedsBalance = numericAmount > availableBalance

  // Gas is paid in USDT from the wallet (CIP-64). Deposit also spends `amount`,
  // so the wallet must keep a small buffer; withdraw just needs gas in wallet.
  const insufficientGas =
    isConnected &&
    numericAmount > 0 &&
    !isBalanceLoading &&
    (isDeposit
      ? walletBalance < numericAmount + DEFAULT_STABLE_GAS_RESERVE
      : walletBalance < DEFAULT_STABLE_GAS_RESERVE)

  const showTopUp = insufficientGas
  const canSubmit =
    isConnected &&
    numericAmount > 0 &&
    !exceedsBalance &&
    !insufficientGas &&
    !isBalanceLoading

  const actionLabel = useMemo(() => {
    if (!isConnected) return "Connect wallet"
    if (isConnecting) return "Connecting..."
    if (exceedsBalance && numericAmount > 0) return "Insufficient balance"
    if (insufficientGas) return "Not enough for gas"
    return "Continue"
  }, [
    exceedsBalance,
    insufficientGas,
    isConnected,
    isConnecting,
    numericAmount,
  ])

  const handleMax = () => {
    if (availableBalance <= 0) return
    // Gas is paid in USDT (CIP-64), so a full-balance deposit would leave
    // nothing for the fee. Reserve a small buffer from the wallet balance.
    const maxAmount = isDeposit
      ? Math.max(0, availableBalance - DEFAULT_STABLE_GAS_RESERVE)
      : availableBalance
    if (maxAmount <= 0) return
    setAmount(maxAmount.toString())
  }

  const handleSelectMode = (selected: EarnDrawerMode) => {
    setMode(selected)
    setAmount("")
    setStep("form")
  }

  const handleFormAction = async () => {
    if (!isConnected) {
      await connect()
      return
    }
    if (!canSubmit) return
    setConfirmedAmount(numericAmount)
    setStep("review")
  }

  const handleConfirm = async () => {
    if (!address) return
    setStep("processing")
    const success = await execute({
      mode,
      amount: confirmedAmount,
      address,
      netApyPercent: vault.apy.netApyPercent,
    })
    if (success) {
      await refetch()
      setStep("success")
    }
  }

  const handleRetry = async () => {
    resetExecute()
    await handleConfirm()
  }

  const handleBackToForm = () => {
    resetExecute()
    setStep("form")
  }

  const handleViewPosition = () => {
    onOpenChange(false)
  }

  const handleDrawerOpenChange = (nextOpen: boolean) => {
    if (!nextOpen && isExecuting) return
    onOpenChange(nextOpen)
  }

  const drawerTitle =
    step === "review"
      ? `Review ${isDeposit ? "deposit" : "withdrawal"}`
      : step === "processing"
        ? "Processing"
        : step === "success"
          ? "Success"
          : "Deposit & Withdraw"

  return (
    <Drawer open={open} onOpenChange={handleDrawerOpenChange}>
      <DrawerContent className="mx-auto max-w-[430px] bg-background pb-2">
        <div className="flex flex-col gap-5 overflow-y-auto px-4 pt-2">
          <DrawerTitle className="sr-only">{drawerTitle}</DrawerTitle>
          <DrawerDescription className="sr-only">
            Manage your Feather USDT vault position.
          </DrawerDescription>

          {step === "menu" ? (
            <>
              <DrawerHeaderBar
                title="Deposit & Withdraw"
                onCollapse={() => onOpenChange(false)}
              />
              <div className="flex flex-col divide-y divide-border">
                <MenuRow
                  icon={<Plus className="size-5" />}
                  title="Deposit"
                  description="Deposit assets to earn yield"
                  onClick={() => handleSelectMode("deposit")}
                />
                <MenuRow
                  icon={<Minus className="size-5" />}
                  title="Withdraw"
                  description="Withdraw assets from earning yield"
                  onClick={() => handleSelectMode("withdraw")}
                />
              </div>
            </>
          ) : null}

          {step === "form" ? (
            <>
              <DrawerHeaderBar
                title="Deposit & Withdraw"
                onCollapse={() => setStep("menu")}
              />

              <ModeToggle mode={mode} onChange={setMode} />

              <div className="rounded-2xl border border-border bg-card/80 p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-muted-foreground">
                    You are {isDeposit ? "depositing" : "withdrawing"}
                  </span>
                  <TokenPill />
                </div>
                <input
                  inputMode="decimal"
                  autoComplete="off"
                  value={amount}
                  onChange={(event) =>
                    setAmount(sanitizeAmountInput(event.target.value))
                  }
                  placeholder="0"
                  aria-label={`${isDeposit ? "Deposit" : "Withdraw"} amount`}
                  className="mt-4 w-full bg-transparent text-center text-5xl font-bold tracking-tight text-foreground outline-none placeholder:text-muted-foreground/50"
                />
                <p className="mt-1 text-center text-sm text-muted-foreground tabular-nums">
                  ≈ {formatUsd(numericAmount)}
                </p>

                <div className="mt-4 flex items-center justify-between gap-3 text-sm">
                  <span className="text-muted-foreground">Balance</span>
                  <div className="flex items-center gap-2">
                    <div className="flex items-end gap-1 leading-tight">
                      <span className="font-medium tabular-nums">
                        {isBalanceLoading
                          ? "…"
                          : formatAmount(availableBalance, 2)}
                      </span>
                      <span className="text-xs text-muted-foreground tabular-nums">
                        {isBalanceLoading
                          ? ""
                          : `≈ ${formatUsd(availableBalance)}`}
                      </span>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="rounded-full px-3"
                      onClick={handleMax}
                      disabled={availableBalance <= 0 || isBalanceLoading}
                    >
                      Max
                    </Button>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card/80 p-4">
                <DetailRow label="Network">
                  <span className="relative size-4 overflow-hidden rounded-full">
                    <Image
                      src={EARN_INFO.chainImage}
                      alt={EARN_INFO.chainName}
                      width={16}
                      height={16}
                      className="object-cover"
                    />
                  </span>
                  {EARN_INFO.chainName}
                </DetailRow>
                <DetailRow
                  label={`${isDeposit ? "Deposit" : "Withdraw"} (${EARN_INFO.assetSymbol})`}
                >
                  <Transition
                    from={formatAmount(vaultPosition, 2)}
                    to={formatAmount(newPosition, 2)}
                  />
                </DetailRow>
                <DetailRow label="APY">
                  <span className="text-emerald-500">
                    {formatPercent(vault.apy.netApyPercent)}
                  </span>
                </DetailRow>
                <DetailRow label="Projected monthly earnings">
                  <Transition
                    from={formatUsd(monthlyBefore)}
                    to={formatUsd(monthlyAfter)}
                  />
                </DetailRow>
                <DetailRow label="Projected yearly earnings">
                  <Transition
                    from={formatUsd(yearlyBefore)}
                    to={formatUsd(yearlyAfter)}
                  />
                </DetailRow>
              </div>

              {showTopUp ? (
                <p className="text-center text-sm text-muted-foreground">
                  {isDeposit
                    ? "Keep a little USDT in your wallet to cover network fees."
                    : "You need some USDT in your wallet to cover network fees."}{" "}
                  <MinipayTopUpLink /> in MiniPay to continue.
                </p>
              ) : null}

              <Button
                size="lg"
                className={cn(
                  "h-12 w-full rounded-full text-base font-semibold",
                  canSubmit || !isConnected
                    ? "bg-linear-to-r from-kivon-400 to-kivon-600 text-white hover:from-kivon-500 hover:to-kivon-700"
                    : ""
                )}
                disabled={isConnected && !canSubmit}
                onClick={handleFormAction}
              >
                {actionLabel}
              </Button>
            </>
          ) : null}

          {step === "review" ? (
            <EarnReview
              mode={mode}
              amount={confirmedAmount}
              vault={vault}
              onBack={() => setStep("form")}
              onConfirm={handleConfirm}
              isConfirming={isExecuting}
            />
          ) : null}

          {step === "processing" ? (
            <EarnProcessing
              steps={steps}
              error={executeError}
              onRetry={handleRetry}
              onBack={handleBackToForm}
            />
          ) : null}

          {step === "success" ? (
            <EarnSuccess
              mode={mode}
              amount={confirmedAmount}
              vault={vault}
              onViewPosition={handleViewPosition}
            />
          ) : null}
        </div>
      </DrawerContent>
    </Drawer>
  )
}
