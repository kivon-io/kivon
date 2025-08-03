"use client"

import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit"
import type React from "react"
import { WagmiProvider } from "wagmi"
import { config } from "./wagmi"

export function WalletProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <RainbowKitProvider modalSize='compact' theme={darkTheme()}>
        {children}
      </RainbowKitProvider>
    </WagmiProvider>
  )
}
