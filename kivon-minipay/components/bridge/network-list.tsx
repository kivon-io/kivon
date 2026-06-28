"use client"

import { ChevronRight, CircleCheck } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

type NetworkListProps = {
  chains: Chain[]
  selectedChainId?: number
  isLoading?: boolean
  onSelect: (chain: Chain) => void
}

export function NetworkList({
  chains,
  selectedChainId,
  isLoading,
  onSelect,
}: NetworkListProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-16 w-full rounded-2xl" />
        ))}
      </div>
    )
  }

  if (chains.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">No networks found</p>
    )
  }

  return (
    <div className="flex flex-col">
      <p className="mb-3 text-sm font-semibold text-foreground">Networks</p>
      <div className="divide-y divide-border rounded-2xl border border-border bg-card">
        {chains.map((chain) => {
          const isSelected = chain.id === selectedChainId
          const tokenCount = chain.featuredTokens?.length ?? 0

          return (
            <button
              key={chain.id}
              type="button"
              onClick={() => onSelect(chain)}
              className="flex w-full items-center gap-3 px-4 py-4 text-left transition-colors hover:bg-muted/40"
            >
              {chain.iconUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={chain.iconUrl}
                  alt={chain.displayName}
                  width={40}
                  height={40}
                  className="size-10 rounded-full object-cover"
                />
              ) : (
                <div className="flex size-10 items-center justify-center rounded-full bg-muted text-sm font-semibold uppercase">
                  {chain.displayName.slice(0, 1)}
                </div>
              )}

              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-foreground">{chain.displayName}</p>
                <p className="text-sm text-muted-foreground">
                  {tokenCount > 0 ? `${tokenCount}+ tokens` : "Select to view tokens"}
                </p>
              </div>

              {isSelected ? (
                <CircleCheck className={cn("size-6 shrink-0 text-emerald-500")} />
              ) : (
                <ChevronRight className="size-5 shrink-0 text-muted-foreground" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
