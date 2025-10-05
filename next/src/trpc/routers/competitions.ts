import { COMPETITIONS_API_URL } from "@/lib/shared/constants"
import z from "zod"
import publicProcedure from "../procedures/public"
import { createTRPCRouter } from "../trpc"

export const competitionsRouter = createTRPCRouter({
  getCompetitions: publicProcedure.query(async () => {
    const response = await fetch(`${COMPETITIONS_API_URL}/competitions`)

    if (!response.ok) {
      throw new Error(`Failed to fetch competitions: ${response.status}`)
    }

    const data = await response.json()

    return data as Competition[]
  }),
  getCompetitionById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const response = await fetch(`${COMPETITIONS_API_URL}/competitions/${input.id}`)

      if (!response.ok) {
        throw new Error(`Failed to fetch competition: ${response.status}`)
      }

      const data = await response.json()
      return data as Competition
    }),
})
