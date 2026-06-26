// Relay API domain types — mirrored from the main Kivon app so the
// minipay bridge speaks the same shapes. Declared globally for convenience.

type Token = {
  chainId: number
  symbol: string
  name: string
  address: string
  decimals: number
  metadata: {
    logoURI: string
    verified: boolean
    isNative: boolean
  }
}

type Chain = {
  id: number
  name: string
  displayName: string
  httpRpcUrl: string
  wsRpcUrl: string
  explorerUrl: string
  explorerName: string
  explorerPaths: {
    transaction: string
  }
  depositEnabled: boolean
  tokenSupport: string
  disabled: boolean
  partialDisableLimit: number
  blockProductionLagging: boolean
  currency: {
    id: string
    symbol: string
    name: string
    address: string
    decimals: number
    supportsBridging: boolean
  }
  withdrawalFee: number
  depositFee: number
  surgeEnabled: boolean
  featuredTokens: Token[]
  erc20Currencies: {
    id: string
    symbol: string
    name: string
    address: string
    decimals: number
    supportsBridging: boolean
  }[]
  solverCurrencies: {
    id: string
    symbol: string
    name: string
    address: string
    decimals: number
  }[]
  iconUrl: string
  logoUrl: string
  brandColor: string
  contracts: {
    multicall3: string
    multicaller: string
    onlyOwnerMulticaller: string
    relayReceiver: string
    erc20Router: string
  }
  vmType: string
  explorerQueryParams: Record<string, string>
  baseChainId: number
  statusMessage: string
  solverAddresses: string[]
  tags: string[]
  protocol: {
    v2: {
      chainId: string
      depository: string
    }
  }
}

type TransactionStepData = {
  from: string
  to: string
  data: string
  value: string
  gas: string
  maxFeePerGas: string
  maxPriorityFeePerGas: string
  chainId: number
}

type SignatureStepData = {
  signatureKind: "eip191" | "eip712"
} & (EIP191SignatureData | EIP712SignatureData)

type EIP191SignatureData = {
  signatureKind: "eip191"
  message: string
  post?: {
    endpoint: string
    method?: string
    headers?: Record<string, string>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body?: Record<string, any>
  }
}

type EIP712SignatureData = {
  signatureKind: "eip712"
  domain: {
    name: string
    version: string
    chainId: number
    verifyingContract: string
  }
  types: Record<string, Array<{ name: string; type: string }>>
  primaryType: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: Record<string, any>
  post?: {
    endpoint: string
    method?: string
    headers?: Record<string, string>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body?: Record<string, any>
  }
}

type StepItem = {
  status: string
  data: TransactionStepData | SignatureStepData
  check?: {
    endpoint: string
    method: string
  }
  post?: {
    endpoint: string
    method?: string
    headers?: Record<string, string>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body?: Record<string, any>
  }
}

type Step = {
  id: string
  action: string
  description: string
  kind: string
  requestId: string
  items: StepItem[]
}

type QuoteCurrencyAmount = {
  currency: {
    chainId: number
    address: string
    symbol: string
    name: string
    decimals: number
    metadata: {
      logoURI: string
      verified: boolean
      isNative: boolean
    }
  }
  amount: string
  amountFormatted: string
  amountUsd: string
  minimumAmount: string
}

type Quote = {
  steps: Step[]
  fees: {
    gas: QuoteCurrencyAmount
    relayer: QuoteCurrencyAmount
    relayerService: QuoteCurrencyAmount
    app: QuoteCurrencyAmount
  }
  details: {
    operation: string
    sender: string
    recipient: string
    currencyIn: QuoteCurrencyAmount
    currencyOut: QuoteCurrencyAmount
    currencyGasTopup: QuoteCurrencyAmount
    totalImpact: {
      usd: string
      percent: string
    }
    swapImpact: {
      usd: string
      percent: string
    }
    rate: string
    slippageTolerance: {
      origin: {
        usd: string
        value: string
        percent: string
      }
      destination: {
        usd: string
        value: string
        percent: string
      }
    }
    timeEstimate: number
    userBalance: string
    fallbackType: string
  }
  protocol: {
    v2: {
      orderId: string
      paymentDetails: {
        chainId: string
        depository: string
        currency: string
        amount: string
      }
    }
  }
}
