import {
  CELO_MAINNET_CHAIN_ID,
  CELO_SEPOLIA_CHAIN_ID,
} from "@/lib/network/config"

/** Celo DevRel / CIP-64 feeCurrency addresses (Celo Mainnet). */
export const CELO_MAINNET_FEE_CURRENCY = {
  /** USDm — 18 decimals */
  USDM: "0x765DE816845861e75A25fCA122bb6898B8B1282a" as const,
  /** USDC gas adapter — 6-decimal USDC */
  USDC_ADAPTER: "0x2F25deB3848C207fc8E0c34035B3Ba7fC157602B" as const,
  /** USDT gas adapter — 6-decimal USDT */
  USDT_ADAPTER: "0x0e2a3e05bc9a16f5292a6170456a710cb89c6f72" as const,
} as const

/** Origin token address (lowercase) → feeCurrency on Celo Mainnet. */
const MAINNET_ORIGIN_TO_FEE_CURRENCY: Record<string, `0x${string}`> = {
  // USDC
  "0xceba9300f2b948710d2653dd7b07f33a8b32118c":
    CELO_MAINNET_FEE_CURRENCY.USDC_ADAPTER,
  // USDT
  "0x48065fbbe25f1cba39fdf04110d2bd22baf471f0":
    CELO_MAINNET_FEE_CURRENCY.USDT_ADAPTER,
  // USDm / cUSD (18-decimal — token address is the feeCurrency)
  "0x765de816845861e75a25fca122bb6898b8b1282a":
    CELO_MAINNET_FEE_CURRENCY.USDM,
}

/** Symbol fallback when address isn't in the map (e.g. fresh Relay listings). */
const SYMBOL_TO_FEE_CURRENCY: Record<string, `0x${string}`> = {
  USDC: CELO_MAINNET_FEE_CURRENCY.USDC_ADAPTER,
  USDT: CELO_MAINNET_FEE_CURRENCY.USDT_ADAPTER,
  USDM: CELO_MAINNET_FEE_CURRENCY.USDM,
  CUSD: CELO_MAINNET_FEE_CURRENCY.USDM,
}

export function isCeloChain(chainId: number) {
  return chainId === CELO_MAINNET_CHAIN_ID || chainId === CELO_SEPOLIA_CHAIN_ID
}

export type ResolveCeloFeeCurrencyInput = {
  chainId: number
  originTokenAddress: string
  originTokenSymbol?: string
}

/**
 * Resolve the CIP-64 `feeCurrency` for a Celo origin transaction.
 * Returns undefined on testnet or for unsupported tokens.
 */
export function resolveCeloFeeCurrency({
  chainId,
  originTokenAddress,
  originTokenSymbol,
}: ResolveCeloFeeCurrencyInput): `0x${string}` | undefined {
  if (chainId !== CELO_MAINNET_CHAIN_ID) return undefined

  const byAddress = MAINNET_ORIGIN_TO_FEE_CURRENCY[originTokenAddress.toLowerCase()]
  if (byAddress) return byAddress

  if (originTokenSymbol) {
    const bySymbol = SYMBOL_TO_FEE_CURRENCY[originTokenSymbol.toUpperCase()]
    if (bySymbol) return bySymbol
  }

  return undefined
}

export type RelayTransactionStep = {
  chainId: number
  to: string
  data: string
  value?: string | null
  gas?: string | null
  maxFeePerGas?: string | null
  maxPriorityFeePerGas?: string | null
}

export type MiniPaySendParams = {
  account: `0x${string}`
  chainId: number
  to: `0x${string}`
  data: `0x${string}`
  value: bigint
  gas?: bigint
  feeCurrency?: `0x${string}`
  maxFeePerGas?: bigint
  maxPriorityFeePerGas?: bigint
}

/**
 * Build wagmi/viem send params for Relay steps.
 * On Celo: set CIP-64 feeCurrency and omit EIP-1559 fields (MiniPay legacy txs).
 */
export function buildMiniPaySendParams(
  step: RelayTransactionStep,
  account: `0x${string}`,
  originTokenAddress: string,
  originTokenSymbol?: string
): MiniPaySendParams {
  const gas = toBigInt(step.gas)
  const value = toBigInt(step.value) ?? BigInt(0)

  const base: MiniPaySendParams = {
    account,
    chainId: step.chainId,
    to: step.to as `0x${string}`,
    data: step.data as `0x${string}`,
    value,
    ...(gas !== undefined && { gas }),
  }

  if (!isCeloChain(step.chainId)) {
    const maxFeePerGas = toBigInt(step.maxFeePerGas)
    const maxPriorityFeePerGas = toBigInt(step.maxPriorityFeePerGas)
    return {
      ...base,
      ...(maxFeePerGas !== undefined && { maxFeePerGas }),
      ...(maxPriorityFeePerGas !== undefined && { maxPriorityFeePerGas }),
    }
  }

  const feeCurrency = resolveCeloFeeCurrency({
    chainId: step.chainId,
    originTokenAddress,
    originTokenSymbol,
  })

  if (!feeCurrency) {
    throw new Error("UNSUPPORTED_FEE_CURRENCY")
  }

  return { ...base, feeCurrency }
}

function toBigInt(value?: string | null): bigint | undefined {
  if (value === undefined || value === null || value === "") return undefined
  try {
    return BigInt(value)
  } catch {
    return undefined
  }
}
