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
    tokenIsNative: z.boolean(),
    vmType: z.string(),
    explorerUrl: z.string().optional(),
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
    tokenIsNative: z.boolean(),
    vmType: z.string(),
    explorerUrl: z.string().optional(),
  }),
  amount: z.number().min(0, { message: "send amount is required" }),
  recipient: z.string().optional(),
  isRecipientAddressValid: z.boolean().optional(),
  slippage: z.number().optional(),
})

export type BridgeFormSchema = z.infer<typeof bridgeFormSchema>

export const POPULAR_CHAINS = ["arbitrum", "base", "ethereum", "solana", "hedera"]

// Utility function to convert Token and Chain to BridgeFormSchema format
export const createBridgeTokenModel = (
  token: Token,
  chain: Chain
): BridgeFormSchema["origin"] | BridgeFormSchema["destination"] => {
  return {
    chainId: chain.id,
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
    tokenIsNative:
      token.metadata.isNative || token.address === "0x0000000000000000000000000000000000000000",
    vmType: chain.vmType,
    explorerUrl: chain.explorerUrl,
  }
}

// Bridge transaction stages
export const BRIDGE_STAGES = {
  SELECT_ASSET: "sa",
  TRANSACTION_INFORMATION: "ti",
} as const

export type BridgeStage = "sa" | "ti"

export const BRIDGE_STAGE_PARAM_KEY = "st"
// Available options: bvm, evm, svm, tvm, tonvm, suivm, hypevm
export const VM_TYPES = {
  BVM: "bvm",
  EVM: "evm",
  SVM: "svm",
  TVM: "tvm",
  TONVM: "tonvm",
  SUIVM: "suivm",
  HYPEVM: "hypevm",
} as const
