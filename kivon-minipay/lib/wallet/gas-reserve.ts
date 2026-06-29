import { isStablecoinSymbol } from "@/lib/wallet/token-balance-usd"

/** Fallback stablecoin buffer for Celo CIP-64 gas (approve + deposit). */
export const DEFAULT_STABLE_GAS_RESERVE = 0.05

type ComputeMaxBridgeAmountInput = {
  balance: number
  tokenSymbol: string
  /** USD price of one origin token — used for CELO gas reserve in token units. */
  tokenUsdPrice?: number | null
  quote?: Quote | null
}

/**
 * Max sendable amount after reserving funds for on-chain gas.
 * On Celo, gas is paid in the same stablecoin via feeCurrency.
 */
export function computeMaxBridgeAmount({
  balance,
  tokenSymbol,
  tokenUsdPrice,
  quote,
}: ComputeMaxBridgeAmountInput): number {
  if (!Number.isFinite(balance) || balance <= 0) return 0

  const reserve = estimateGasReserveTokenUnits(tokenSymbol, tokenUsdPrice, quote)
  const max = balance - reserve

  if (max <= 0) return 0
  return parseFloat(max.toFixed(6))
}

function estimateGasReserveTokenUnits(
  tokenSymbol: string,
  tokenUsdPrice: number | null | undefined,
  quote?: Quote | null
): number {
  let reserveUsd = DEFAULT_STABLE_GAS_RESERVE

  const gasFeeUsd = quote?.fees?.gas?.amountUsd
    ? Number(quote.fees.gas.amountUsd)
    : 0

  if (gasFeeUsd > 0) {
    // Typical bridge: ERC-20 approve + deposit; CIP-64 adds ~50k gas per tx.
    reserveUsd = Math.max(reserveUsd, gasFeeUsd * 2.5 * 1.15)
  }

  if (isStablecoinSymbol(tokenSymbol)) {
    return reserveUsd
  }

  if (tokenSymbol.toUpperCase() === "CELO" && tokenUsdPrice && tokenUsdPrice > 0) {
    return reserveUsd / tokenUsdPrice
  }

  return DEFAULT_STABLE_GAS_RESERVE
}
