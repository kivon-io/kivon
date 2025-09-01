"use client"

import { Heading } from "@/components/elements/heading"
import Section from "@/components/section"
import TransactionsTable from "@/components/transactions"
import { StatsCard } from "@/components/transactions/details"
import { FilterHeader } from "@/components/transactions/transactions-filter"
import { useTransactionsFilter } from "@/hooks/use-transactions-filter"
import { formatSmartBalance } from "@/lib/utils"
import { trpc } from "@/trpc/client"
import { useMemo } from "react"

export default function TransactionsPage() {
  const { getCurrentParams } = useTransactionsFilter()

  // Get filter parameters from URL
  const filterParams = getCurrentParams()

  // Parse and prepare query parameters
  const queryParams = useMemo(() => {
    const params: {
      page: number
      per_page: number
      user_address?: string
      search?: string
      from_chain_id?: number
      to_chain_id?: number
      filter_type?: string
    } = {
      page: parseInt(filterParams.page || "1"),
      per_page: parseInt(filterParams.perPage || "20"),
    }

    if (filterParams.address) {
      params.user_address = filterParams.address
    }

    if (filterParams.search) {
      // For search, we'll need to implement a search endpoint or filter client-side
      // For now, we'll pass it as a search parameter
      params.search = filterParams.search
    }

    if (filterParams.fromChainId) {
      params.from_chain_id = parseInt(filterParams.fromChainId)
    }

    if (filterParams.toChainId) {
      params.to_chain_id = parseInt(filterParams.toChainId)
    }

    // If filterType is "mine" and we have a wallet address, filter by user_address
    if (filterParams.filterType === "mine") {
      // Note: This would need to be implemented with actual wallet connection
      // For now, we'll just pass the filter type
      params.filter_type = "mine"
    }

    return params
  }, [filterParams])

  const { data, isPending, error } = trpc.getTransactions.useQuery(queryParams)
  const { data: stats } = trpc.getTransactionStats.useQuery()
  const { data: chains } = trpc.getChains.useQuery()

  if (error) {
    return (
      <Section className='max-w-7xl mx-auto py-20'>
        <div className='flex items-center justify-center h-64'>
          <div className='text-lg text-red-600'>An Error Occurred</div>
        </div>
      </Section>
    )
  }

  return (
    <Section className='max-w-7xl mx-auto py-20'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-2 mb-10'>
        <StatsCard title={`Total Tx`} value={stats?.total_transactions.toString() || "0"} />
        <StatsCard
          title={`Total Volume`}
          value={`$${formatSmartBalance(stats?.total_volume_usd || 0)}`}
        />
        <StatsCard title={`Total Users`} value={stats?.total_users.toString() || "0"} />
      </div>

      <div className='flex flex-col gap-2 overflow-hidden'>
        <Heading className='text-left text-lg md:text-xl w-fit ml-0'>Transactions</Heading>
        <FilterHeader chains={chains || []} />
        <TransactionsTable
          transactions={data?.transactions || []}
          isLoading={isPending}
          currentPage={queryParams.page || 1}
          totalPages={data?.total_pages || 1}
        />
      </div>
    </Section>
  )
}
