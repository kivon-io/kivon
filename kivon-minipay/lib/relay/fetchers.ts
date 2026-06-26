import { api } from "@/lib/api"
import type { GetQuoteInput, GetTokensInput } from "./schemas"

/**
 * Plain fetchers against our own API routes. Shared by the React Query data
 * hooks and by the execution hook (which re-fetches a fresh quote at fill
 * time), so there's a single definition of how we talk to each route.
 */

export async function fetchChains() {
  const { data } = await api.get<Chain[]>("/chains")
  return data
}

export async function fetchTokens(params: GetTokensInput) {
  const { data } = await api.post<Token[]>("/tokens", params)
  return data
}

export async function fetchQuote(params: GetQuoteInput) {
  const { data } = await api.post<Quote>("/quote", params)
  return data
}
