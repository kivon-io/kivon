"use client"

import { useAutoConnect } from "@/hooks/use-auto-connect"

/** Mount once inside the wagmi + query provider tree to auto-connect MiniPay. */
export function AutoConnect() {
  useAutoConnect()
  return null
}
