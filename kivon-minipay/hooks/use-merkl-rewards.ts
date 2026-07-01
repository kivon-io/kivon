"use client"

import { useQuery } from "@tanstack/react-query"

import { fetchRewards } from "@/lib/earn/fetchers"
import { earnKeys } from "@/lib/earn/query-keys"

export function useMerklRewards(address?: string) {
  return useQuery({
    queryKey: earnKeys.rewards(address),
    queryFn: () => fetchRewards(address!),
    enabled: Boolean(address),
    staleTime: 30_000,
    refetchInterval: 60_000,
  })
}
