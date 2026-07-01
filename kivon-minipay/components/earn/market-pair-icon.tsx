import Image from "next/image"

import {
  getMarketAssetImage,
  USDT_MARKET_IMAGE,
} from "@/lib/earn/market-images"
import { isOptimizableImageUrl } from "@/lib/images"
import { cn } from "@/lib/utils"

function TokenImage({
  src,
  alt,
  size,
  className,
}: {
  src: string
  alt: string
  size: number
  className?: string
}) {
  const imageClassName = cn("rounded-full object-cover", className)

  if (isOptimizableImageUrl(src)) {
    return (
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        sizes={`${size}px`}
        className={imageClassName}
      />
    )
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- Feather CDN host
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={imageClassName}
    />
  )
}

type MarketPairIconProps = {
  collateralSymbol: string | null
  className?: string
}

export function MarketPairIcon({
  collateralSymbol,
  className,
}: MarketPairIconProps) {
  const collateralImage = getMarketAssetImage(collateralSymbol)

  return (
    <div className={cn("relative size-9 shrink-0", className)}>
      <div className="absolute top-0 left-0 size-7 overflow-hidden rounded-full border border-border bg-background">
        {collateralImage ? (
          <TokenImage
            src={collateralImage}
            alt={collateralSymbol ?? "collateral"}
            size={30}
          />
        ) : (
          <div className="flex size-6 items-center justify-center bg-muted text-[9px] font-semibold uppercase">
            {collateralSymbol?.slice(0, 2) ?? "?"}
          </div>
        )}
      </div>
      <div className="absolute right-1 bottom-1 size-5 overflow-hidden rounded-full border border-border bg-background">
        <TokenImage src={USDT_MARKET_IMAGE} alt="USDT" size={20} />
      </div>
    </div>
  )
}

type MarketAssetIconProps = {
  symbol: string
  size?: number
  className?: string
}

export function MarketAssetIcon({
  symbol,
  size = 24,
  className,
}: MarketAssetIconProps) {
  const image = getMarketAssetImage(symbol)

  if (!image) {
    return (
      <div
        className={cn(
          "flex shrink-0 items-center justify-center rounded-full border border-border bg-muted font-semibold uppercase",
          className
        )}
        style={{ width: size, height: size, fontSize: size * 0.35 }}
      >
        {symbol.slice(0, 2)}
      </div>
    )
  }

  return (
    <div
      className={cn(
        "shrink-0 overflow-hidden rounded-full border border-border",
        className
      )}
      style={{ width: size, height: size }}
    >
      <TokenImage src={image} alt={symbol} size={size} />
    </div>
  )
}
