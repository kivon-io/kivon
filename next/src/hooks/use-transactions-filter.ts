"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"

export interface TransactionFilterParams {
  address?: string
  search?: string
  fromChainId?: string
  toChainId?: string
  filterType?: "mine" | "all"
  page?: string
  perPage?: string
}

export const useTransactionsFilter = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const getCurrentParams = useCallback((): TransactionFilterParams => {
    return {
      address: searchParams.get("address") || undefined,
      search: searchParams.get("search") || undefined,
      fromChainId: searchParams.get("fromChainId") || undefined,
      toChainId: searchParams.get("toChainId") || undefined,
      filterType: (searchParams.get("filterType") as "mine" | "all") || undefined,
      page: searchParams.get("page") || undefined,
      perPage: searchParams.get("perPage") || undefined,
    }
  }, [searchParams])

  const updateFilterParams = useCallback(
    (params: Partial<TransactionFilterParams>) => {
      // Always base updates on the latest URL, not a stale searchParams snapshot
      const currentSearch = typeof window !== "undefined" ? window.location.search : ""
      const newSearchParams = new URLSearchParams(currentSearch)

      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          newSearchParams.set(key, value)
        } else {
          newSearchParams.delete(key)
        }
      })

      // Reset to first page when filters change (but not when only page/perPage changes)
      if (Object.keys(params).some((key) => key !== "page" && key !== "perPage")) {
        newSearchParams.delete("page")
      }

      const queryString = newSearchParams.toString()
      const newUrl = queryString
        ? `?${queryString}`
        : typeof window !== "undefined"
          ? window.location.pathname
          : ""

      router.replace(newUrl, { scroll: false })
    },
    [router]
  )

  const setAddress = useCallback(
    (address: string) => {
      updateFilterParams({ address: address === "all" ? undefined : address || undefined })
    },
    [updateFilterParams]
  )

  const setSearchQuery = useCallback(
    (search: string) => {
      updateFilterParams({ search: search === "" ? undefined : search || undefined })
    },
    [updateFilterParams]
  )

  const setFromChain = useCallback(
    (chainId: string) => {
      updateFilterParams({ fromChainId: chainId === "all" ? undefined : chainId || undefined })
    },
    [updateFilterParams]
  )

  const setToChain = useCallback(
    (chainId: string) => {
      updateFilterParams({ toChainId: chainId === "all" ? undefined : chainId || undefined })
    },
    [updateFilterParams]
  )

  const setFilterType = useCallback(
    (filterType: "mine" | "all") => {
      updateFilterParams({ filterType: filterType || undefined })
    },
    [updateFilterParams]
  )

  const setPage = useCallback(
    (page: number) => {
      updateFilterParams({ page: page.toString() })
    },
    [updateFilterParams]
  )

  const setPerPage = useCallback(
    (perPage: number) => {
      updateFilterParams({ perPage: perPage.toString() })
    },
    [updateFilterParams]
  )

  const clearAllFilters = useCallback(() => {
    updateFilterParams({
      address: undefined,
      search: undefined,
      fromChainId: undefined,
      toChainId: undefined,
      filterType: undefined,
      page: undefined,
    })
  }, [updateFilterParams])

  return {
    getCurrentParams,
    updateFilterParams,
    setAddress,
    setSearchQuery,
    setFromChain,
    setToChain,
    setFilterType,
    setPage,
    setPerPage,
    clearAllFilters,
  }
}
