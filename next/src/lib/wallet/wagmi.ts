import { connectorsForWallets } from "@rainbow-me/rainbowkit"
import "@rainbow-me/rainbowkit/styles.css"
import {
  berasigWallet,
  bestWallet,
  binanceWallet,
  bitgetWallet,
  bitverseWallet,
  bloomWallet,
  braveWallet,
  bybitWallet,
  coinbaseWallet,
  injectedWallet,
  ledgerWallet,
  metaMaskWallet,
  phantomWallet,
  rainbowWallet,
  safeWallet,
  trustWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets"
import { createConfig } from "wagmi"
import { arbitrum, base, mainnet, optimism, polygon, sepolia } from "wagmi/chains"

import { createClient, http } from "viem"
import { APP_NAME } from "../shared/constants"

const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [metaMaskWallet, trustWallet, walletConnectWallet, injectedWallet, phantomWallet],
    },
    {
      groupName: "Others",
      wallets: [
        rainbowWallet,
        safeWallet,
        coinbaseWallet,
        ledgerWallet,
        bitgetWallet,
        binanceWallet,
        bestWallet,
        berasigWallet,
        bitverseWallet,
        bloomWallet,
        braveWallet,
        bybitWallet,
      ],
    },
  ],
  {
    appName: APP_NAME!,
    projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!,
  }
)

export const config = createConfig({
  connectors,
  chains: [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [sepolia] : []),
  ],
  client({ chain }) {
    return createClient({ chain, transport: http() })
  },
})
