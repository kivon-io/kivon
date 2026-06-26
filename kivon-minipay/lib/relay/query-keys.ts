import type { GetQuoteInput, GetTokensInput } from "./schemas"

export const relayKeys = {
  all: ["relay"] as const,
  chains: () => [...relayKeys.all, "chains"] as const,
  tokens: (params: GetTokensInput) => [...relayKeys.all, "tokens", params] as const,
  quote: (params: GetQuoteInput) => [...relayKeys.all, "quote", params] as const,
}
