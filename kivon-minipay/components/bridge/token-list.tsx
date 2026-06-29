"use client"

import { AssetIcon } from "@/components/bridge/asset-icon"
import { Skeleton } from "@/components/ui/skeleton"
import { useTokenBalances, type TokenBalanceEntry } from "@/hooks/use-token-balances"
import { useWallet } from "@/hooks/use-wallet"
import { cn } from "@/lib/utils"
import { useMemo } from "react"
import { CircleCheck } from "lucide-react"

type TokenListProps = {
  tokens: Token[]
  chain: Chain
  selectedTokenAddress?: string
  isLoading?: boolean
  showFeatured?: boolean
  /** Fetch and show wallet balances (origin token picker on Celo). */
  showBalances?: boolean
  celoUsdPrice?: number | null
  onSelect: (token: Token, chain: Chain) => void
  heading?: string
}

function resolveFeaturedTokens(
  featuredTokens: Token[],
  tokens: Token[]
): Token[] {
  const tokenByAddress = new Map(
    tokens.map((token) => [token.address.toLowerCase(), token])
  )

  return featuredTokens.flatMap((featured) => {
    const match = tokenByAddress.get(featured.address.toLowerCase())
    return match ? [match] : []
  })
}

function FeaturedTokenChips({
  tokens,
  chain,
  selectedTokenAddress,
  onSelect,
}: {
  tokens: Token[]
  chain: Chain
  selectedTokenAddress?: string
  onSelect: (token: Token, chain: Chain) => void
}) {
  return (
    <div className="-mx-1 mb-4 scrollbar-hide flex gap-2 overflow-x-auto px-1 pb-1">
      {tokens.map((token) => {
        const isSelected =
          selectedTokenAddress?.toLowerCase() === token.address.toLowerCase()

        return (
          <button
            key={`featured-${chain.id}-${token.address}`}
            type="button"
            onClick={() => onSelect(token, chain)}
            className={cn(
              "flex shrink-0 items-center gap-2 rounded-full border border-border bg-card px-3 py-2 transition-colors hover:bg-muted/40",
              isSelected && "border-primary bg-primary/5"
            )}
          >
            <AssetIcon
              tokenImage={token.metadata.logoURI}
              tokenSymbol={token.symbol}
              chainImage={chain.iconUrl}
              chainName={chain.displayName}
              size="sm"
            />
            <span className="text-sm font-semibold text-foreground">
              {token.symbol}
            </span>
          </button>
        )
      })}
    </div>
  )
}

function TokenRow({
  token,
  chain,
  selectedTokenAddress,
  balance,
  balanceLoading,
  onSelect,
}: {
  token: Token
  chain: Chain
  selectedTokenAddress?: string
  balance?: TokenBalanceEntry
  balanceLoading?: boolean
  onSelect: (token: Token, chain: Chain) => void
}) {
  const isSelected =
    selectedTokenAddress?.toLowerCase() === token.address.toLowerCase()

  return (
    <button
      type="button"
      onClick={() => onSelect(token, chain)}
      className="flex w-full items-center gap-3 px-4 py-4 text-left transition-colors hover:bg-muted/40"
    >
      <AssetIcon
        tokenImage={token.metadata.logoURI}
        tokenSymbol={token.symbol}
        chainImage={chain.iconUrl}
        chainName={chain.displayName}
        size="md"
      />

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate font-semibold text-foreground">{token.name}</p>
          {token.metadata.verified ? (
            <span className="inline-flex size-4 items-center justify-center rounded-full bg-kivon-600 text-[10px] text-white">
              ✓
            </span>
          ) : null}
        </div>
        <p className="text-sm text-muted-foreground">{token.symbol}</p>
      </div>

      {balanceLoading ? (
        <span className="shrink-0 text-sm text-muted-foreground">…</span>
      ) : balance ? (
        <span className="shrink-0 text-sm font-medium text-foreground tabular-nums">
          {balance.usdLabel}
        </span>
      ) : null}

      {isSelected ? (
        <CircleCheck className="size-6 shrink-0 text-emerald-500" />
      ) : null}
    </button>
  )
}

export function TokenList({
  tokens,
  chain,
  selectedTokenAddress,
  isLoading,
  showFeatured = true,
  showBalances = false,
  celoUsdPrice,
  onSelect,
  heading = "Popular assets",
}: TokenListProps) {
  const { address, chainId } = useWallet()
  const balanceChainId = chainId ?? chain.id

  const { balances, isLoading: balancesLoading } = useTokenBalances(
    tokens,
    showBalances ? balanceChainId : undefined,
    showBalances ? address : undefined,
    celoUsdPrice
  )

  const featuredTokens = useMemo(() => {
    if (!showFeatured || !chain.featuredTokens?.length) return []
    return resolveFeaturedTokens(chain.featuredTokens, tokens)
  }, [chain.featuredTokens, showFeatured, tokens])

  const listTokens = useMemo(() => {
    if (featuredTokens.length === 0) return tokens

    const featuredAddresses = new Set(
      featuredTokens.map((token) => token.address.toLowerCase())
    )

    return tokens.filter(
      (token) => !featuredAddresses.has(token.address.toLowerCase())
    )
  }, [featuredTokens, tokens])

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-16 w-full rounded-2xl" />
        ))}
      </div>
    )
  }

  if (tokens.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        No tokens found
      </p>
    )
  }

  return (
    <div className="flex flex-col">
      {featuredTokens.length > 0 ? (
        <FeaturedTokenChips
          tokens={featuredTokens}
          chain={chain}
          selectedTokenAddress={selectedTokenAddress}
          onSelect={onSelect}
        />
      ) : null}

      {listTokens.length > 0 ? (
        <>
          <p className="mb-3 text-sm font-semibold text-foreground">
            {heading}
          </p>
          <div className="divide-y divide-border rounded-2xl border border-border bg-card">
            {listTokens.map((token) => (
              <TokenRow
                key={`${chain.id}-${token.address}`}
                token={token}
                chain={chain}
                selectedTokenAddress={selectedTokenAddress}
                balance={balances.get(token.address.toLowerCase())}
                balanceLoading={showBalances && balancesLoading}
                onSelect={onSelect}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  )
}
