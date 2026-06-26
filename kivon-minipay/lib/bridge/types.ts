/** Selected origin/destination asset for the bridge form. */
export type BridgeAsset = {
  chainId: number
  chainName: string
  chainDisplayName: string
  chainImage: string
  tokenName: string
  tokenSymbol: string
  tokenImage: string
  tokenAddress: string
  tokenDecimals: number
  tokenIsNative: boolean
  vmType: string
}

export type SelectionDrawerStep = "network" | "token"
