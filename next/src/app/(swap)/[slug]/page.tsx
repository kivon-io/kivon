import Swap from "@/components/swap-zone"
import TokenList from "@/components/swap-zone/token-list"
import ExchangeProvider from "@/context/exchange-context"
import { HydrateClient, trpc } from "@/trpc/server"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Swap",
  description: "Swap",
}

export default async function SwapPage() {
  const greeting = await trpc.sayHello()

  console.log("Greeting: ", greeting)

  return (
    <HydrateClient>
      <ExchangeProvider>
        <Swap />
        <TokenList />
      </ExchangeProvider>
    </HydrateClient>
  )
}
