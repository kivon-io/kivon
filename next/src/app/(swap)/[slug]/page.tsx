import Swap from "@/components/swap-zone"
import TokenList from "@/components/swap-zone/token-list"
import ExchangeProvider from "@/context/exchange-context"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Swap",
  description: "Swap",
}

export default async function SwapPage() {
  return (
    <ExchangeProvider>
      <Swap />
      <TokenList />
    </ExchangeProvider>
  )
}
