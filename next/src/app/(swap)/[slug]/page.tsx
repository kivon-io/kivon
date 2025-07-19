import Coins from "@/components/dynamic-zone/coins"
import Faq from "@/components/dynamic-zone/faq"
import Services from "@/components/dynamic-zone/services"
import Steps from "@/components/dynamic-zone/steps"
import Testimonials from "@/components/dynamic-zone/testimonials"
import Swap from "@/components/swap-zone"
import TokenList from "@/components/swap-zone/token-list"
import ExchangeProvider from "@/context/exchange-context"
import { EXCHANGE_PARAMS_DEFAULT } from "@/lib/shared/constants"
import { HydrateClient, trpc } from "@/trpc/server"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Swap",
  description: "Swap",
}

export default async function SwapPage() {
  const currencies = await trpc.getCurrencies({
    active: EXCHANGE_PARAMS_DEFAULT.ACTIVE,
    flow: EXCHANGE_PARAMS_DEFAULT.FLOW,
    buy: EXCHANGE_PARAMS_DEFAULT.BUY,
    sell: EXCHANGE_PARAMS_DEFAULT.SELL,
  })

  return (
    <HydrateClient>
      <ExchangeProvider currencies={currencies}>
        <Swap />
        <TokenList />
        <Steps />
        <Services />
        <Coins />
        <Testimonials />
        <Faq />
      </ExchangeProvider>
    </HydrateClient>
  )
}
