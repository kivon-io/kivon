"use client"

import { useBridge } from "@/context/bridge-context"
import { useWallet } from "@/hooks/use-wallet"

/** Resolved destination recipient — custom override or connected wallet. */
export function useEffectiveRecipient() {
  const { recipient } = useBridge()
  const { address } = useWallet()
  return recipient ?? address ?? ""
}
