import type { ExecutionStatus } from "@/hooks/use-execute-steps"

export type ExecStepState = "done" | "active" | "upcoming" | "failed"

export type ExecStepView = {
  key: string
  title: string
  subtitle: string
  state: ExecStepState
  /** Wallet steps show a badge; the settlement row shows a spinner instead. */
  badge?: { label: string; tone: "done" | "active" | "failed" }
}

const EXPLORERS: Record<number, string> = {
  1: "https://etherscan.io",
  10: "https://optimistic.etherscan.io",
  56: "https://bscscan.com",
  137: "https://polygonscan.com",
  8453: "https://basescan.org",
  42161: "https://arbiscan.io",
  42220: "https://celoscan.io",
  11142220: "https://celo-sepolia.blockscout.com",
  84532: "https://sepolia.basescan.org",
}

export function explorerTxUrl(chainId?: number, hash?: string) {
  if (!chainId || !hash) return undefined
  const base = EXPLORERS[chainId]
  return base ? `${base}/tx/${hash}` : undefined
}

function humanizeStep(step: Step, state: ExecStepState, originSymbol: string) {
  const id = step.id?.toLowerCase()
  if (id === "approve") {
    return {
      title: `Approve ${originSymbol}`,
      subtitle:
        state === "done"
          ? "Approval signed in your wallet"
          : state === "failed"
            ? "Approval failed"
            : state === "active"
              ? "Confirm the approval in your wallet"
              : "Approve token spending",
    }
  }
  if (id === "deposit" || id === "swap" || id === "send") {
    return {
      title: "Depositing to relayer",
      subtitle:
        state === "done"
          ? "Deposit confirmed"
          : state === "failed"
            ? "Deposit failed"
            : state === "active"
              ? "Confirm the deposit in your wallet"
              : "Send funds to the relayer",
    }
  }
  return { title: step.action || "Processing", subtitle: step.description || "" }
}

function walletStepState(
  itemStatus: string | undefined,
  index: number,
  currentStepIndex: number,
  executing: boolean
): ExecStepState {
  if (itemStatus === "complete") return "done"
  if (itemStatus === "failed") return "failed"
  if (itemStatus === "pending") return "active"
  if (executing && index === currentStepIndex) return "active"
  return "upcoming"
}

/** Build the visual stepper: each Relay wallet step + a synthetic settlement row. */
export function buildExecSteps(args: {
  steps: Step[]
  currentStepIndex: number
  status: ExecutionStatus
  isPolling: boolean
  originSymbol: string
  destChainName: string
  destSymbol: string
}): ExecStepView[] {
  const { steps, currentStepIndex, status, isPolling, originSymbol, destChainName, destSymbol } =
    args
  const executing = status === "executing" || status === "fetching"

  const walletSteps: ExecStepView[] = steps.map((step, i) => {
    const state = walletStepState(step.items?.[0]?.status, i, currentStepIndex, executing)
    const { title, subtitle } = humanizeStep(step, state, originSymbol)
    const badge =
      state === "done"
        ? ({ label: "DONE", tone: "done" } as const)
        : state === "active"
          ? ({ label: "SIGNING", tone: "active" } as const)
          : state === "failed"
            ? ({ label: "FAILED", tone: "failed" } as const)
            : undefined
    return { key: step.id ?? `step-${i}`, title, subtitle, state, badge }
  })

  const allWalletDone = steps.length > 0 && steps.every((s) => s.items?.[0]?.status === "complete")
  const settlementState: ExecStepState =
    status === "success"
      ? "done"
      : status === "failed"
        ? "upcoming"
        : allWalletDone || isPolling
          ? "active"
          : "upcoming"

  const settlement: ExecStepView = {
    key: "receive",
    title: `Receive on ${destChainName}`,
    subtitle:
      settlementState === "done"
        ? `${destSymbol} arrived on ${destChainName}`
        : `${destSymbol} arrives automatically`,
    state: settlementState,
  }

  return [...walletSteps, settlement]
}
