import { z } from "zod"
import { VM_TYPES } from "./constants"

export const getTokensSchema = z.object({
  chainId: z.number().optional(),
  term: z.string().optional(),
  address: z.string().optional(),
  defaultList: z.boolean().optional(),
  limit: z.number().max(100).optional(),
})

export type GetTokensInput = z.infer<typeof getTokensSchema>

export const getQuoteSchema = z
  .object({
    user: z.string().min(1, { message: "Address is required" }),
    originChainId: z.number().min(1, { message: "Origin Chain ID is required" }),
    destinationChainId: z.number().min(1, { message: "Destination Chain ID is required" }),
    originCurrency: z.string().min(1, { message: "Origin Currency is required" }),
    destinationCurrency: z.string().min(1, { message: "Destination Currency is required" }),
    amount: z.string().min(1, { message: "Amount is required" }),
    decimals: z.number().min(1, { message: "Decimals is required" }),
    slippageTolerance: z.string().optional(),
    recipient: z.string().optional(),
    // Used for validation only — not forwarded to Relay.
    destinationVmType: z.string(),
    connectedChainId: z.number(),
  })
  .refine(
    (data) => {
      const needsRecipient =
        data.destinationVmType !== VM_TYPES.EVM &&
        data.destinationChainId !== data.connectedChainId
      return !needsRecipient || (needsRecipient && !!data.recipient && data.recipient.length > 0)
    },
    {
      message: "Recipient address is required for cross-VM transactions",
      path: ["recipient"],
    }
  )

export type GetQuoteInput = z.infer<typeof getQuoteSchema>
