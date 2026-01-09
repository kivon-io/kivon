"use client"

import { cn, formatAmount } from "@/lib/utils"
import { useDynamicWallet } from "@/lib/wallet/use-dynamic-wallet"
import { trpc } from "@/trpc/client"
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useMemo, useState } from "react"
import { PiUsersThreeBold } from "react-icons/pi"
import Lines from "../decorations/lines"
import Address from "../elements/address"
import AddressAvatar from "../elements/address-avatar"
import Rank from "../elements/position-badge"
import { Button } from "../ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"

type RankedParticipant = Participant & {
  _rank: number
  _isUser?: boolean
  _estimatedPrize?: { amount: number; description: string } | null
}

const Participants = ({
  competitionId,
  prizeStructures,
  initialParticipants,
  initialPagination,
}: {
  competitionId: string
  prizeStructures: PrizeStructure[]
  initialParticipants?: Participant[]
  initialPagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNextPage: boolean
    hasPreviousPage: boolean
  }
}) => {
  const { address, isConnected } = useDynamicWallet()
  const [page, setPage] = useState(1)
  const limit = 100

  const { data: participantsData, isLoading } = trpc.getParticipants.useQuery(
    { id: competitionId, page, limit },
    {
      initialData:
        page === 1 && initialParticipants && initialPagination
          ? {
              data: initialParticipants,
              pagination: initialPagination,
            }
          : undefined,
    }
  )

  const participants = useMemo(() => participantsData?.data || [], [participantsData?.data])
  const pagination = participantsData?.pagination

  // Build ranked data such that:
  // - If the connected user exists in the list, pin them to the top
  // - Preserve everyone's original rank as `_rank` so displayed positions remain accurate
  // - Calculate actual rank based on page and position
  const rankedData: RankedParticipant[] = useMemo(() => {
    const prizeForRank = (rank: number) => {
      const prize = prizeStructures.find((p) => p.position === rank)
      return prize ? { amount: prize.prizeAmount, description: prize.description } : null
    }

    // Calculate actual rank: (page - 1) * limit + index + 1
    const withOriginalRanks: RankedParticipant[] = participants.map((participant, index) => {
      const actualRank = (page - 1) * limit + index + 1
      return {
        ...participant,
        _rank: actualRank,
        _estimatedPrize: prizeForRank(actualRank),
      }
    })

    if (!isConnected || !address) return withOriginalRanks

    const userIndex = participants.findIndex((p) => p.walletAddress === address)
    if (userIndex === -1) return withOriginalRanks

    const actualRank = (page - 1) * limit + userIndex + 1
    const pinnedUser: RankedParticipant = {
      ...participants[userIndex],
      _rank: actualRank,
      _isUser: true,
      _estimatedPrize: prizeForRank(actualRank),
    }

    const othersPreservingRanks: RankedParticipant[] = participants
      .map((p, idx) => {
        const rank = (page - 1) * limit + idx + 1
        return { ...p, _rank: rank, _estimatedPrize: prizeForRank(rank) }
      })
      .filter((_, idx) => idx !== userIndex)

    return [pinnedUser, ...othersPreservingRanks]
  }, [participants, isConnected, address, prizeStructures, page, limit])

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  return (
    <div className='relative max-w-4xl w-full mx-auto overflow-hidden md:overflow-visible'>
      <div className='flex items-center justify-between'>
        <h2 className='text-lg font-medium mb-2'>Leaderboard</h2>
        <div className='flex items-center gap-2 pr-2'>
          <PiUsersThreeBold className='size-4 text-foreground' />
          <p className='text-sm text-foreground font-medium font-barlow'>
            {pagination?.total || participants.length}
          </p>
        </div>
      </div>
      <DataTable columns={Columns} data={rankedData} isLoading={isLoading} />
      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className='flex items-center justify-end my-4 md:mr-2'>
          <div className='flex items-center space-x-2'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => handlePageChange(page - 1)}
              disabled={!pagination.hasPreviousPage || isLoading}
              className='cursor-pointer'
            >
              <ChevronLeft className='h-4 w-4' />
              <p className='hidden md:block'>Previous</p>
            </Button>

            <div className='flex items-center space-x-1'>
              {(() => {
                const totalPages = pagination.totalPages
                const currentPage = page
                const pagesToShow: number[] = []

                if (totalPages <= 7) {
                  // Show all pages if 7 or fewer
                  for (let i = 1; i <= totalPages; i++) {
                    pagesToShow.push(i)
                  }
                } else {
                  // Always show first page
                  pagesToShow.push(1)

                  if (currentPage <= 4) {
                    // Near the start: show 1, 2, 3, 4, 5, ..., last
                    for (let i = 2; i <= 5; i++) {
                      pagesToShow.push(i)
                    }
                    pagesToShow.push(-1) // Ellipsis marker
                  } else if (currentPage >= totalPages - 3) {
                    // Near the end: show 1, ..., last-4, last-3, last-2, last-1, last
                    pagesToShow.push(-1) // Ellipsis marker
                    for (let i = totalPages - 4; i <= totalPages; i++) {
                      pagesToShow.push(i)
                    }
                  } else {
                    // In the middle: show 1, ..., current-1, current, current+1, ..., last
                    pagesToShow.push(-1) // Ellipsis marker
                    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                      pagesToShow.push(i)
                    }
                    pagesToShow.push(-1) // Ellipsis marker
                  }

                  // Always show last page if not already included
                  if (!pagesToShow.includes(totalPages)) {
                    pagesToShow.push(totalPages)
                  }
                }

                return pagesToShow.map((pageNum, idx) => {
                  if (pageNum === -1) {
                    return (
                      <span key={`ellipsis-${idx}`} className='px-2'>
                        ...
                      </span>
                    )
                  }
                  return (
                    <Button
                      key={pageNum}
                      variant={pageNum === page ? "default" : "outline"}
                      size='sm'
                      onClick={() => handlePageChange(pageNum)}
                      disabled={isLoading}
                      className='w-8 h-8 p-0 cursor-pointer'
                    >
                      {pageNum}
                    </Button>
                  )
                })
              })()}
            </div>

            <Button
              variant='outline'
              size='sm'
              onClick={() => handlePageChange(page + 1)}
              disabled={!pagination.hasNextPage || isLoading}
              className='cursor-pointer'
            >
              <p className='hidden md:block'>Next</p>
              <ChevronRight className='h-4 w-4' />
            </Button>
          </div>
        </div>
      )}
      <Lines />
    </div>
  )
}

export default Participants

const Columns: ColumnDef<RankedParticipant>[] = [
  {
    header: "User",
    id: "user",
    cell: ({ row }) => {
      const address = row.original.walletAddress
      const rank = row.original._rank ?? row.index + 1
      return (
        <div className='flex items-center gap-2'>
          {rank < 4 ? (
            <Rank className='font-barlow' rank={rank} />
          ) : (
            <p className='text-sm text-zinc-900 dark:text-white font-medium font-barlow h-10 w-10 flex items-center justify-center bg-zinc-200 dark:bg-zinc-900 rounded-lg border border-zinc-300 dark:border-zinc-700'>
              {rank}
            </p>
          )}
          <div className='flex items-center gap-2'>
            <AddressAvatar address={address} className='w-8 h-8' />
            <Address
              className='font-semibold font-barlow text-zinc-900 dark:text-white'
              address={address}
            />
          </div>
        </div>
      )
    },
  },
  {
    header: "Trading Volume",
    accessorKey: "tradingVolume",
    cell: ({ row }) => {
      const tradingVolume = row.original.tradingVolume
      return (
        <span className='font-semibold font-barlow'>
          ${formatAmount(tradingVolume.toString(), 0)}
        </span>
      )
    },
  },
  {
    header: "Est. Prize",
    id: "estPrize",
    cell: ({ row }) => {
      const prize = row.original._estimatedPrize
      if (!prize) return null
      return (
        <div className='flex items-center gap-2'>
          <p className='font-semibold font-barlow'>${formatAmount(prize.amount.toString(), 0)}</p>
        </div>
      )
    },
  },
]

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isLoading?: boolean
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className='overflow-hidden border'>
      <Table>
        <TableHeader className='bg-muted'>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className='bg-white dark:bg-zinc-900'>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={columns.length} className='h-24 text-center'>
                Loading...
              </TableCell>
            </TableRow>
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => {
              const rank = (row.original as { _rank?: number })._rank
              return (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={cn(
                    rank === 1 && "bg-gradient-to-r from-emerald-500/20 to-emerald-700/20",
                    rank === 2 && "bg-gradient-to-r from-blue-500/20 to-blue-700/20",
                    rank === 3 && "bg-gradient-to-r from-yellow-500/20 to-yellow-700/20"
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className='py-5' key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              )
            })
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className='h-24 text-center'>
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
