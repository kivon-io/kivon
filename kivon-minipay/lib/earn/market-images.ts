import {
  MARKET_INFO_IMAGES,
  type MarketInfoImageKey,
} from "@/lib/earn/constants"

const SYMBOL_TO_MARKET_KEY: Record<string, MarketInfoImageKey> = {
  USDT: "USDT",
  WETH: "ETH",
  ETH: "ETH",
  XAUT: "XAUT",
  XAUT0: "XAUT",
  WBTC: "BTC",
  BTC: "BTC",
  EURM: "EURM",
}

/** Resolve a collateral or loan token symbol to a market exposure icon URL. */
export function getMarketAssetImage(
  symbol: string | null | undefined
): string | undefined {
  if (!symbol) return undefined

  const normalized = symbol.replace(/[^a-zA-Z0-9]/g, "").toUpperCase()
  const key = SYMBOL_TO_MARKET_KEY[normalized]
  return key ? MARKET_INFO_IMAGES[key] : undefined
}

export const USDT_MARKET_IMAGE = MARKET_INFO_IMAGES.USDT
