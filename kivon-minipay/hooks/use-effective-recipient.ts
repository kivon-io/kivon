"use client"

import { useBridge } from "@/context/bridge-context"

/** Explicit destination recipient set by the user. No wallet fallback. */
export function useEffectiveRecipient() {
  const { recipient } = useBridge()
  return recipient ?? ""
}
