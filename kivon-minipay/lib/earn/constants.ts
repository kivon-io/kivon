import { CELO_CHAIN_ID } from "@/lib/network/config"

export const FEATHER_USDT_VAULT =
  "0xb2cDf6403da1ef1Bb911D87D0DD155a699869BC2" as const
export const MORPHO_SINGLETON =
  "0xd24ECdD8C1e0E57a4E26B1a7bbeAa3e95466A569" as const
export const ADAPTIVE_CURVE_IRM =
  "0x683CAAADdfA2F42e24880E202676526d501a5dED" as const
export const USDT_ADDRESS =
  "0x48065fbBE25f71C9282ddf5e1cD6D6A887483D5e" as const

export const USDT_DECIMALS = 6
export const VAULT_SHARE_DECIMALS = 18

export const SECONDS_PER_YEAR = 31_536_000
export const WAD = BigInt(10) ** BigInt(18)

/** Default amount for projected earnings preview on the vault page. */
export const EARN_PREVIEW_AMOUNT_USDT = 500

export const EARN_INFO = {
  name: "Feather USDT",
  curator: "Feather",
  curatorImage: "/images/feather-image.svg",
  poweredBy: "Morpho",
  poweredByImage: "/images/morpho-image.png",
  vaultAddress: FEATHER_USDT_VAULT,
  assetSymbol: "USDT",
  assetImage:
    "https://coin-images.coingecko.com/coins/images/325/large/Tether.png?1696501661",
  chainId: CELO_CHAIN_ID,
  chainName: "Celo",
  chainImage: "https://assets.relay.link/icons/42220/light.png",
  vaultVersion: "v1.0",
} as const

export const MERKL_API = "https://api.merkl.xyz/v4"

/** Merkl Distributor — same address across most EVM chains, incl. Celo. */
export const MERKL_DISTRIBUTOR =
  "0x3Ef3D8bA38EBe18DB133cEc108f4D14CE00Dd9Ae" as const

export const MARKET_INFO_IMAGES = {
  USDT: "https://d1e92zism97rps.cloudfront.net/USDT.svg",
  ETH: "https://d1e92zism97rps.cloudfront.net/ETH.svg",
  XAUT: "https://d1e92zism97rps.cloudfront.net/XAUT.svg",
  BTC: "https://d1e92zism97rps.cloudfront.net/BTC.svg",
  EURM: "https://d1e92zism97rps.cloudfront.net/EURm.svg",
} as const

export type MarketInfoImageKey = keyof typeof MARKET_INFO_IMAGES
