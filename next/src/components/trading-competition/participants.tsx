"use client"

import { formatAmount } from "@/lib/utils"
import { ColumnDef } from "@tanstack/react-table"
import Lines from "../decorations/lines"
import Address from "../elements/address"
import { DataTable } from "../ui/data-table"

const Participants = ({ participants }: { participants: Participant[] }) => {
  return (
    <div className='relative max-w-4xl w-full mx-auto overflow-hidden md:overflow-visible'>
      <h2 className='text-lg font-medium mb-2'>Participants</h2>
      <DataTable columns={Columns} data={participants || []} />
      <Lines />
    </div>
  )
}

export default Participants

const Columns: ColumnDef<Participant>[] = [
  {
    header: "Rank",
    id: "rank",
    cell: ({ row }) => {
      const address = row.original.walletAddress
      return (
        <div className='flex items-center gap-3'>
          <div className='w-8 h-8 rounded-lg bg-zinc-200 border border-zinc-300 dark:border-zinc-700'></div>
          <Address address={address} />
        </div>
      )
    },
  },
  {
    header: "Volume",
    accessorKey: "tradingVolume",
    cell: ({ row }) => {
      const tradingVolume = row.original.tradingVolume
      return <span>${formatAmount(tradingVolume.toString(), 0)}</span>
    },
  },
]
