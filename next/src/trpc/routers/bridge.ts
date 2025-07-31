import { RELAY_LINK_API_URL } from "@/lib/shared/constants"
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
})
