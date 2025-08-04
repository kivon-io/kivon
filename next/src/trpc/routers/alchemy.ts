import { ALCHEMY_API_KEY, DEFAULT_ALCHEMY_NETWORK } from "@/lib/shared/constants"
import { Alchemy, Network, TokenBalance } from "alchemy-sdk"
import { z } from "zod"
import publicProcedure from "../procedures/public"
import { createTRPCRouter } from "../trpc"

const networkEnum = z.enum(Object.values(Network))

const SUPPORTED_NETWORKS: Network[] = [
  Network.ETH_MAINNET,
  Network.ARB_MAINNET,
  //   Network.OPT_MAINNET,
  Network.BASE_MAINNET,
  //   Network.LINEA_MAINNET,
]

export const alchemyRouter = createTRPCRouter({
  getTokenBalances: publicProcedure
    .input(
      z.object({
        address: z.string().min(3),
        network: networkEnum.default(DEFAULT_ALCHEMY_NETWORK),
      })
    )
    .query(async ({ input }) => {
      const { address } = input
      const TOP_N = 5 // only fetch metadata + price for these many

      const results: Array<{
        network: Network
        tokens: Array<{
          name: string
          symbol: string
          logo: string | null
          balance: number
          balanceUSD: number
          contractAddress: string
          network: Network
        }>
      }> = []

      for (const network of SUPPORTED_NETWORKS) {
        const alchemy = new Alchemy({
          apiKey: ALCHEMY_API_KEY,
          network,
          connectionInfoOverrides: { skipFetchSetup: true },
        })

        // 1) get raw ERC20 balances
        const { tokenBalances } = await alchemy.core.getTokenBalances(address)
        const nonZero = (tokenBalances as TokenBalance[]).filter(
          (t) => t.tokenBalance !== "0x0" && t.tokenBalance !== "0"
        )
        if (!nonZero.length) continue

        // 2) batch price lookup for all non-zero tokens
        const priceResp = await alchemy.prices.getTokenPriceByAddress(
          nonZero.map((t) => ({ network, address: t.contractAddress }))
        )
        const priceMap = new Map<string, number>()
        for (const entry of priceResp.data) {
          const usd = Number(entry.prices[0]?.value ?? 0)
          priceMap.set(entry.address.toLowerCase(), usd)
        }

        // 3) build a list of only those with price>0
        const valued = nonZero
          .map((t) => ({
            contract: t.contractAddress,
            raw: BigInt(t.tokenBalance ?? "0"),
            usdPrice: priceMap.get(t.contractAddress.toLowerCase()) ?? 0,
          }))
          .filter((v) => v.usdPrice > 0) // 👈 drop zero-price tokens

        if (!valued.length) {
          // no priced tokens on this chain
          continue
        }

        // 4) sort by raw * price, then take top N
        valued.sort((a, b) => Number(b.raw) * b.usdPrice - Number(a.raw) * a.usdPrice)
        const top = valued.slice(0, TOP_N)

        // 5) now fetch metadata & compute exact balances only for those top N
        const tokens = await Promise.all(
          top.map(async ({ contract, raw, usdPrice }) => {
            const meta = await alchemy.core.getTokenMetadata(contract)
            const human = Number(raw) / 10 ** (meta.decimals ?? 18)
            return {
              name: meta.name || meta.symbol || "",
              symbol: meta.symbol || meta.name || contract,
              logo: meta.logo || null,
              balance: human,
              balanceUSD: human * usdPrice,
              contractAddress: contract,
              network,
            }
          })
        )

        results.push({ network, tokens })
      }

      return results
    }),
})
