const FEE_ERROR_PATTERNS = [
  "too small to cover fees",
  "cover fees required",
  "amount is too small",
  "insufficient balance to cover",
  "not enough stablecoin balance to cover network fees",
  "insufficient funds",
]

/** True when the user should be sent to MiniPay add cash. */
export function shouldOfferMinipayTopUp(message?: string | null) {
  if (!message) return false
  const normalized = message.toLowerCase()
  return FEE_ERROR_PATTERNS.some((pattern) => normalized.includes(pattern))
}
