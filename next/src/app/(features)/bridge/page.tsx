import BridgeInterface from "@/components/swap-zone/bridge"
import { trpc } from "@/trpc/server"
import { Suspense } from "react"

export default async function BridgePage() {
  const chains = await trpc.getChains()

  return (
    <Suspense>
      <BridgeInterface chains={chains} />
    </Suspense>
  )
}
