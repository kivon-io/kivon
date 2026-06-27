export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? "Kivon"
export const APP_LOGO_URL = process.env.NEXT_PUBLIC_APP_LOGO_URL
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://kivon.io"

export const TERMS_URL = `${APP_URL}/terms-of-use`
export const PRIVACY_URL = `${APP_URL}/privacy-policy`

export const FAQ_ITEMS = [
  {
    id: "speed",
    question: "How fast are trades on Kivon?",
    answer:
      "Trades execute instantly with minimal slippage. Cross-chain transactions between different chains finalize in less than 5 seconds.",
  },
  {
    id: "networks",
    question: "Which networks can I bridge to?",
    answer:
      "You can bridge from Celo to popular EVM networks such as Base, Ethereum, Polygon, Arbitrum, and Optimism. Available routes depend on Relay support for each chain.",
  },
  {
    id: "fees",
    question: "What fees apply?",
    answer:
      "Quotes include relayer fees. The exact receive amount is shown before you confirm a bridge.",
  },
  {
    id: "wallet",
    question: "Which wallet do I need?",
    answer:
      "Kivon MiniPay is built for MiniPay on Celo. Wallet is connected automatically, choose a destination network and token, then approve and confirm each step in your wallet.",
  },
] as const

export type ThemeOption = "light" | "dark" | "system"

export const THEME_OPTIONS: {
  value: ThemeOption
  label: string
  description: string
}[] = [
  { value: "light", label: "Light", description: "Always use light mode" },
  { value: "dark", label: "Dark", description: "Always use dark mode" },
  { value: "system", label: "Auto", description: "Match your device settings" },
]
