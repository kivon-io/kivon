import { formatUsd } from "@/lib/bridge/format"
import { MINIPAY_ORIGIN_SYMBOLS } from "@/lib/bridge/constants"

const STABLECOIN_SYMBOLS = new Set(
  MINIPAY_ORIGIN_SYMBOLS.filter((symbol) => symbol !== "CELO").map((s) =>
    s.toUpperCase()
  )
)

export function isStablecoinSymbol(symbol: string) {
  return STABLECOIN_SYMBOLS.has(symbol.toUpperCase())
}

/** Display wallet balance as USD (stables ≈ $1; CELO uses live price when known). */
export function formatTokenBalanceUsd(
  symbol: string,
  balance: number,
  celoUsdPrice?: number | null
): string {
  if (!Number.isFinite(balance) || balance <= 0) return formatUsd(0)

  if (isStablecoinSymbol(symbol)) {
    return formatUsd(balance)
  }

  if (symbol.toUpperCase() === "CELO" && celoUsdPrice && celoUsdPrice > 0) {
    return formatUsd(balance * celoUsdPrice)
  }

  return formatUsd(0)
}
