"use client"

import { cn, formatAmount } from "@/lib/utils"
import { useDynamicWallet } from "@/lib/wallet/use-dynamic-wallet"
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { useMemo } from "react"
import Lines from "../decorations/lines"
import Address from "../elements/address"
import AddressAvatar from "../elements/address-avatar"
import Rank from "../elements/position-badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"

type RankedParticipant = Participant & {
  _rank: number
  _isUser?: boolean
  _estimatedPrize?: { amount: number; description: string } | null
}

const Participants = ({
  participants,
  prizeStructures,
}: {
  participants: Participant[]
  prizeStructures: PrizeStructure[]
}) => {
  const { address, isConnected } = useDynamicWallet()

  // Build data such that:
  // - If the connected user exists in the list, pin them to the top
  // - Preserve everyone's original rank as `_rank` so displayed positions remain accurate
  const data: RankedParticipant[] = useMemo(() => {
    const prizeForRank = (rank: number) => {
      const prize = prizeStructures.find((p) => p.position === rank)
      return prize ? { amount: prize.prizeAmount, description: prize.description } : null
    }

    const withOriginalRanks: RankedParticipant[] = participants.map((participant, index) => ({
      ...participant,
      _rank: index + 1,
      _estimatedPrize: prizeForRank(index + 1),
    }))

    if (!isConnected || !address) return withOriginalRanks

    const userIndex = participants.findIndex((p) => p.walletAddress === address)
    if (userIndex === -1) return withOriginalRanks

    const pinnedUser: RankedParticipant = {
      ...participants[userIndex],
      _rank: userIndex + 1,
      _isUser: true,
      _estimatedPrize: prizeForRank(userIndex + 1),
    }

    const othersPreservingRanks: RankedParticipant[] = participants
      .map((p, idx) => ({ ...p, _rank: idx + 1, _estimatedPrize: prizeForRank(idx + 1) }))
      .filter((_, idx) => idx !== userIndex)

    return [pinnedUser, ...othersPreservingRanks]
  }, [participants, isConnected, address, prizeStructures])

  return (
    <div className='relative max-w-4xl w-full mx-auto overflow-hidden md:overflow-visible'>
      <h2 className='text-lg font-medium mb-2'>Leaderboard</h2>
      <DataTable columns={Columns} data={data} />
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
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className='overflow-hidden rounded-md border'>
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
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => {
              const rank = (row.original as { _rank?: number })._rank
              return (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={cn(
                    rank === 1 && "bg-gradient-to-r from-emerald-500/50 to-emerald-700/50",
                    rank === 2 && "bg-gradient-to-r from-blue-500/50 to-blue-700/50",
                    rank === 3 && "bg-gradient-to-r from-yellow-500/50 to-yellow-700/50"
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
