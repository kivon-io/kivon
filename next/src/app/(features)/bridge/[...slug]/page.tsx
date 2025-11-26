import BridgeInterface from "@/components/swap-zone/bridge"
import { CUSTOM_CHAINS } from "@/constants/customChains"
import { trpc } from "@/trpc/server"
import { Suspense } from "react"

export default async function BridgePage() {
  const fetchedChains = await trpc.getChains()

  const customChainIds = new Set(CUSTOM_CHAINS.map((chain) => chain.id))
  const filteredFetchedChains = fetchedChains.filter((chain) => !customChainIds.has(chain.id))
  const chains = [...filteredFetchedChains, ...CUSTOM_CHAINS]

  return (
    <Suspense>
      <BridgeInterface chains={chains} />
    </Suspense>
  )
}
