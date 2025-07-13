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
