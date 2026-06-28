import Image from "next/image"

import { isOptimizableImageUrl } from "@/lib/images"
import { cn } from "@/lib/utils"

type AssetIconProps = {
  tokenImage?: string
  tokenSymbol: string
  chainImage?: string
  chainName?: string
  size?: "sm" | "md" | "lg"
  /** Mark the LCP candidate (only one per page). */
  priority?: boolean
  className?: string
}

const sizeMap = {
  sm: { token: 24, badge: 12, badgeOffset: "-bottom-0.5 -right-0.5" },
  md: { token: 32, badge: 16, badgeOffset: "-bottom-1 -right-1" },
  lg: { token: 72, badge: 32, badgeOffset: "-bottom-1 -right-1" },
} as const

function TokenImage({
  src,
  alt,
  size,
  priority,
}: {
  src: string
  alt: string
  size: number
  priority?: boolean
}) {
  const className = "rounded-full object-cover"

  if (isOptimizableImageUrl(src)) {
    return (
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        sizes={`${size}px`}
        priority={priority}
        className={className}
      />
    )
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- dynamic Relay/CDN hosts
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      fetchPriority={priority ? "high" : "auto"}
      className={className}
    />
  )
}

export function AssetIcon({
  tokenImage,
  tokenSymbol,
  chainImage,
  chainName,
  size = "md",
  priority = false,
  className,
}: AssetIconProps) {
  const dimensions = sizeMap[size]

  return (
    <div className={cn("relative w-fit shrink-0", className)}>
      {tokenImage ? (
        <TokenImage
          src={tokenImage}
          alt={tokenSymbol}
          size={dimensions.token}
          priority={priority}
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
          <TokenImage
            src={chainImage}
            alt={chainName ?? "chain"}
            size={dimensions.badge}
          />
        </div>
      ) : null}
    </div>
  )
}
