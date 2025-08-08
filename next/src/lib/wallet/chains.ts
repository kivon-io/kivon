import { fallback, http } from "viem"
import {
  abstract,
  ancient8,
  apeChain,
  arbitrum,
  arbitrumNova,
  arenaz,
  avalanche,
  b3,
  base,
  berachain,
  blast,
  bob,
  boba,
  bsc,
  celo,
  cronos,
  cyber,
  degen,
  flowMainnet,
  forma,
  funkiMainnet,
  gnosis,
  gravity,
  gunz,
  hemi,
  hychain,
  ink,
  linea,
  lisk,
  mainnet,
  manta,
  mantle,
  metis,
  mint,
  mode,
  morph,
  optimism,
  plume,
  polygon,
  polygonMumbai,
  polygonZkEvm,
  redstone,
  ronin,
  sanko,
  scroll,
  sei,
  sepolia,
  shape,
  soneium,
  sonic,
  story,
  superposition,
  superseed,
  swellchain,
  taiko,
  tron,
  unichain,
  worldchain,
  xai,
  zeroNetwork,
  zircuit,
  zksync,
  zora,
} from "wagmi/chains"

export const CHAINS = [
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  abstract,
  ancient8,
  apeChain,
  arbitrumNova,
  arenaz,
  avalanche,
  b3,
  berachain,
  blast,
  bob,
  boba,
  bsc,
  celo,
  cronos,
  cyber,
  degen,
  flowMainnet,
  forma,
  funkiMainnet,
  gnosis,
  gravity,
  gunz,
  hemi,
  hychain,
  ink,
  linea,
  lisk,
  manta,
  mantle,
  metis,
  mint,
  mode,
  morph,
  plume,
  polygonMumbai,
  polygonZkEvm,
  redstone,
  ronin,
  sanko,
  scroll,
  sei,
  shape,
  soneium,
  sonic,
  story,
  superposition,
  superseed,
  swellchain,
  taiko,
  tron,
  unichain,
  worldchain,
  xai,
  zeroNetwork,
  zircuit,
  zksync,
  zora,
  ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [sepolia] : []),
] as const

const ALCHEMY = process.env.NEXT_PUBLIC_ALCHEMY_ID
const INFURA = process.env.NEXT_PUBLIC_INFURA_ID

/* eslint-disable @typescript-eslint/no-explicit-any */

const rpcFor = (chainId: number) => {
  switch (chainId) {
    case mainnet.id:
      return fallback(
        [
          ALCHEMY ? http(`https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY}`) : undefined,
          INFURA ? http(`https://mainnet.infura.io/v3/${INFURA}`) : undefined,
          http(), // public as last resort
        ].filter(Boolean) as any
      )

    case arbitrum.id:
      return fallback(
        [
          ALCHEMY ? http(`https://arb-mainnet.g.alchemy.com/v2/${ALCHEMY}`) : undefined,
          INFURA ? http(`https://arbitrum-mainnet.infura.io/v3/${INFURA}`) : undefined,
          http(),
        ].filter(Boolean) as any
      )

    case base.id:
      return fallback(
        [
          ALCHEMY ? http(`https://base-mainnet.g.alchemy.com/v2/${ALCHEMY}`) : undefined,
          INFURA ? http(`https://base-mainnet.infura.io/v3/${INFURA}`) : undefined,
          http(),
        ].filter(Boolean) as any
      )

    case polygon.id:
      return fallback(
        [
          ALCHEMY ? http(`https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY}`) : undefined,
          INFURA ? http(`https://polygon-mainnet.infura.io/v3/${INFURA}`) : undefined,
          http(),
        ].filter(Boolean) as any
      )

    default:
      return http() // generic/public
  }
}

export const transports = Object.fromEntries(CHAINS.map((c) => [c.id, rpcFor(c.id)]))
