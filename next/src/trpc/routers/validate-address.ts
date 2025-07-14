import { CHANGE_NOW_API_URL } from "@/lib/shared/constants"
import { z } from "zod"
import publicProcedure from "../procedures/public"
import { createTRPCRouter } from "../trpc"

export const validateAddressRouter = createTRPCRouter({
  validateAddress: publicProcedure
    .input(z.object({ address: z.string(), network: z.string() }))
    .query(async ({ input }) => {
      const { address, network } = input

      const apiKey = process.env.CHANGE_NOW_API_KEY

      const response = await fetch(
        `${CHANGE_NOW_API_URL}/validate/address?currency=${network}&address=${address}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-changenow-api-key": apiKey!,
          },
        }
      )

      if (!response.ok) {
        throw new Error(`Failed to validate address: ${response.status}`)
      }

      const data = await response.json()

      return data as {
        result: boolean
        message: string
        isActivated: boolean
      }
    }),
})
