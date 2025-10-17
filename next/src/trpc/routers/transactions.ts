import { COMPETITIONS_API_URL, TRANSACTION_API_BASE_URL } from "@/lib/shared/constants"
import z from "zod"
import publicProcedure from "../procedures/public"
import { createTRPCRouter } from "../trpc"

// Transaction models and schemas
const CurrencySchema = z.object({
  chain_id: z.number(),
  chain_name: z.string(),
  chain_symbol: z.string(),
  chain_logo_uri: z.string().optional(),
  currency_role: z.enum(["from", "to"]),
  currency_address: z.string(),
  currency_symbol: z.string(),
  currency_name: z.string(),
  currency_logo_uri: z.string().optional(),
  decimals: z.number(),
  is_native: z.boolean(),
  amount: z.string(),
  amount_formatted: z.string(),
  amount_usd: z.string(),
})

const FeesSchema = z
  .array(
    z.object({
      fee_currency_address: z.string(),
      fee_currency_symbol: z.string(),
      fee_currency_name: z.string(),
      fee_currency_logo_uri: z.string().optional(),

      fee_type: z.string(),
      fee_amount: z.string(),
      fee_amount_formatted: z.string(),
      fee_amount_usd: z.string(),
    })
  )
  .optional()

const ProtocolSchema = z.array(
  z.object({
    protocol_name: z.string(),
    order_id: z.string().optional(),
    request_id: z.string().optional(),
  })
)

const TransactionSchema = z.object({
  transaction_type: z.enum(["swap", "bridge"]),
  user_address: z.string(),
  from_amount: z.string(),
  to_amount: z.string(),
  from_amount_usd: z.string(),
  to_amount_usd: z.string(),
  external_transaction_id: z.string(),
  sender_address: z.string(),
  recipient_address: z.string(),
  input_tx_hash: z.string().optional(),
  output_tx_hash: z.string().optional(),
  input_hash_explorer_url: z.string().optional(),
  output_hash_explorer_url: z.string().optional(),
  time_estimate: z.string(),
  currencies: z.array(CurrencySchema),
  fees: FeesSchema,
  protocol: ProtocolSchema,
})

type TransactionInput = z.infer<typeof TransactionSchema>

// Transform function to convert input to API format
function transformTransactionForAPI(input: TransactionInput) {
  return {
    transaction_type: input.transaction_type,
    user_address: input.user_address,
    from_amount: input.from_amount,
    to_amount: input.to_amount,
    from_amount_usd: input.from_amount_usd,
    to_amount_usd: input.to_amount_usd,
    external_transaction_id: input.external_transaction_id,
    sender_address: input.sender_address,
    recipient_address: input.recipient_address,
    input_tx_hash: input.input_tx_hash,
    output_tx_hash: input.output_tx_hash,
    input_hash_explorer_url: input.input_hash_explorer_url,
    output_hash_explorer_url: input.output_hash_explorer_url,
    currencies: input.currencies.map((currency) => ({
      chain_id: currency.chain_id,
      chain_name: currency.chain_name,
      chain_symbol: currency.chain_symbol,
      chain_logo_uri: currency.chain_logo_uri,
      currency_role: currency.currency_role,
      currency_address: currency.currency_address,
      currency_symbol: currency.currency_symbol,
      currency_name: currency.currency_name,
      currency_logo_uri: currency.currency_logo_uri,
      decimals: currency.decimals,
      is_native: currency.is_native,
      amount: currency.amount,
      amount_formatted: currency.amount_formatted,
      amount_usd: currency.amount_usd,
    })),
    time_estimate: input.time_estimate,
    fees: input.fees
      ? input.fees.map((fee) => ({
          fee_currency_address: fee.fee_currency_address,
          fee_currency_symbol: fee.fee_currency_symbol,
          fee_currency_name: fee.fee_currency_name,
          fee_currency_logo_uri: fee.fee_currency_logo_uri,
          fee_type: fee.fee_type,
          fee_amount: fee.fee_amount,
          fee_amount_formatted: fee.fee_amount_formatted,
          fee_amount_usd: fee.fee_amount_usd,
        }))
      : undefined,
    protocol: input.protocol
      ? input.protocol.map((protocol) => ({
          protocol_name: protocol.protocol_name,
          order_id: protocol.order_id,
          request_id: protocol.request_id,
        }))
      : undefined,
  }
}

export const transactionRouter = createTRPCRouter({
  createTransaction: publicProcedure.input(TransactionSchema).mutation(async ({ input }) => {
    // Transform the input to match API expectations
    const transformedData = transformTransactionForAPI(input)

    const response = await fetch(`${TRANSACTION_API_BASE_URL}/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transformedData),
    })

    if (!response.ok) {
      throw new Error(`Failed to create transaction: ${response.status}`)
    }

    const data = await response.json()
    return data
  }),

  getTransactions: publicProcedure
    .input(
      z
        .object({
          page: z.number().optional().default(1),
          per_page: z.number().optional().default(20),
          user_address: z.string().optional(),
          from_chain_id: z.number().optional(),
          to_chain_id: z.number().optional(),
          search: z.string().optional(),
          filter_type: z.string().optional(),
        })
        .optional()
        .default({ page: 1, per_page: 20 })
    )
    .query(async ({ input }) => {
      const params = new URLSearchParams({
        page: input.page.toString(),
        per_page: input.per_page.toString(),
        ...(input.user_address && { user_address: input.user_address }),
        ...(input.from_chain_id && { from_chain_id: input.from_chain_id.toString() }),
        ...(input.to_chain_id && { to_chain_id: input.to_chain_id.toString() }),
        ...(input.search && { q: input.search }),
        ...(input.filter_type && { filter_type: input.filter_type }),
      })

      const response = await fetch(`${TRANSACTION_API_BASE_URL}/transactions?${params}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch transactions: ${response.status}`)
      }

      const data = await response.json()
      return data as TransactionResponse
    }),

  // Helper procedure to get transaction by id
  getTransactionById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      const response = await fetch(`${TRANSACTION_API_BASE_URL}/transactions/${input.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch transaction: ${response.status}`)
      }

      const data = await response.json()
      return data as Transaction
    }),

  // Helper procedure to get user transactions
  getTransactionStats: publicProcedure.query(async () => {
    const response = await fetch(`${TRANSACTION_API_BASE_URL}/transactions/stats`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch transaction stats: ${response.status}`)
    }

    const data = await response.json()
    return data as TransactionStats
  }),

  getUser: publicProcedure.input(z.object({ userAddress: z.string() })).query(async ({ input }) => {
    const response = await fetch(`${COMPETITIONS_API_URL}/users/wallet/${input.userAddress}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch user points: ${response.status}`)
    }

    const data = await response.json()
    return data as User
  }),
})

// Export types for use in other files
export { CurrencySchema, FeesSchema, ProtocolSchema, TransactionSchema }
export type { TransactionInput }
