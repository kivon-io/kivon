"use client"

import { useQuery } from "@tanstack/react-query"
import { fetchTokens } from "@/lib/relay/fetchers"
import { relayKeys } from "@/lib/relay/query-keys"
import type { GetTokensInput } from "@/lib/relay/schemas"

export function useTokens(params: GetTokensInput, options?: { enabled?: boolean }) {
  const hasQuery = Boolean(params.chainId || params.term || params.address)

  return useQuery({
    queryKey: relayKeys.tokens(params),
    queryFn: () => fetchTokens(params),
    enabled: (options?.enabled ?? true) && hasQuery,
  })
}
