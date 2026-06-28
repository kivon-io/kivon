"use client"

import { AutoConnect } from "@/components/providers/auto-connect"
import { Web3Provider } from "@/components/providers/web3-provider"

/** Wagmi + MiniPay auto-connect — bridge routes only to keep other pages lean. */
export function BridgeProviders({ children }: { children: React.ReactNode }) {
  return (
    <Web3Provider>
      <AutoConnect />
      {children}
    </Web3Provider>
  )
}
