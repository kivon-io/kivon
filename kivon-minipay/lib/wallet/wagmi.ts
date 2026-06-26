import { createConfig, fallback, http } from "wagmi"
import { celo, celoSepolia } from "wagmi/chains"
import { injected } from "wagmi/connectors"

// RPC provider keys. Exposed to the client because wagmi transports run in the
// browser (MiniPay webview). `NEXT_PUBLIC_ALCHEMY_ID` is the project's existing
// var name; `NEXT_PUBLIC_ALCHEMY_API_KEY` is accepted as an alias.
const alchemyKey =
  process.env.NEXT_PUBLIC_ALCHEMY_ID ?? process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
const infuraKey = process.env.NEXT_PUBLIC_INFURA_API_KEY

/**
 * Build a transport that tries each configured provider in order and falls back
 * to the next on failure: Alchemy → Infura → the chain's public RPC.
 */
function rpcFallback(...urls: (string | undefined)[]) {
  const transports = urls
    .filter((url): url is string => Boolean(url))
    .map((url) => http(url))
  // Always keep the chain's default public RPC as the final fallback.
  return fallback([...transports, http()])
}

const transports = {
  [celo.id]: rpcFallback(
    alchemyKey ? `https://celo-mainnet.g.alchemy.com/v2/${alchemyKey}` : undefined,
    infuraKey ? `https://celo-mainnet.infura.io/v3/${infuraKey}` : undefined
  ),
  [celoSepolia.id]: rpcFallback(
    alchemyKey ? `https://celo-sepolia.g.alchemy.com/v2/${alchemyKey}` : undefined,
    infuraKey ? `https://celo-sepolia.infura.io/v3/${infuraKey}` : undefined
  ),
}

/** Shared injected connector — must be the same instance passed to `connect()`. */
export const minipayConnector = injected()

/**
 * MiniPay-only wagmi config: the injected connector binds to the provider
 * MiniPay puts on `window.ethereum`, and we only declare the Celo chains the
 * wallet operates on. Cross-chain delivery is Relay's job, not the wallet's.
 */
export const wagmiConfig = createConfig({
  chains: [celo, celoSepolia],
  connectors: [minipayConnector],
  transports,
})

declare module "wagmi" {
  interface Register {
    config: typeof wagmiConfig
  }
}
