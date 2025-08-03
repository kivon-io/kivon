import { getDefaultConfig } from "@rainbow-me/rainbowkit"
import "@rainbow-me/rainbowkit/styles.css"
import { http } from "wagmi"
import { arbitrum, base, mainnet, optimism, polygon, sepolia } from "wagmi/chains"

import { APP_NAME } from "../shared/constants"

export const config = getDefaultConfig({
  appName: APP_NAME!,
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!,
  chains: [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [sepolia] : []),
  ],
  transports: [http()],
  // ssr: true,
})
