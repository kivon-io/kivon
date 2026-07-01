"use client"

import Image from "next/image"
import { useState } from "react"

import { CopyButton } from "@/components/earn/copy-button"
import { PositionDrawer } from "@/components/earn/position-drawer"
import { truncateAddress } from "@/lib/bridge/format"
import { EARN_INFO } from "@/lib/earn/constants"
import { ChevronRight } from "lucide-react"
import { Button } from "../ui/button"

export default function HeaderInfo() {
  const [positionsOpen, setPositionsOpen] = useState(false)

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between">
          <div className="flex gap-3">
            <div className="relative size-10 shrink-0 overflow-hidden rounded-full border border-border bg-background">
              <Image
                src={EARN_INFO.curatorImage}
                alt={EARN_INFO.name}
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="truncate text-lg font-bold">{EARN_INFO.name}</h1>
              <div className="flex items-center gap-1.5">
                <p className="text-xs text-muted-foreground">
                  Powered by {EARN_INFO.poweredBy}
                </p>
                <div className="relative size-5 shrink-0 overflow-hidden rounded-md">
                  <Image
                    src={EARN_INFO.poweredByImage}
                    alt={EARN_INFO.poweredBy}
                    width={20}
                    height={20}
                    className="size-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
          <Button variant="ghost" onClick={() => setPositionsOpen(true)}>
            <p className="text-xs text-foreground">My Positions</p>
            <ChevronRight className="size-4 text-foreground" />
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex w-fit items-center gap-1 rounded-lg border border-border px-2.5 py-1">
            <p className="text-xs text-muted-foreground">
              {truncateAddress(EARN_INFO.vaultAddress)}
            </p>
            <CopyButton value={EARN_INFO.vaultAddress} />
          </div>

          <div className="relative flex size-7 shrink-0 items-center">
            <div className="absolute left-0 size-6 overflow-hidden rounded-full border border-border bg-background">
              <Image
                src={EARN_INFO.assetImage}
                alt={EARN_INFO.assetSymbol}
                width={24}
                height={24}
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-1 left-3 size-5 overflow-hidden rounded-full border border-border bg-background">
              <Image
                src={EARN_INFO.chainImage}
                alt={EARN_INFO.chainName}
                width={20}
                height={20}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <PositionDrawer open={positionsOpen} onOpenChange={setPositionsOpen} />
    </>
  )
}
