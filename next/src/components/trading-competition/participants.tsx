"use client"

import { formatAmount } from "@/lib/utils"
import { useDynamicWallet } from "@/lib/wallet/use-dynamic-wallet"
import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"
import Lines from "../decorations/lines"
import Address from "../elements/address"
import AddressAvatar from "../elements/address-avatar"
import Rank from "../elements/position-badge"
import { DataTable } from "../ui/data-table"

type RankedParticipant = Participant & { _rank: number; _isUser?: boolean }

const Participants = ({ participants }: { participants: Participant[] }) => {
  const { address, isConnected } = useDynamicWallet()

  // Build data such that:
  // - If the connected user exists in the list, pin them to the top
  // - Preserve everyone's original rank as `_rank` so displayed positions remain accurate
  const data: RankedParticipant[] = useMemo(() => {
    const withOriginalRanks: RankedParticipant[] = participants.map((participant, index) => ({
      ...participant,
      _rank: index + 1,
    }))

    if (!isConnected || !address) return withOriginalRanks

    const userIndex = participants.findIndex((p) => p.walletAddress === address)
    if (userIndex === -1) return withOriginalRanks

    const pinnedUser: RankedParticipant = {
      ...participants[userIndex],
      _rank: userIndex + 1,
      _isUser: true,
    }

    const othersPreservingRanks: RankedParticipant[] = participants
      .map((p, idx) => ({ ...p, _rank: idx + 1 }))
      .filter((_, idx) => idx !== userIndex)

    return [pinnedUser, ...othersPreservingRanks]
  }, [participants, isConnected, address])

  return (
    <div className='relative max-w-4xl w-full mx-auto overflow-hidden md:overflow-visible'>
      <h2 className='text-lg font-medium mb-2'>Participants</h2>
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
            <p className='text-sm font-medium font-barlow h-10 w-10 flex items-center justify-center bg-zinc-200 rounded-lg border border-zinc-300 dark:border-zinc-700'>
              {rank}
            </p>
          )}
          <div className='flex items-center gap-2'>
            <AddressAvatar address={address} className='w-8 h-8' />
            <Address className='font-semibold' address={address} />
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
      return <span>${formatAmount(tradingVolume.toString(), 0)}</span>
    },
  },
]
