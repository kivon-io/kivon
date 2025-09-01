import { CHANGE_NOW_API_URL_v1, TRANSACTION_API_BASE_URL } from "@/lib/shared/constants"
import { z } from "zod"
import publicProcedure from "../procedures/public"
import { createTRPCRouter, mergeRouters } from "../trpc"
import { alchemyRouter } from "./alchemy"
import { bridgeRouter } from "./bridge"
import { swapRouter } from "./swap"
import { transactionRouter } from "./transactions"
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

const userRouter = createTRPCRouter({
  createUser: publicProcedure
    .input(z.object({ address: z.string() }))
    .mutation(async ({ input }) => {
      const { address } = input
      const payload = {
        name: address,
        wallet_addresses: [address],
      }

      const response = await fetch(`${TRANSACTION_API_BASE_URL}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error(`Failed to create user: ${response.status}`)
      }

      const data = await response.json()
      return data as { id: string }
    }),
})

export const appRouter = mergeRouters(
  swapRouter,
  validateAddressRouter,
  getTokenInfo,
  getTokenInfos,
  bridgeRouter,
  alchemyRouter,
  transactionRouter,
  userRouter
)
export type AppRouter = typeof appRouter
