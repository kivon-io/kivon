"use client"

import { AssetIcon } from "@/components/bridge/asset-icon"
import { cn } from "@/lib/utils"

type SelectionTriggerProps = {
  label: string
  tokenSymbol?: string
  tokenImage?: string
  chainImage?: string
  chainName?: string
  placeholder?: string
  onClick: () => void
  className?: string
}

export function SelectionTrigger({
  label,
  tokenSymbol,
  tokenImage,
  chainImage,
  chainName,
  placeholder = "Select",
  onClick,
  className,
}: SelectionTriggerProps) {
  const hasSelection = Boolean(tokenSymbol)

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 rounded-full transition-opacity hover:opacity-80",
        className
      )}
    >
      {hasSelection ? (
        <AssetIcon
          tokenImage={tokenImage}
          tokenSymbol={tokenSymbol ?? "?"}
          chainImage={chainImage}
          chainName={chainName}
          size="sm"
        />
      ) : (
        <div className="size-6 rounded-full bg-muted" />
      )}
      <span className="text-sm font-medium text-foreground">
        {hasSelection ? label : placeholder}
      </span>
    </button>
  )
}
