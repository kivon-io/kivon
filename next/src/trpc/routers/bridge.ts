import { VM_TYPES } from "@/components/swap-zone/bridge/constants"
import transactionSteps from "@/data/transaction-steps.json"
import { RELAY_APP_CONFIG } from "@/lib/relay/config"
import { APP_NAME, PROTOCOL_VERSION, RELAY_LINK_API_URL } from "@/lib/shared/constants"
import { parseUnits } from "viem"
import z from "zod"
import publicProcedure from "../procedures/public"
import { createTRPCRouter } from "../trpc"

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
  getQuote: publicProcedure
    .input(
      z
        .object({
          user: z.string().min(1, { error: "Address is required" }),
          originChainId: z.number().min(1, { error: "OriginChain ID is required" }),
          destinationChainId: z.number().min(1, { error: "Destination Chain ID is required" }),
          originCurrency: z.string().min(1, { error: "Origin Currency is required" }),
          destinationCurrency: z.string().min(1, { error: "Destination Currency is required" }),
          amount: z.string().min(1, { error: "Amount is required" }),
          decimals: z.number().min(1, { error: "Decimals is required" }),
          slippageTolerance: z.string().optional(),
          recipient: z.string().optional(),
          // Additional fields needed for validation
          destinationVmType: z.string(),
          connectedChainId: z.number(),
        })
        .refine(
          (data) => {
            const needsRecipient =
              data.destinationVmType !== VM_TYPES.EVM &&
              data.destinationChainId !== data.connectedChainId
            return (
              !needsRecipient || (needsRecipient && data.recipient && data.recipient.length > 0)
            )
          },
          {
            message: "Recipient address is required for cross-VM transactions",
            path: ["recipient"],
          }
        )
    )
    .query(async ({ input }) => {
      const {
        user,
        originChainId,
        destinationChainId,
        originCurrency,
        destinationCurrency,
        amount,
        slippageTolerance,
        recipient,
        decimals,
        // destinationVmType and connectedChainId are only used for validation, not in the API call
      } = input

      const payload = {
        user,
        originChainId,
        destinationChainId,
        originCurrency,
        destinationCurrency,
        amount: parseUnits(amount, decimals).toString(),
        tradeType: RELAY_APP_CONFIG.TRADE_TYPE.EXACT_INPUT,
        ...(slippageTolerance && { slippageTolerance }),
        ...(recipient && { recipient }),
        appFees: [
          {
            recipient: RELAY_APP_CONFIG.APP,
            fee: RELAY_APP_CONFIG.FEE,
          },
        ],
        protocolVersion: PROTOCOL_VERSION.PREFER_V2,
        refundTo: user,
        referrer: APP_NAME,
      }

      if (process.env.NEXT_PUBLIC_SIMULATE_EXECUTION === "true") {
        return transactionSteps as unknown as Quote
      }

      const response = await fetch(`${RELAY_LINK_API_URL}/quote`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        // console.log("error response: ", errorData)
        throw new Error(errorData.message || `Failed to fetch quote: ${response.status}`)
      }

      const data = await response.json()

      return data as Quote
    }),
})
