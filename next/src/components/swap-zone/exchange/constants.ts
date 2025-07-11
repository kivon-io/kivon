import { z } from "zod"

export const exchangeFormSchema = z
  .object({
    sendToken: z.string().min(1, { message: "Send token is required" }),
    receiveToken: z.string().min(1, { message: "Receive token is required" }),
    sendAmount: z.number().min(0, { message: "Send amount is required" }),
    destination_address: z.string().min(1, { message: "Destination address is required" }),
    refund_address: z.string().min(1, { message: "Refund address is required" }).optional(),
    fixed_rate: z.boolean().default(false).optional(),
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
