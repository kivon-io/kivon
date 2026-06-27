import { cn } from "@/lib/utils"

type AssetIconProps = {
  tokenImage?: string
  tokenSymbol: string
  chainImage?: string
  chainName?: string
  size?: "sm" | "md" | "lg"
  className?: string
}

const sizeMap = {
  sm: { token: 24, badge: 12, badgeOffset: "-bottom-0.5 -right-0.5" },
  md: { token: 32, badge: 16, badgeOffset: "-bottom-1 -right-1" },
  lg: { token: 72, badge: 32, badgeOffset: "-bottom-1 -right-1" },
} as const

export function AssetIcon({
  tokenImage,
  tokenSymbol,
  chainImage,
  chainName,
  size = "md",
  className,
}: AssetIconProps) {
  const dimensions = sizeMap[size]

  return (
    <div className={cn("relative w-fit shrink-0", className)}>
      {tokenImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={tokenImage}
          alt={tokenSymbol}
          width={dimensions.token}
          height={dimensions.token}
          className="rounded-full object-cover"
        />
      ) : (
        <div
          className="flex items-center justify-center rounded-full bg-muted font-medium text-muted-foreground uppercase"
          style={{ width: dimensions.token, height: dimensions.token }}
        >
          {tokenSymbol.slice(0, 1)}
        </div>
      )}
      {chainImage ? (
        <div
          className={cn(
            "absolute rounded-full border border-border bg-background p-px",
            dimensions.badgeOffset
          )}
        >
          <img
            src={chainImage}
            alt={chainName ?? "chain"}
            width={dimensions.badge}
            height={dimensions.badge}
            className="rounded-full object-cover"
          />
        </div>
      ) : null}
    </div>
  )
}
