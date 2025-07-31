import z from "zod"

export const bridgeFormSchema = z.object({
  origin: z.object({
    chainId: z.number(),
    chainName: z.string(),
    chainDisplayName: z.string(),
    chainSymbol: z.string(),
    chainImage: z.string(),
    chainContractAddress: z.string(),
    chainDecimals: z.number(),
    chainSupportsBridging: z.boolean(),
    tokenName: z.string(),
    tokenSymbol: z.string(),
    tokenImage: z.string(),
    tokenContractAddress: z.string(),
    tokenDecimals: z.number(),
  }),
  destination: z.object({
    chainId: z.number(),
    chainName: z.string(),
    chainDisplayName: z.string(),
    chainSymbol: z.string(),
    chainImage: z.string(),
    chainContractAddress: z.string(),
    chainDecimals: z.number(),
    chainSupportsBridging: z.boolean(),
    tokenName: z.string(),
    tokenSymbol: z.string(),
    tokenImage: z.string(),
    tokenContractAddress: z.string(),
    tokenDecimals: z.number(),
  }),
  amount: z.number().min(0, { message: "send amount is required" }),
})

export type BridgeFormSchema = z.infer<typeof bridgeFormSchema>

export const POPULAR_CHAINS = ["arbitrum", "base", "ethereum", "solana"]
