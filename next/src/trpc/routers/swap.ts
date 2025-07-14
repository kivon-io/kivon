// import {
//   txConfirming,
//   txExchanging,
//   txFinished,
//   txSending,
//   txWaiting,
// } from "@/data/transactionstatus"
import { APP_URL, CHANGE_NOW_API_URL } from "@/lib/shared/constants"
import { z } from "zod"
import publicProcedure from "../procedures/public"
import { createTRPCRouter } from "../trpc"

// let currentStep = 1
// let lastUpdate = Date.now()

// const MOCK_STATUSES = [txWaiting, txConfirming, txExchanging, txSending, txFinished]

export const swapRouter = createTRPCRouter({
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

      const response = await fetch(`${APP_URL}/api/currencies?${params.toString()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch currencies: ${response.status}`)
      }

      const data = await response.json()
      return data as Currency[]
    }),

  getMinExchangeAmount: publicProcedure
    .input(
      z.object({
        sendToken: z.string(),
        receiveToken: z.string(),
        sendTokenNetwork: z.string(),
        receiveTokenNetwork: z.string(),
        flow: z.string(),
      })
    )
    .query(async ({ input }) => {
      const params = new URLSearchParams({
        sendToken: input.sendToken,
        receiveToken: input.receiveToken,
        sendTokenNetwork: input.sendTokenNetwork,
        receiveTokenNetwork: input.receiveTokenNetwork,
        flow: input.flow,
      }).toString()

      const response = await fetch(`${APP_URL}/api/currencies/min-exchange-amount?${params}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch min exchange amount: ${response.status}`)
      }

      const data = await response.json()

      return data as MinExchangeAmountResponse
    }),

  getEstimatedExchangeAmount: publicProcedure
    .input(
      z.object({
        sendToken: z.string(),
        receiveToken: z.string(),
        sendTokenNetwork: z.string(),
        receiveTokenNetwork: z.string(),
        flow: z.string(),
        sendAmount: z.coerce.number().min(0, { message: "Send amount must be greater than 0" }),
      })
    )
    .query(async ({ input }) => {
      const params = new URLSearchParams({
        sendToken: input.sendToken,
        receiveToken: input.receiveToken,
        sendTokenNetwork: input.sendTokenNetwork,
        receiveTokenNetwork: input.receiveTokenNetwork,
        flow: input.flow,
        sendAmount: input.sendAmount.toString(),
      }).toString()

      const response = await fetch(`${APP_URL}/api/currencies/estimated-amount?${params}`, {
        method: "GET",
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch estimated exchange amount: ${response.status}`)
      }

      const data = await response.json()

      return data as EstimatedExchangeAmountResponse
    }),

  createExchangeTransaction: publicProcedure
    .input(
      z.object({
        sendToken: z.string(),
        receiveToken: z.string(),
        sendTokenNetwork: z.string(),
        receiveTokenNetwork: z.string(),
        sendAmount: z.coerce.number().min(0, { message: "Send amount must be greater than 0" }),
        destinationAddress: z.string(),
        refundAddress: z.string().optional(),
        flow: z.string(),
        rateId: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const payload = {
        fromCurrency: input.sendToken,
        fromNetwork: input.sendTokenNetwork,
        toCurrency: input.receiveToken,
        toNetwork: input.receiveTokenNetwork,
        fromAmount: input.sendAmount,
        // toAmount: input.sendAmount,
        address: input.destinationAddress,
        ...(input.rateId && { rateId: input.rateId }),
        ...(input.refundAddress && { refundAddress: input.refundAddress }),
        flow: input.flow,
      }

      // console.log("PAYLOAD: ", payload)

      const response = await fetch(`${CHANGE_NOW_API_URL}/exchange`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-changenow-api-key": process.env.CHANGE_NOW_API_KEY || "",
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error(`Failed to create exchange transaction: ${response.status}`)
      }

      const data = await response.json()

      return data as ExchangeTransactionResponse

      // TODO: remove this
      //   return {
      //     fromAmount: 0.003,
      //     toAmount: 0.052286,
      //     flow: "standard",
      //     type: "direct",
      //     payinAddress: "3M7QKsJDKbVZAhFPpFSVtVQv6Nzon3Lwtv",
      //     payoutAddress: "0x57f31ad4b64095347F87eDB1675566DAfF5EC886",
      //     fromCurrency: "btc",
      //     toCurrency: "eth",
      //     refundAddress: "135Hej8p1xSKoChWu5x6LSbNn5opgpojGn",
      //     id: "3a2360771439a3",
      //     fromNetwork: "btc",
      //     toNetwork: "eth",
      //   } as unknown as ExchangeTransactionResponse
    }),

  getExchangeTransactionStatus: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const response = await fetch(`${CHANGE_NOW_API_URL}/exchange/by-id?id=${input.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-changenow-api-key": process.env.CHANGE_NOW_API_KEY || "",
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch exchange transaction status: ${response.status}`)
      }

      const data = await response.json()

      return data as ExchangeStatusResponse

      // TODO: remove this
      // console.log("INPUT: ", input)

      // Simulate advancing every 20 seconds
      // const now = Date.now()
      // if (currentStep < MOCK_STATUSES.length - 1 && now - lastUpdate > 20000) {
      //   currentStep++
      //   lastUpdate = now
      // }

      // console.log("CURRENT STEP: ", currentStep)

      // return MOCK_STATUSES[currentStep] as unknown as ExchangeStatusResponse
    }),
})
