"use client"

import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { fetchQuote } from "@/lib/relay/fetchers"
import { relayKeys } from "@/lib/relay/query-keys"
import type { GetQuoteInput } from "@/lib/relay/schemas"

// Relay revalidates quotes at fill time, so a displayed quote goes stale fast.
// Refresh on an interval and never serve a cached one as "fresh".
const QUOTE_REFRESH_MS = 20_000

export function useQuote(params: GetQuoteInput | null, options?: { enabled?: boolean }) {
  const enabled = (options?.enabled ?? true) && Boolean(params)

  return useQuery({
    queryKey: relayKeys.quote(params ?? ({} as GetQuoteInput)),
    queryFn: () => fetchQuote(params as GetQuoteInput),
    enabled,
    // Keep the previous quote visible while refetching so amounts don't flash
    // to empty as the user edits inputs or the auto-refresh fires.
    placeholderData: keepPreviousData,
    staleTime: 0,
    // Auto-refresh so the on-screen quote stays current; pause in background.
    refetchInterval: enabled ? QUOTE_REFRESH_MS : false,
    refetchIntervalInBackground: false,
  })
}
