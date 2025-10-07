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
  getParticipants: publicProcedure.input(z.object({ id: z.string() })).query(async ({ input }) => {
    const response = await fetch(`${COMPETITIONS_API_URL}/competitions/${input.id}/participants`)
    if (!response.ok) {
      throw new Error(`Failed to fetch participants: ${response.status}`)
    }

    const data = await response.json()
    return data as Participant[]
  }),
  joinCompetition: publicProcedure
    .input(
      z.object({
        id: z.string(),
        userAddress: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, userAddress } = input

      console.log(userAddress)

      const response = await fetch(`${COMPETITIONS_API_URL}/competitions/${id}/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userAddress }),
      })

      if (!response.ok) {
        const error = await response.json()
        console.error(error)
        throw new Error(`Failed to join competition: ${response.status}`)
      }

      const data = await response.json()
      return data as { id: string }
    }),
  checkIfUserJoinedCompetition: publicProcedure
    .input(z.object({ id: z.string(), userAddress: z.string() }))
    .query(async ({ input }) => {
      const { id, userAddress } = input

      const url = `${COMPETITIONS_API_URL}/competitions/${id}/check-user-joined/${userAddress}`

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to check if user joined competition: ${response.status}`)
      }

      const data = await response.json()
      return data as boolean
    }),
})
