import type { BridgeAsset } from "@/lib/bridge/types"
import { VM_TYPES } from "@/lib/relay/constants"

/** Toggle via `.env.local`: `NEXT_PUBLIC_USE_TESTNET=true` */
export const IS_TESTNET = process.env.NEXT_PUBLIC_USE_TESTNET === "true"

export const CELO_MAINNET_CHAIN_ID = 42220
export const CELO_SEPOLIA_CHAIN_ID = 11142220
export const BASE_MAINNET_CHAIN_ID = 8453
export const BASE_SEPOLIA_CHAIN_ID = 84532

/** Active Celo origin chain — matches MiniPay mainnet vs Developer Mode testnet. */
export const CELO_CHAIN_ID = IS_TESTNET
  ? CELO_SEPOLIA_CHAIN_ID
  : CELO_MAINNET_CHAIN_ID

const MAINNET_DEFAULT_ORIGIN: BridgeAsset = {
  chainId: CELO_MAINNET_CHAIN_ID,
  chainName: "celo",
  chainDisplayName: "Celo",
  chainImage: "https://assets.relay.link/icons/42220/light.png",
  tokenName: "USDCoin",
  tokenSymbol: "USDC",
  tokenImage:
    "https://coin-images.coingecko.com/coins/images/6319/large/usdc.png?1696506694",
  tokenAddress: "0xceba9300f2b948710d2653dd7b07f33a8b32118c",
  tokenDecimals: 6,
  tokenIsNative: false,
  vmType: VM_TYPES.EVM,
}

const MAINNET_DEFAULT_DESTINATION: BridgeAsset = {
  chainId: BASE_MAINNET_CHAIN_ID,
  chainName: "base",
  chainDisplayName: "Base",
  chainImage: "https://assets.relay.link/icons/8453/light.png",
  tokenName: "USD Coin",
  tokenSymbol: "USDC",
  tokenImage:
    "https://coin-images.coingecko.com/coins/images/6319/large/usdc.png?1696506694",
  tokenAddress: "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
  tokenDecimals: 6,
  tokenIsNative: false,
  vmType: VM_TYPES.EVM,
}

/** Celo Sepolia USDC — faucet token on MiniPay testnet. */
const TESTNET_DEFAULT_ORIGIN: BridgeAsset = {
  chainId: CELO_SEPOLIA_CHAIN_ID,
  chainName: "celo-sepolia",
  chainDisplayName: "Celo Sepolia",
  chainImage: "https://assets.relay.link/icons/42220/light.png",
  tokenName: "USDC",
  tokenSymbol: "USDC",
  tokenImage:
    "https://coin-images.coingecko.com/coins/images/6319/large/usdc.png?1696506694",
  tokenAddress: "0x01C5C0122039549AD1493B8220cABEdD739BC44E",
  tokenDecimals: 6,
  tokenIsNative: false,
  vmType: VM_TYPES.EVM,
}

/** Base Sepolia USDC on Relay testnet API. */
const TESTNET_DEFAULT_DESTINATION: BridgeAsset = {
  chainId: BASE_SEPOLIA_CHAIN_ID,
  chainName: "base-sepolia",
  chainDisplayName: "Base Sepolia",
  chainImage: "https://assets.relay.link/icons/8453/light.png",
  tokenName: "USD Coin",
  tokenSymbol: "USDC",
  tokenImage:
    "https://coin-images.coingecko.com/coins/images/6319/large/usdc.png?1696506694",
  tokenAddress: "0x036cbd53842c5426634e7929541ec2318f3dcf7e",
  tokenDecimals: 6,
  tokenIsNative: false,
  vmType: VM_TYPES.EVM,
}

export const DEFAULT_ORIGIN = IS_TESTNET
  ? TESTNET_DEFAULT_ORIGIN
  : MAINNET_DEFAULT_ORIGIN

export const DEFAULT_DESTINATION = IS_TESTNET
  ? TESTNET_DEFAULT_DESTINATION
  : MAINNET_DEFAULT_DESTINATION

export const BASE_CHAIN_ID = IS_TESTNET
  ? BASE_SEPOLIA_CHAIN_ID
  : BASE_MAINNET_CHAIN_ID

/**
 * Relay's testnet API only lists Sepolia + Base Sepolia — not Celo Sepolia.
 * Balance/wallet UI works on testnet; cross-chain quotes require mainnet.
 */
export const RELAY_BRIDGE_QUOTES_ENABLED = !IS_TESTNET

export const RELAY_TESTNET_QUOTE_MESSAGE =
  "Relay testnet doesn't support bridging from Celo Sepolia. Use mainnet to fetch quotes."
