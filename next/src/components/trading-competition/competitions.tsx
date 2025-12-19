"use client"

import { formatAmount, formatDate } from "@/lib/utils"
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { ChevronRightIcon } from "lucide-react"
import { useTheme } from "next-themes"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { FlickeringGrid } from "../decorations/flickering-grid"
import Lines from "../decorations/lines"
import AddressAvatar from "../elements/address-avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  onRowClick?: (row: TData) => void
}

const Competitions = ({ competitions }: { competitions: Competition[] }) => {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])
  return (
    <div className='relative max-w-7xl mx-auto pb-10'>
      <div className='h-10 flex items-center justify-center relative overflow-hidden bg-zinc-100 dark:bg-zinc-900 w-full'>
        {mounted && (
          <FlickeringGrid
            className='absolute inset-0 h-full w-full'
            squareSize={1}
            gridGap={2}
            color={resolvedTheme === "dark" ? "#f0f0f0" : "#000000"}
            maxOpacity={0.5}
            flickerChance={0.1}
          />
        )}
      </div>
      <DataTable
        columns={Columns}
        data={competitions}
        onRowClick={(row) => router.push(`/trading-competition/${row.id}`)}
      />
      <Lines />
    </div>
  )
}

export default Competitions

const Columns: ColumnDef<Competition>[] = [
  {
    header: "Title",
    accessorKey: "title",
    cell: ({ row }) => {
      const title = row.original.title
      const image = row.original.image
      const description = row.original.description
      return (
        <div className='flex gap-2'>
          <div className='w-20 h-12 relative rounded-md overflow-hidden bg-zinc-200'>
            {image && (
              <Image
                src={image}
                alt={row.original.title}
                fill
                className='w-full h-full object-cover'
              />
            )}
          </div>
          <div className='flex flex-col max-w-sm w-full'>
            <p className='text-sm font-medium'>{title}</p>
            <p className=' whitespace-pre-wrap truncate text-sm text-zinc-500 line-clamp-2'>
              {description}
            </p>
          </div>
        </div>
      )
    },
  },
  {
    header: "Prize Amount",
    accessorKey: "prizeAmount",
    cell: ({ row }) => {
      const prizeAmount = row.original.prizeAmount
      return <span>${formatAmount(prizeAmount.toString())}</span>
    },
  },
  {
    header: "Currencies",
    id: "currencies",
    cell: ({ row }) => {
      const originNetwork = row.original.originChain
      const originCurrency = row.original.originCurrency
      const destinationNetwork = row.original.destinationChain
      const destinationCurrency = row.original.destinationCurrency

      return (
        <div className='flex items-center gap-2'>
          <div className='flex gap-2 items-center'>
            <div className='relative h-8 w-8'>
              <Image
                src={originCurrency.currencyLogoUri}
                alt={originCurrency.currencyName}
                fill
                className='rounded-full'
              />
              <div className='absolute -bottom-1 right-0'>
                <Image
                  src={originNetwork.chainLogoUri}
                  alt={originNetwork.chainName}
                  width={20}
                  height={20}
                  className='rounded-full'
                />
              </div>
            </div>
            <div className='flex flex-col'>
              <p className='text-sm'>{originCurrency.currencyName}</p>
              <p className='text-xs text-zinc-500'>{originNetwork.chainName}</p>
            </div>
          </div>
          <ChevronRightIcon className='size-4' />
          <div className='flex gap-2 items-center'>
            <div className='relative h-8 w-8'>
              <Image
                src={destinationCurrency.currencyLogoUri}
                alt={destinationCurrency.currencyName}
                fill
                className='rounded-full'
              />
              <div className='absolute -bottom-1 right-0'>
                <Image
                  src={destinationNetwork.chainLogoUri}
                  alt={destinationNetwork.chainName}
                  width={20}
                  height={20}
                  className='rounded-full'
                />
              </div>
            </div>
            <div className='flex flex-col'>
              <p className='text-sm'>{destinationCurrency.currencyName}</p>
              <p className='text-xs text-zinc-500'>{destinationNetwork.chainName}</p>
            </div>
          </div>
        </div>
      )
    },
  },
  {
    header: "Participants",
    id: "participants",
    cell: ({ row }) => {
      const participants = row.original.participants
      return (
        <div className='flex -space-x-4'>
          {participants.slice(0, 3).map((participant, index) => (
            <div
              key={index}
              className='w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500/20 to-emerald-700/20 border border-zinc-300 dark:border-zinc-700'
            >
              <AddressAvatar address={participant.walletAddress} className='w-8 h-8' />
            </div>
          ))}
          {participants.length > 3 && (
            <div className='w-8 h-8 rounded-full bg-gradient-to-r from-secondary-custom to-blue-800 border border-zinc-300 text-white dark:border-zinc-700 items-center justify-center flex'>
              <p className='text-sm font-medium font-barlow'>+{participants.length - 3}</p>
            </div>
          )}
        </div>
      )
    },
  },
  {
    header: "Start Date",
    accessorKey: "startDate",
    cell: ({ row }) => {
      const startDate = row.original.startDate
      return <span>{formatDate(startDate)}</span>
    },
  },
  {
    header: "End Date",
    accessorKey: "endDate",
    cell: ({ row }) => {
      const endDate = row.original.endDate
      return <span>{formatDate(endDate)}</span>
    },
  },
]

function DataTable<TData, TValue>({ columns, data, onRowClick }: DataTableProps<TData, TValue>) {
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
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                className='cursor-pointer'
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                onClick={() => onRowClick?.(row.original as TData)}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell className='py-5' key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
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
