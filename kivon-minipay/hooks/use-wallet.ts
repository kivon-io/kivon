"use client"

import { useCallback } from "react"
import {
  useConnect,
  useConnection,
  useConnectors,
  useDisconnect,
} from "wagmi"

/**
 * Thin wrapper over wagmi connection state for the MiniPay flow. Inside MiniPay
 * the injected connector auto-connects (see `useAutoConnect`); `connect` is
 * exposed mainly for manual retries in the MiniPay webview.
 */
export function useWallet() {
  const { address, chainId, isConnected, isConnecting, status } = useConnection()
  const connectors = useConnectors()
  const { mutateAsync: connectAsync, isPending: isConnectPending } = useConnect()
  const { disconnect } = useDisconnect()

  const connect = useCallback(async () => {
    const connector = connectors[0]
    if (isConnected || !connector) return
    await connectAsync({ connector })
  }, [connectAsync, connectors, isConnected])

  return {
    address,
    chainId,
    isConnected,
    isConnecting: isConnecting || isConnectPending,
    status,
    connect,
    disconnect,
  }
}
