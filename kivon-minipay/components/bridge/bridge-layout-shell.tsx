"use client"

import { BridgeProvider } from "@/context/bridge-context"

export function BridgeLayoutShell({ children }: { children: React.ReactNode }) {
  return <BridgeProvider>{children}</BridgeProvider>
}
