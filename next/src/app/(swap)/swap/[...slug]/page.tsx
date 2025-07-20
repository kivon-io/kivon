import Swap from "@/components/swap-zone"
import { EXCHANGE_PARAMS_DEFAULT } from "@/lib/shared/constants"
import { trpc } from "@/trpc/server"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Swap",
  description: "Swap",
}

export default async function SwapPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params

  const from = slug[0] || ""
  const to = slug[1] || ""

  const currencies = await trpc.getCurrencies({
    active: EXCHANGE_PARAMS_DEFAULT.ACTIVE,
    flow: EXCHANGE_PARAMS_DEFAULT.FLOW,
    buy: EXCHANGE_PARAMS_DEFAULT.BUY,
    sell: EXCHANGE_PARAMS_DEFAULT.SELL,
  })

  return <Swap currencies={currencies} from={from} to={to} />
}
