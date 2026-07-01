import { createPublicClient, http } from "viem"
import { celo } from "viem/chains"

function getRpcUrl() {
  const alchemyKey =
    process.env.ALCHEMY_API_KEY ??
    process.env.NEXT_PUBLIC_ALCHEMY_ID ??
    process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
  if (alchemyKey) {
    return `https://celo-mainnet.g.alchemy.com/v2/${alchemyKey}`
  }
  return "https://forno.celo.org"
}

export function createEarnPublicClient() {
  return createPublicClient({
    chain: celo,
    transport: http(getRpcUrl()),
  })
}
