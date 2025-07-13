import { z } from "zod"

export const exchangeFormSchema = z
  .object({
    sendToken: z.object({
      ticker: z.string().min(1, { message: "Send token is required" }),
      name: z.string().min(1, { message: "Send token is required" }),
      image: z.string().min(1, { message: "Send token is required" }),
      network: z.string().min(1, { message: "Send token is required" }),
      isFiat: z.boolean(),
      supportsFixedRate: z.boolean(),
    }),
    receiveToken: z.object({
      ticker: z.string().min(1, { message: "Send token is required" }),
      name: z.string().min(1, { message: "Send token is required" }),
      image: z.string().min(1, { message: "Send token is required" }),
      network: z.string().min(1, { message: "Send token is required" }),
      isFiat: z.boolean(),
      supportsFixedRate: z.boolean(),
    }),
    sendAmount: z.number().min(0, { message: "Send amount is required" }),
    destination_address: z.string().min(1, { message: "Destination address is required" }),
    terms_and_conditions: z.boolean(),
    refund_address: z.string().min(1, { message: "Refund address is required" }).optional(),
    fixed_rate: z.boolean().optional(),
    estimatedExchange: z.object({
      rateId: z.string().optional(),
      validUntil: z.string().optional(),
      toAmount: z.number().optional(),
    }),
    minExchangeAmount: z.number().optional(),
  })
  .refine((data) => data.sendToken !== data.receiveToken, {
    message: "Send token and receive token cannot be the same.",
    path: ["receiveToken"],
  })

export type ExchangeFormSchema = z.infer<typeof exchangeFormSchema>

export const EXCHANGE_STEPS = {
  SELECT_COIN: "select-coin",
  TRANSACTION_DETAILS: "transaction-details",
  SEND_TRANSACTION: "send-transaction",
} as const

export const EXCHANGE_TYPE = {
  SEND: "send",
  RECEIVE: "receive",
} as const
