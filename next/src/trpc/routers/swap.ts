import { z } from "zod"
import publicProcedure from "../procedures/public"
import { createTRPCRouter } from "../trpc"

export const swapRouter = createTRPCRouter({
  //  1. get list of available currencies
  //  2. get min exchange amount
  //  3. get estimated exchange amount
  //  4. create exchange transaction
  //  5. get transaction status

  getCurrencies: publicProcedure
    .input(
      z.object({
        active: z.boolean().optional(),
        flow: z.string().optional(),
        buy: z.boolean().optional(),
        sell: z.boolean().optional(),
      })
    )
    .query(async ({ input }) => {
      const params = new URLSearchParams()
      if (input.active) params.append("active", input.active.toString())
      if (input.flow) params.append("flow", input.flow)
      if (input.buy) params.append("buy", input.buy.toString())
      if (input.sell) params.append("sell", input.sell.toString())

      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
        }/api/currencies?${params.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      if (!response.ok) {
        throw new Error(`Failed to fetch currencies: ${response.status}`)
      }

      const data = await response.json()
      return data as Currency[]
    }),
})
