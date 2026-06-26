"use client"

import { AssetIcon } from "@/components/bridge/asset-icon"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { IoCheckmarkCircle } from "react-icons/io5"

type TokenListProps = {
  tokens: Token[]
  chain: Chain
  selectedTokenAddress?: string
  isLoading?: boolean
  onSelect: (token: Token, chain: Chain) => void
  heading?: string
}

export function TokenList({
  tokens,
  chain,
  selectedTokenAddress,
  isLoading,
  onSelect,
  heading = "Popular assets",
}: TokenListProps) {
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
      <p className="mb-3 text-sm font-semibold text-foreground">{heading}</p>
      <div className="divide-y divide-border rounded-2xl border border-border bg-card">
        {tokens.map((token) => {
          const isSelected =
            selectedTokenAddress?.toLowerCase() === token.address.toLowerCase()

          return (
            <button
              key={`${chain.id}-${token.address}`}
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
                  <p className="truncate font-semibold text-foreground">
                    {token.name}
                  </p>
                  {token.metadata.verified ? (
                    <span className="inline-flex size-4 items-center justify-center rounded-full bg-kivon-600 text-[10px] text-white">
                      ✓
                    </span>
                  ) : null}
                </div>
                <p className="text-sm text-muted-foreground">{token.symbol}</p>
              </div>

              {isSelected && (
                <IoCheckmarkCircle
                  className={cn("size-6 shrink-0 text-emerald-500")}
                />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
