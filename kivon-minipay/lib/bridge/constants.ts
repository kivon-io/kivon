import {
  CELO_CHAIN_ID,
  DEFAULT_DESTINATION,
  DEFAULT_ORIGIN,
} from "@/lib/network/config"
import { VM_TYPES } from "@/lib/relay/constants"
import type { BridgeAsset } from "./types"

/** Destination networks surfaced at the top of the picker. */
export const POPULAR_DESTINATION_CHAINS = [
  "ethereum",
  "base",
  "polygon",
  "arbitrum",
  "optimism",
] as const

/** Origin tokens commonly held in MiniPay on Celo. */
export const MINIPAY_ORIGIN_SYMBOLS = ["CELO", "CUSD", "USDC", "USDT"] as const

export { DEFAULT_DESTINATION, DEFAULT_ORIGIN }

export function createBridgeAsset(token: Token, chain: Chain): BridgeAsset {
  return {
    chainId: chain.id,
    chainName: chain.name,
    chainDisplayName: chain.displayName,
    chainImage: chain.iconUrl || chain.logoUrl,
    tokenName: token.name,
    tokenSymbol: token.symbol,
    tokenImage: token.metadata.logoURI,
    tokenAddress: token.address,
    tokenDecimals: token.decimals,
    tokenIsNative:
      token.metadata.isNative ||
      token.address.toLowerCase() === "0x0000000000000000000000000000000000000000",
    vmType: chain.vmType,
  }
}

export function isMinipayOriginToken(token: Token) {
  const symbol = token.symbol.toUpperCase()
  return MINIPAY_ORIGIN_SYMBOLS.some((s) => s.toUpperCase() === symbol)
}

function pickPreferredMinipayToken(a: Token, b: Token, symbol: string) {
  const canonical = DEFAULT_ORIGIN.tokenSymbol.toUpperCase() === symbol
    ? DEFAULT_ORIGIN.tokenAddress.toLowerCase()
    : undefined

  if (canonical) {
    if (a.address.toLowerCase() === canonical) return a
    if (b.address.toLowerCase() === canonical) return b
  }

  if (symbol === "CELO") {
    if (a.metadata.isNative !== b.metadata.isNative) {
      return a.metadata.isNative ? a : b
    }
  }

  if (a.metadata.verified !== b.metadata.verified) {
    return a.metadata.verified ? a : b
  }

  return a
}

/** One entry per MiniPay origin symbol — Relay can return duplicate contracts. */
export function filterMinipayOriginTokens(tokens: Token[]) {
  const bySymbol = new Map<string, Token>()

  for (const token of tokens) {
    if (!isMinipayOriginToken(token)) continue

    const symbol = token.symbol.toUpperCase()
    const existing = bySymbol.get(symbol)
    bySymbol.set(
      symbol,
      existing ? pickPreferredMinipayToken(existing, token, symbol) : token
    )
  }

  return MINIPAY_ORIGIN_SYMBOLS.flatMap((symbol) => {
    const token = bySymbol.get(symbol.toUpperCase())
    return token ? [token] : []
  })
}

/** Chains users can bridge to from MiniPay (EVM outbound, not Celo). */
export function getDestinationChains(chains: Chain[]) {
  return chains.filter(
    (chain) =>
      !chain.disabled &&
      chain.depositEnabled &&
      chain.vmType === VM_TYPES.EVM &&
      chain.id !== CELO_CHAIN_ID
  )
}

export function sortChainsByPopularity(chains: Chain[]) {
  const popular = new Set(POPULAR_DESTINATION_CHAINS)
  return [...chains].sort((a, b) => {
    const aPopular = popular.has(a.name.toLowerCase() as (typeof POPULAR_DESTINATION_CHAINS)[number])
    const bPopular = popular.has(b.name.toLowerCase() as (typeof POPULAR_DESTINATION_CHAINS)[number])
    if (aPopular && !bPopular) return -1
    if (!aPopular && bPopular) return 1
    return a.displayName.localeCompare(b.displayName)
  })
}
