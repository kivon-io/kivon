import { RELAY_LINK_API_URL } from "@/lib/shared/constants"
import z from "zod"
import publicProcedure from "../procedures/public"
import { createTRPCRouter } from "../trpc"

// using relay.link api
// https://docs.relay.link/references/api/get-chains

export const bridgeRouter = createTRPCRouter({
  getChains: publicProcedure.query(async () => {
    const response = await fetch(`${RELAY_LINK_API_URL}/chains`)

    if (!response.ok) {
      throw new Error(`Failed to fetch chains: ${response.status}`)
    }

    const data = await response.json()

    return data.chains as Chain[]
  }),
  getTokens: publicProcedure
    .input(
      z.object({
        chainId: z.number().optional(),
        term: z.string().optional(),
        address: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const { chainId, term, address } = input
      const response = await fetch(`${RELAY_LINK_API_URL}/currencies/v2`, {
        method: "POST",
        body: JSON.stringify({
          ...(chainId && { chainIds: [chainId] }),
          ...(term && { term }),
          ...(address && { address }),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch tokens: ${response.status}`)
      }

      const data = await response.json()

      return data as Token[]
    }),
})
