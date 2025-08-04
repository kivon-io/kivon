"use client"

import { DisclaimerComponent, RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit"
import type React from "react"
import { WagmiProvider } from "wagmi"
import { APP_URL } from "../shared/constants"
import { config } from "./wagmi"

export function WalletProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <RainbowKitProvider
        appInfo={{
          disclaimer: Disclaimer,
        }}
        modalSize='compact'
        theme={darkTheme()}
      >
        {children}
      </RainbowKitProvider>
    </WagmiProvider>
  )
}

const Disclaimer: DisclaimerComponent = ({ Text, Link }) => (
  <Text>
    By connecting your wallet, you agree to the{" "}
    <Link href={`${APP_URL}/terms-of-use`}>Terms of Service</Link> and acknowledge you have read and
    understand the protocol <Link href={`${APP_URL}/risk-disclosure-statement`}>Disclaimer</Link>
  </Text>
)
