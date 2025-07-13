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
