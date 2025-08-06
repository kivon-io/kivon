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
import { createConfig } from "wagmi"

import { createClient, http } from "viem"
import { APP_NAME } from "../shared/constants"
import { CHAINS } from "./chains"

const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [metaMaskWallet, phantomWallet, coinbaseWallet, trustWallet],
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
  chains: CHAINS,
  client({ chain }) {
    return createClient({ chain, transport: http() })
  },
})
