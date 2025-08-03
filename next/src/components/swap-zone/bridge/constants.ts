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
  slippage: z.number().optional(),
})

export type BridgeFormSchema = z.infer<typeof bridgeFormSchema>

export const POPULAR_CHAINS = ["arbitrum", "base", "ethereum", "solana"]

// Utility function to convert Token and Chain to BridgeFormSchema format
export const createBridgeTokenModel = (
  token: Token,
  chain: Chain
): BridgeFormSchema["origin"] | BridgeFormSchema["destination"] => {
  return {
    chainId: chain.baseChainId,
    chainName: chain.name,
    chainDisplayName: chain.displayName,
    chainSymbol: chain.currency.symbol,
    chainImage: chain.iconUrl,
    chainContractAddress: chain.currency.address,
    chainDecimals: chain.currency.decimals,
    chainSupportsBridging: chain.currency.supportsBridging,
    tokenName: token.name,
    tokenSymbol: token.symbol,
    tokenImage: token.metadata.logoURI,
    tokenContractAddress: token.address,
    tokenDecimals: token.decimals,
  }
}

// Bridge transaction stages
export const BRIDGE_STAGES = {
  SELECT_ASSET: "sa",
  TRANSACTION_INFORMATION: "ti",
} as const

export type BridgeStage = "sa" | "ti"

export const BRIDGE_STAGE_PARAM_KEY = "st"
