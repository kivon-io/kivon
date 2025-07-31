import BridgeInterface from "@/components/swap-zone/bridge"
import { trpc } from "@/trpc/server"
import { Suspense } from "react"

export default async function BridgePage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params

  const from = slug[0] || ""
  const to = slug[1] || ""

  console.log("FROM: ", from)
  console.log("TO: ", to)

  const chains = await trpc.getChains()

  return (
    <Suspense>
      <BridgeInterface chains={chains} />
    </Suspense>
  )
}
