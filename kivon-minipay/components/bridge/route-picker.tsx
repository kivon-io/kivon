"use client"

import { HiArrowRight } from "react-icons/hi"
import { AssetSelector } from "@/components/bridge/asset-selector"

export function RoutePicker() {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex items-center justify-center gap-4 rounded-full border border-border bg-neutral-50/50 px-2.5 py-2 backdrop-blur-2xl dark:bg-neutral-900/50">
        <AssetSelector mode="origin" />
        <HiArrowRight className="size-4 shrink-0 text-neutral-500" />
        <AssetSelector mode="destination" placeholder="Select network" />
      </div>
    </div>
  )
}
