import Swap from "@/components/swap-zone"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Swap",
  description: "Swap",
}

export default async function SwapPage() {
  return <Swap />
}
