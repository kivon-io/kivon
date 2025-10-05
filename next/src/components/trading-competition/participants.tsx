"use client"

import { ColumnDef } from "@tanstack/react-table"
import Lines from "../decorations/lines"
import Address from "../elements/address"
import { DataTable } from "../ui/data-table"

type Participant = {
  address: string
  volume: string
}

const participants: Participant[] = [
  {
    address: "0x1234567890123456789012345678901234567890",
    volume: "1000",
  },
]

const Participants = () => {
  return (
    <div className='relative max-w-4xl w-full mx-auto'>
      <DataTable columns={Columns} data={participants} />
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
      const address = row.original.address
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
    accessorKey: "volume",
  },
]
