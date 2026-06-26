"use client"

import { useQuery } from "@tanstack/react-query"
import { fetchChains } from "@/lib/relay/fetchers"
import { relayKeys } from "@/lib/relay/query-keys"

export function useChains() {
  return useQuery({
    queryKey: relayKeys.chains(),
    queryFn: fetchChains,
    // Supported chains change rarely — keep them around for the session.
    staleTime: 1000 * 60 * 60,
  })
}
