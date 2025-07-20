import { CHANGE_NOW_API_URL_v1 } from "@/lib/shared/constants"
import { z } from "zod"
import publicProcedure from "../procedures/public"
import { createTRPCRouter, mergeRouters } from "../trpc"
import { swapRouter } from "./swap"
import { validateAddressRouter } from "./validate-address"

const getTokenInfo = createTRPCRouter({
  getTokenInfo: publicProcedure.input(z.object({ ticker: z.string() })).query(async ({ input }) => {
    const { ticker } = input

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
const getTokenInfos = createTRPCRouter({
  getTokenInfos: publicProcedure
    .input(z.object({ tickers: z.array(z.string()) }))
    .query(async ({ input }) => {
      const { tickers } = input

      const results = await Promise.all(
        tickers.map(async (ticker) => {
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
        })
      )

      return results as TokenInfoResponse[]
    }),
})
export const appRouter = mergeRouters(
  swapRouter,
  validateAddressRouter,
  getTokenInfo,
  getTokenInfos
)
export type AppRouter = typeof appRouter
