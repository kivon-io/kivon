import { connectorsForWallets } from "@rainbow-me/rainbowkit"
import "@rainbow-me/rainbowkit/styles.css"
import {
  argentWallet,
  coinbaseWallet,
  metaMaskWallet,
  phantomWallet,
  rainbowWallet,
  trustWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets"
import { createConfig as createWagmiConfig } from "@wagmi/core"
import { createConfig } from "wagmi"

import { createClient, http } from "viem"
import { APP_NAME } from "../shared/constants"
import { CHAINS, transports } from "./chains"

const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [metaMaskWallet, phantomWallet, coinbaseWallet, trustWallet],
    },
    {
      groupName: "Others",
      wallets: [phantomWallet, walletConnectWallet, argentWallet, rainbowWallet],
    },
  ],
  {
    appName: APP_NAME!,
    projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!,
  }
)

export const config = createConfig({
  connectors,
  chains: CHAINS,

  client({ chain }) {
    return createClient({ chain, transport: http() })
  },
})

export const wagmiConfig = createWagmiConfig({
  connectors,
  chains: CHAINS,
  // @ts-expect-error - transports is a valid property
  transports: transports,
})
