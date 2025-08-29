"use client"

import { useDynamicContext, useDynamicEvents } from "@dynamic-labs/sdk-react-core"
import { useEffect, useMemo, useState } from "react"
import { Chain } from "viem"
import { useAccount } from "wagmi"

type UseDynamicWalletResult = {
  address?: `0x${string}`
  connectorName?: string
  connectorIcon?: string
  connectedChain?: string
  isConnected?: boolean
  chainId?: number
  chain?: Chain
}

export function useDynamicWallet(): UseDynamicWalletResult {
  const { primaryWallet } = useDynamicContext()
  const primaryWalletNetworkChanged = useDynamicEvents(
    "primaryWalletNetworkChanged",
    async () => {}
  )

  const {
    address: wagmiAddress,
    chain,
    connector: wagmiConnector,
    isConnected: isWagmiConnected,
    chainId: wagmiChainId,
  } = useAccount()

  console.log("wagmi:", {
    wagmiAddress,
    wagmiChain: chain,
    wagmiConnector,
    isWagmiConnected,
    wagmiChainId,
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  console.log("primaryWallet: ", (primaryWallet as any)?._connector)

  const [iconUrl, setIconUrl] = useState<string | undefined>(undefined)

  useEffect(() => {
    let cancelled = false

    const resolveIcon = async () => {
      try {
        // 1) Prefer wagmi connector icon (string)
        const anyConnector = wagmiConnector as unknown as { icon?: unknown }
        if (typeof anyConnector?.icon === "string" && anyConnector.icon) {
          if (!cancelled) setIconUrl(anyConnector.icon)
          return
        }

        // 2) RainbowKit connectors often expose an async iconUrl()
        const rkIconGetter = (
          wagmiConnector as unknown as { rkDetails?: { iconUrl?: () => Promise<string> } }
        )?.rkDetails?.iconUrl
        if (typeof rkIconGetter === "function") {
          const url = await rkIconGetter()
          if (url && !cancelled) {
            setIconUrl(url)
            return
          }
        }

        // 3) Fallback to Dynamic connector metadata icon
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const dynamicIcon: string | undefined = (primaryWallet as any)?.connector?.metadata?.icon
        if (dynamicIcon && !cancelled) {
          setIconUrl(dynamicIcon)
          return
        }
      } catch {
        // ignore and leave icon undefined
      }
    }

    resolveIcon()
    return () => {
      cancelled = true
    }
  }, [primaryWallet, wagmiConnector])

  // Mobile can report undefined wagmi chain; fall back to Dynamic's internal connector

  const address = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dynamicAddress: `0x${string}` | undefined = (primaryWallet as any)?.address
    return wagmiAddress ?? dynamicAddress
  }, [primaryWallet, wagmiAddress])

  const connectorName = useMemo(() => {
    // Prefer wagmi connector name if available
    const nameFromWagmi = wagmiConnector?.name
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const nameFromDynamic: string | undefined = (primaryWallet as any)?._connector?.name
    return nameFromWagmi ?? nameFromDynamic
  }, [primaryWallet, wagmiConnector])

  const connectedChain = useMemo(() => {
    const nameFromWagmi = chain?.name
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const nameFromDynamic: string | undefined = (primaryWallet as any)?._connector?.activeChain
      ?.name
    return nameFromWagmi ?? nameFromDynamic

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chain?.name, primaryWallet, primaryWalletNetworkChanged])

  const isConnected = useMemo(() => {
    return isWagmiConnected || Boolean(primaryWallet)
  }, [primaryWallet, isWagmiConnected])

  const chainId = useMemo(() => {
    // Normalize to number, handling bigint or string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const idFromDynamic: unknown = (primaryWallet as any)?._connector?.activeChain?.id
    const normalize = (val: unknown): number | undefined => {
      if (typeof val === "number") return val
      if (typeof val === "bigint") return Number(val)
      if (typeof val === "string") {
        const n = Number(val)
        return Number.isFinite(n) ? n : undefined
      }
      return undefined
    }
    return normalize(wagmiChainId) ?? normalize(idFromDynamic)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [primaryWallet, wagmiChainId, primaryWalletNetworkChanged])

  const chainObj = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return chain ?? (primaryWallet as any)?._connector?.activeChain
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chain, primaryWallet, primaryWalletNetworkChanged])

  return {
    address,
    connectorIcon: iconUrl,
    connectorName,
    connectedChain,
    isConnected,
    chainId,
    chain: chainObj,
  }
}
