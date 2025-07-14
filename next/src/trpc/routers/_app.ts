import { CHANGE_NOW_API_URL_v1 } from "@/lib/shared/constants"
import { z } from "zod"
import publicProcedure from "../procedures/public"
import { createTRPCRouter, mergeRouters } from "../trpc"
import { swapRouter } from "./swap"
import { validateAddressRouter } from "./validate-address"

const getTokenInfo = createTRPCRouter({
  getTokenInfo: publicProcedure.input(z.object({ ticker: z.string() })).query(async ({ input }) => {
    const { ticker } = input

    console.log("ticker: ", ticker)
    console.log("url: ", `${CHANGE_NOW_API_URL_v1}/currencies/${ticker}`)

    const response = await fetch(`${CHANGE_NOW_API_URL_v1}/currencies/${ticker}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-changenow-api-key": process.env.CHANGE_NOW_API_KEY || "",
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch token info: ${response.status}`)
    }

    const data = await response.json()
    return data as TokenInfoResponse
  }),
})
export const appRouter = mergeRouters(swapRouter, validateAddressRouter, getTokenInfo)
export type AppRouter = typeof appRouter
