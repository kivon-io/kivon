/**
 * Convert a decimal string amount into its smallest-unit integer string.
 * Equivalent to viem's `parseUnits` for non-negative values — the fractional
 * part is truncated to `decimals` places. Kept dependency-free for the API
 * layer; the execution hooks can switch to viem later if needed.
 */
export function parseUnits(value: string, decimals: number): string {
  const negative = value.startsWith("-")
  const unsigned = negative ? value.slice(1) : value

  let [whole = "0", fraction = ""] = unsigned.split(".")
  whole = whole || "0"

  // Truncate (not round) the fraction to `decimals` places, then pad.
  fraction = fraction.slice(0, decimals).padEnd(decimals, "0")

  const result = BigInt(`${whole}${fraction}`)
  return (negative ? -result : result).toString()
}
