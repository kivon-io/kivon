/** Format a percentage for display (e.g. 5.07 → "5.07%"). */
export function formatPercent(value: number, decimals = 2) {
  if (!Number.isFinite(value)) return "0.00%"
  return `${value.toFixed(decimals)}%`
}

/** Compact USD for vault stats (e.g. 366153 → "$366.15K"). */
export function formatCompactUsd(value: number) {
  if (!Number.isFinite(value)) return "$0"
  const abs = Math.abs(value)
  if (abs >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(2)}M`
  }
  if (abs >= 1_000) {
    return `$${(value / 1_000).toFixed(2)}K`
  }
  return value.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: abs < 1 ? 4 : 2,
  })
}

/** Compact token amount with symbol (e.g. 336353 USDT → "336.35K USDT"). */
export function formatCompactAmount(value: number, symbol: string) {
  if (!Number.isFinite(value)) return `0 ${symbol}`
  const abs = Math.abs(value)
  if (abs >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(2)}M ${symbol}`
  }
  if (abs >= 1_000) {
    return `${(value / 1_000).toFixed(2)}K ${symbol}`
  }
  if (abs >= 1) {
    return `${value.toFixed(2)} ${symbol}`
  }
  return `${value.toFixed(4)} ${symbol}`
}

/** Human-readable timelock duration from seconds. */
export function formatTimelock(seconds: number) {
  if (seconds <= 0) return "None"
  const days = Math.round(seconds / 86_400)
  if (days >= 1) return `${days} day${days === 1 ? "" : "s"}`
  const hours = Math.round(seconds / 3_600)
  if (hours >= 1) return `${hours} hour${hours === 1 ? "" : "s"}`
  return `${seconds}s`
}

/** Signed percent change for fee line (always negative display). */
export function formatSignedPercent(value: number, decimals = 2) {
  const formatted = Math.abs(value).toFixed(decimals)
  return value >= 0 ? `+${formatted}%` : `-${formatted}%`
}

/** Earnings projection with sign prefix. */
export function formatEarnings(value: number, symbol: string) {
  const prefix = value >= 0 ? "+" : ""
  return `${prefix}${value.toFixed(2)} ${symbol}`
}
