"use client"

import { useEffect } from "react"
import { useConnect, useConnection, useConnectors } from "wagmi"

/**
 * Auto-connects the injected (MiniPay) provider once on mount. MiniPay exposes
 * `window.ethereum` and expects dapps to connect without a button.
 * @see https://docs.minipay.xyz/getting-started/setup-react.html
 */
export function useAutoConnect() {
  const connectors = useConnectors()
  const { isConnected, isConnecting } = useConnection()
  const { mutate: connect } = useConnect()

  useEffect(() => {
    if (isConnected || isConnecting) return

    const connector = connectors[0]
    if (!connector) return

    const tryConnect = () => {
      if (typeof window === "undefined" || !window.ethereum) return false
      connect({ connector })
      return true
    }

    if (tryConnect()) return

    // MiniPay may inject `window.ethereum` shortly after the first paint.
    const timer = window.setTimeout(tryConnect, 250)
    return () => window.clearTimeout(timer)
  }, [connectors, connect, isConnected, isConnecting])
}
