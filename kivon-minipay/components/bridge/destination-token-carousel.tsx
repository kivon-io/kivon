"use client"

import { useEffect, useMemo, useRef, useState } from "react"

import { AssetIcon } from "@/components/bridge/asset-icon"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import { useChains } from "@/hooks/use-chains"
import { useTokens } from "@/hooks/use-tokens"
import { createBridgeAsset } from "@/lib/bridge/constants"
import type { BridgeAsset } from "@/lib/bridge/types"
import { cn } from "@/lib/utils"
import { Skeleton } from "../ui/skeleton"

type DestinationTokenCarouselProps = {
  destination: BridgeAsset
  onDestinationChange: (asset: BridgeAsset) => void
}

function destinationAsToken(destination: BridgeAsset): Token {
  return {
    chainId: destination.chainId,
    symbol: destination.tokenSymbol,
    name: destination.tokenName,
    address: destination.tokenAddress,
    decimals: destination.tokenDecimals,
    metadata: {
      logoURI: destination.tokenImage,
      verified: true,
      isNative: destination.tokenIsNative,
    },
  }
}

export function DestinationTokenCarousel({
  destination,
  onDestinationChange,
}: DestinationTokenCarouselProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const syncingRef = useRef(false)

  const { data: chains = [] } = useChains()
  const chain = useMemo(
    () => chains.find((item) => item.id === destination.chainId) ?? null,
    [chains, destination.chainId]
  )

  const { data: tokens = [], isPending } = useTokens(
    { chainId: destination.chainId, defaultList: true },
    { enabled: Boolean(destination.chainId) }
  )

  const carouselTokens = useMemo(() => {
    if (tokens.length === 0) return [destinationAsToken(destination)]

    const hasSelected = tokens.some(
      (token) =>
        token.address.toLowerCase() === destination.tokenAddress.toLowerCase()
    )

    return hasSelected ? tokens : [destinationAsToken(destination), ...tokens]
  }, [tokens, destination])

  const selectedTokenIndex = useMemo(
    () =>
      carouselTokens.findIndex(
        (token) =>
          token.address.toLowerCase() === destination.tokenAddress.toLowerCase()
      ),
    [carouselTokens, destination.tokenAddress]
  )

  useEffect(() => {
    if (!api || selectedTokenIndex < 0) return
    if (api.selectedScrollSnap() === selectedTokenIndex) return

    syncingRef.current = true
    api.scrollTo(selectedTokenIndex, true)
  }, [api, selectedTokenIndex])

  useEffect(() => {
    if (!api || !chain) return

    const onSelect = () => {
      const index = api.selectedScrollSnap()
      setSelectedIndex(index)

      if (syncingRef.current) {
        syncingRef.current = false
        return
      }

      const token = carouselTokens[index]
      if (
        token &&
        token.address.toLowerCase() !== destination.tokenAddress.toLowerCase()
      ) {
        onDestinationChange(createBridgeAsset(token, chain))
      }
    }

    onSelect()
    api.on("select", onSelect)
    api.on("reInit", onSelect)

    return () => {
      api.off("select", onSelect)
      api.off("reInit", onSelect)
    }
  }, [
    api,
    chain,
    carouselTokens,
    destination.tokenAddress,
    onDestinationChange,
  ])

  const showEdgeShadows = carouselTokens.length > 1

  if (isPending) {
    return (
      <div className="relative flex w-full gap-2 py-3">
        {[...Array(4)].map((_, index) => (
          <Skeleton key={index} className="size-20 rounded-full" />
        ))}
      </div>
    )
  }

  return (
    <div className="relative w-full">
      <Carousel
        setApi={setApi}
        opts={{
          align: "center",
          loop: carouselTokens.length > 2,
          containScroll: "trimSnaps",
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-3 py-3">
          {carouselTokens.map((token, index) => {
            const isSelected = index === selectedIndex

            return (
              <CarouselItem
                key={`${token.chainId}-${token.address}`}
                className="flex min-h-[92px] basis-[88px] items-center justify-center pl-3"
              >
                <button
                  type="button"
                  aria-label={`Receive ${token.symbol} on ${destination.chainDisplayName}`}
                  aria-pressed={isSelected}
                  onClick={() => api?.scrollTo(index)}
                  className={cn(
                    "rounded-full p-1 transition-all duration-300 ease-out",
                    isSelected
                      ? "border-2 border-black dark:border-white"
                      : "scale-[0.72] border-2 border-transparent opacity-50"
                  )}
                >
                  <AssetIcon
                    tokenImage={token.metadata.logoURI}
                    tokenSymbol={token.symbol}
                    chainImage={destination.chainImage}
                    chainName={destination.chainDisplayName}
                    size={isSelected ? "lg" : "lg"}
                  />
                </button>
              </CarouselItem>
            )
          })}
        </CarouselContent>
      </Carousel>

      {showEdgeShadows ? (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-linear-to-r from-white to-transparent dark:from-black"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-linear-to-l from-white to-transparent dark:from-black"
          />
        </>
      ) : null}
    </div>
  )
}
