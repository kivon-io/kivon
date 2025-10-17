type Article = {
  id: number
  title: string
  description: string
  slug: string
  image: ImageType
  createdAt: string
  categories: Category[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contents: any
  content: string
}

type Category = {
  id: number
  name: string
}

type NavbarItem = {
  href: never
  children: ReactNode
  active?: boolean
  className?: string
  target?: string
}

type Currency = {
  ticker: string
  name: string
  image: string
  hasExternalId: boolean
  isExtraIdSupported: boolean
  isFiat: boolean
  featured: boolean
  isStable: boolean
  supportsFixedRate: boolean
  network: string
  tokenContract: string | null
  buy: boolean
  sell: boolean
  legacyTicker: string
}

type MinExchangeAmountResponse = {
  fromCurrency: string
  fromNetwork: string
  toCurrency: string
  toNetwork: string
  flow: string
  minAmount: number
}

type EstimatedExchangeAmountResponse = {
  fromCurrency: string
  fromNetwork: string
  toCurrency: string
  toNetwork: string
  flow: string
  type: string
  rateId: string | null
  validUntil: string | null
  transactionSpeedForecast: string | null
  warningMessage: string | null
  depositFee: number
  withdrawalFee: number
  userId: string | null
  fromAmount: number
  toAmount: number
}

type ExchangeTransactionResponse = {
  fromAmount: number
  toAmount: number
  flow: string
  type: string
  payinAddress: string
  payoutAddress: string
  fromCurrency: string
  toCurrency: string
  refundAddress: string
  id: string
  fromNetwork: string
  toNetwork: string
}

type ExchangeStatus =
  | "new"
  | "waiting"
  | "confirming"
  | "exchanging"
  | "sending"
  | "finished"
  | "failed"
  | "refunded"
  | "verifying"

type ExchangeStatusResponse = {
  id: string
  status: ExchangeStatus
  actionsAvailable: boolean
  fromCurrency: string
  fromNetwork: string
  toCurrency: string
  toNetwork: string
  expectedAmountFrom: number | null
  expectedAmountTo: number | null
  amountFrom: number | null
  amountTo: number | null
  payinAddress: string
  payoutAddress: string
  payinExtraId: string | null
  payoutExtraId: string | null
  refundAddress: string | null
  refundExtraId: string | null
  createdAt: string
  updatedAt: string
  depositReceivedAt: string | null
  payinHash: string | null
  payoutHash: string | null
  fromLegacyTicker: string
  toLegacyTicker: string
  refundHash: string | null
  refundAmount: number | null
  userId: string | null
  validUntil: string | null
  relatedExchangesInfo: string | null
  repeatedExchangesInfo: string | null
  orginalExchangeInfo: string | null
}

type TokenInfoResponse = {
  ticker: string
  name: string
  image: string
  warnings: {
    to: string
    from: string
  }
  hasExternalId: boolean
  isFiat: boolean
  isAnonymous: boolean
  wallets: {
    primary: {
      name: string
      url: string
      imageUrl: string
      platforms: {
        android: boolean
        ios: boolean
        linux: boolean
        chromeos: boolean
        windows: boolean
        macos: boolean
        web: boolean
      }
      properties: {
        anonymity: string
        security: string
        weight: string
      }
      multi: boolean
    }[]
    secondary: {
      name: string
      url: string
      imageUrl: string
      platforms: {
        android: boolean
        ios: boolean
        linux: boolean
        chromeos: boolean
        windows: boolean
        macos: boolean
        web: boolean
      }
      properties: {
        anonymity: string
        security: string
        weight: string
      }
      multi: boolean
    }[]
  }
  addressExplorerMask: string
  transactionExplorerMask: string
}

type LinkItem = {
  id: number
  text: string
  URL: string
  target?: string
}

type AvailablePairsResponse = {
  fromCurrency: string
  fromNetwork: string
  toCurrency: string
  toNetwork: string
  flow: {
    standard: boolean
    "fixed-rate": boolean
  }
}

type Wallet = {
  name: string
  url: string
  imageUrl: string
  platforms: {
    android: boolean
    ios: boolean
    linux: boolean
    chromeos: boolean
    windows: boolean
    macos: boolean
    web: boolean
  }
  properties: {
    anonymity: string
    security: string
    weight: string
  }
  multi: boolean
}

type ImageType = {
  alternativeText: string
  url: string
  id: number
  name: string
}

type Seo = {
  metaTitle: string
  metaDescription: string
  keywords: string
  ogTitle: string
  ogDescription: string
  metaImage: { url: string }
  twitterCard: string
  twitterTitle: string
  twitterDescription: string
  twitterImage: string
}

type Token = {
  id: number
  chainId: number
  symbol: string
  name: string
  address: string
  decimals: number
  supportsBridging: boolean
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

type Step = {
  id: string
  action: string
  description: string
  kind: string
  requestId: string
  items: StepItem[]
}

type Quote = {
  steps: Step[]
  fees: {
    gas: {
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
    relayer: {
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
    relayerService: {
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
    app: {
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
  }
  details: {
    operation: string
    sender: string
    recipient: string
    currencyIn: {
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
    currencyOut: {
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
    currencyGasTopup: {
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

type Transaction = {
  id: string
  transaction_type: string
  user_address: string
  from_amount: string
  to_amount: string
  from_amount_usd: string
  to_amount_usd: string
  exchange_rate: string | null
  sender_address: string
  recipient_address: string
  input_tx_hash: string | null
  output_tx_hash: string | null
  input_hash_explorer_url: string | null
  output_hash_explorer_url: string | null
  external_transaction_id: string
  completed_at: string | null
  time_estimate: string | null
  from_currency: {
    currency_role: string
    chain_id: number
    chain_name: string
    chain_symbol: string
    chain_logo_uri: string
    currency_address: string
    currency_symbol: string
    currency_name: string
    currency_logo_uri: string
    decimals: number
    is_native: boolean
    amount: string
    amount_formatted: string
    amount_usd: string
  }
  to_currency: {
    currency_role: string
    chain_id: number
    chain_name: string
    chain_symbol: string
    chain_logo_uri: string
    currency_address: string
    currency_symbol: string
    currency_name: string
    currency_logo_uri: string
    decimals: number
    is_native: boolean
    amount: string
    amount_formatted: string
    amount_usd: string
  }
}

type TransactionResponse = {
  transactions: Transaction[]
  total: number
  page: number
  per_page: number
  total_pages: number
  has_next: boolean
  has_prev: boolean
}

type TransactionStats = {
  total_transactions: number
  total_volume: number
  total_volume_usd: number
  total_fees: number
  total_fees_usd: number
  total_users: number
}

type ResponseChain = {
  chainId: string
  chainName: string
  chainSymbol: string
  chainLogoUri: string
  chainAddress: string
}

type CompetitionCurrency = {
  currencyName: string
  currencySymbol: string
  currencyAddress: string
  currencyId: string
  currencyLogoUri: string
}

type PrizeStructure = {
  id: string
  position: number
  prizeAmount: number
  description: string
}

type Competition = {
  id: string
  title: string
  description: string
  image: string
  startDate: string
  endDate: string
  originChain: ResponseChain
  destinationChain: ResponseChain
  originCurrency: CompetitionCurrency
  destinationCurrency: CompetitionCurrency
  prizeStructures: PrizeStructure[]
  participants: Participant[]
  participantsCount: number
  winnersCount: number
  createdAt: string
  updatedAt: string
  prizeAmount: number
  minimumVolumeRequired: number
  enableNetworkToNetworkTrading: boolean
}

type Participant = {
  id: string
  userId: string
  username: string
  walletAddress: string
  tradingVolume: number
  joinedAt: string
}

type User = {
  id: string
  username: string
  walletAddress: string
  points: number
  createdAt: string
  updatedAt: string
}
