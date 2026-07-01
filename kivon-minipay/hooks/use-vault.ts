"use client"

import { useQuery } from "@tanstack/react-query"

import { fetchVault } from "@/lib/earn/fetchers"
import { earnKeys } from "@/lib/earn/query-keys"

export function useVault() {
  return useQuery({
    queryKey: earnKeys.vault(),
    queryFn: fetchVault,
    staleTime: 60_000,
    refetchInterval: 60_000,
  })
}
