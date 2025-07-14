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
