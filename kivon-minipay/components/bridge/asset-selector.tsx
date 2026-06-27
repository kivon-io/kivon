"use client"

import { NetworkList } from "@/components/bridge/network-list"
import { SelectionDrawerShell } from "@/components/bridge/selection-drawer-shell"
import { SelectionTrigger } from "@/components/bridge/selection-trigger"
import { TokenList } from "@/components/bridge/token-list"
import { useBridge } from "@/context/bridge-context"
import { useChains } from "@/hooks/use-chains"
import { useTokens } from "@/hooks/use-tokens"
import {
  createBridgeAsset,
  filterMinipayOriginTokens,
  getDestinationChains,
  sortChainsByPopularity,
} from "@/lib/bridge/constants"
import type { SelectionDrawerStep } from "@/lib/bridge/types"
import { CELO_CHAIN_ID } from "@/lib/network/config"
import { useMemo, useState } from "react"

type AssetSelectorProps = {
  mode: "origin" | "destination"
  placeholder?: string
}

export function AssetSelector({ mode, placeholder }: AssetSelectorProps) {
  const { origin, destination, setOrigin, setDestination } = useBridge()
  const value = mode === "origin" ? origin : destination
  const onChange = mode === "origin" ? setOrigin : setDestination
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<SelectionDrawerStep>(
    mode === "origin" ? "token" : "network"
  )
  const [activeChain, setActiveChain] = useState<Chain | null>(null)
  const [networkSearch, setNetworkSearch] = useState("")
  const [tokenSearch, setTokenSearch] = useState("")

  const { data: chains = [], isLoading: chainsLoading } = useChains()

  const celoChain = useMemo(
    () => chains.find((chain) => chain.id === CELO_CHAIN_ID) ?? null,
    [chains]
  )

  const destinationChains = useMemo(
    () => sortChainsByPopularity(getDestinationChains(chains)),
    [chains]
  )

  const filteredNetworks = useMemo(() => {
    const query = networkSearch.trim().toLowerCase()
    if (!query) return destinationChains
    return destinationChains.filter(
      (chain) =>
        chain.displayName.toLowerCase().includes(query) ||
        chain.name.toLowerCase().includes(query)
    )
  }, [destinationChains, networkSearch])

  const tokenChain = mode === "origin" ? celoChain : activeChain

  const { data: tokens = [], isLoading: tokensLoading } = useTokens(
    {
      chainId: tokenChain?.id,
      term: tokenSearch.trim() || undefined,
      defaultList: !tokenSearch.trim(),
    },
    { enabled: open && Boolean(tokenChain?.id) }
  )

  const visibleTokens = useMemo(() => {
    if (mode !== "origin") return tokens
    return filterMinipayOriginTokens(tokens)
  }, [mode, tokens])

  const triggerLabel =
    mode === "origin"
      ? "Celo"
      : (value?.chainDisplayName ?? placeholder ?? "Select network")

  const openDrawer = () => {
    if (mode === "origin") {
      setStep("token")
      setActiveChain(celoChain)
    } else {
      setStep("network")
      setActiveChain(
        value
          ? (chains.find((chain) => chain.id === value.chainId) ?? null)
          : null
      )
    }
    setNetworkSearch("")
    setTokenSearch("")
    setOpen(true)
  }

  const handleNetworkSelect = (chain: Chain) => {
    setActiveChain(chain)
    setTokenSearch("")
    setStep("token")
  }

  const handleTokenSelect = (token: Token, chain: Chain) => {
    onChange(createBridgeAsset(token, chain))
    setOpen(false)
  }

  const handleBack = () => {
    if (mode === "origin") {
      setOpen(false)
      return
    }
    setStep("network")
    setTokenSearch("")
  }

  const drawerTitle =
    step === "network"
      ? "Choose a network"
      : mode === "origin"
        ? "Choose a token"
        : "Bridge to"

  return (
    <>
      <SelectionTrigger
        label={triggerLabel}
        tokenSymbol={value?.tokenSymbol}
        tokenImage={value?.tokenImage}
        chainImage={value?.chainImage ?? celoChain?.iconUrl}
        chainName={value?.chainDisplayName ?? celoChain?.displayName}
        placeholder={
          placeholder ?? (mode === "origin" ? "Celo" : "Select network")
        }
        onClick={openDrawer}
      />

      <SelectionDrawerShell
        open={open}
        onOpenChange={setOpen}
        title={drawerTitle}
        description={drawerTitle}
        showSearch
        searchValue={step === "network" ? networkSearch : tokenSearch}
        onSearchChange={step === "network" ? setNetworkSearch : setTokenSearch}
        searchPlaceholder={
          step === "network" ? "Search networks" : "Search tokens"
        }
        onBack={
          mode === "destination" && step === "token" ? handleBack : undefined
        }
      >
        {step === "network" ? (
          <NetworkList
            chains={filteredNetworks}
            selectedChainId={activeChain?.id ?? value?.chainId}
            isLoading={chainsLoading}
            onSelect={handleNetworkSelect}
          />
        ) : tokenChain ? (
          <TokenList
            tokens={visibleTokens}
            chain={tokenChain}
            selectedTokenAddress={value?.tokenAddress}
            isLoading={tokensLoading || (mode === "origin" && !celoChain)}
            onSelect={handleTokenSelect}
            heading={mode === "origin" ? "Celo tokens" : "Popular assets"}
          />
        ) : (
          <p className="py-8 text-center text-sm text-muted-foreground">
            Network unavailable
          </p>
        )}
      </SelectionDrawerShell>
    </>
  )
}
