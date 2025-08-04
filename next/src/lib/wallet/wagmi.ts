import { connectorsForWallets } from "@rainbow-me/rainbowkit"
import "@rainbow-me/rainbowkit/styles.css"
import {
  argentWallet,
  coinbaseWallet,
  rainbowWallet,
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
      wallets: [coinbaseWallet, trustWallet],
    },
    {
      groupName: "Others",
      wallets: [walletConnectWallet, argentWallet, rainbowWallet],
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
