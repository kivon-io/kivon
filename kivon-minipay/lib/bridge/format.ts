/** Format a numeric string/number for display with sensible decimal places. */
export function formatAmount(value: string | number, maxDecimals = 6) {
  const num = typeof value === "string" ? Number(value) : value
  if (!Number.isFinite(num)) return "0"
  return num.toLocaleString(undefined, {
    maximumFractionDigits: num < 1 ? maxDecimals : 2,
  })
}

export function formatUsd(value: string | number) {
  const num = typeof value === "string" ? Number(value) : value
  if (!Number.isFinite(num)) return "$0.00"
  return num.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: num < 1 ? 4 : 2,
  })
}

export function truncateAddress(address: string, start = 6, end = 4) {
  if (address.length <= start + end) return address
  return `${address.slice(0, start)}...${address.slice(-end)}`
}

/** Count wallet prompts (tx + signature steps) from a Relay quote. */
export function countWalletPrompts(quote: Quote) {
  return quote.steps.filter(
    (step) => step.kind === "transaction" || step.kind === "signature"
  ).length
}
