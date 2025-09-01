"use client"

import { formatAddress, formatSmartBalance } from "@/lib/utils"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { BsCheckCircleFill } from "react-icons/bs"
import { HiArrowTopRightOnSquare } from "react-icons/hi2"
import { BlurImage } from "../blur-image"
import { Badge } from "../ui/badge"
import { DataTable } from "../ui/data-table"

const columns: ColumnDef<Transaction>[] = [
  {
    id: "from_currency",
    accessorKey: "from_currency",
    header: "From",
    cell: ({ row }) => {
      const { from_currency } = row.original

      return (
        <Link className='group' href={`/transactions/${row.original.external_transaction_id}`}>
          <div className='flex items-center gap-2 '>
            <div className='relative flex items-center gap-2'>
              {from_currency.currency_logo_uri && (
                <BlurImage
                  src={from_currency.currency_logo_uri}
                  alt={from_currency.currency_name}
                  className='object-contain object-center w-8 h-8 rounded-full shrink-0'
                  width={32}
                  height={32}
                />
              )}
              {from_currency.chain_logo_uri && (
                <div className='absolute -bottom-1 -right-1 bg-white dark:bg-neutral-950 border border-zinc-200 dark:border-zinc-700 rounded-full'>
                  <BlurImage
                    src={from_currency.chain_logo_uri}
                    alt={from_currency.chain_name}
                    className='object-cover object-center w-4 h-4 rounded-full'
                    width={16}
                    height={16}
                  />
                </div>
              )}
            </div>
            <div className='flex flex-col'>
              <p className='text-sm font-medium group-hover:underline'>
                {row.original.from_currency.currency_symbol}
              </p>
              <p className='text-xs text-zinc-500 dark:text-zinc-400 group-hover:underline'>
                {row.original.from_currency.currency_name}
              </p>
            </div>
          </div>
        </Link>
      )
    },
  },
  {
    id: "to_currency",
    accessorKey: "to_currency",
    header: "To",
    cell: ({ row }) => {
      const { to_currency } = row.original
      return (
        <Link className='group' href={`/transactions/${row.original.external_transaction_id}`}>
          <div className='flex items-center gap-2'>
            <div className='flex relative items-center gap-2'>
              {to_currency.currency_logo_uri && (
                <BlurImage
                  src={to_currency.currency_logo_uri}
                  alt={to_currency.currency_name}
                  className='object-contain object-center w-8 h-8 rounded-full shrink-0'
                  width={32}
                  height={32}
                />
              )}
              {to_currency.chain_logo_uri && (
                <div className='absolute -bottom-1 -right-1 bg-white dark:bg-neutral-950 border border-zinc-200 dark:border-zinc-700 rounded-full'>
                  <BlurImage
                    src={to_currency.chain_logo_uri}
                    alt={to_currency.chain_name}
                    className='object-cover object-center w-4 h-4 rounded-full'
                    width={16}
                    height={16}
                  />
                </div>
              )}
            </div>
            <div className='flex flex-col'>
              <p className='text-sm font-medium group-hover:underline'>
                {row.original.to_currency.currency_symbol}
              </p>
              <p className='text-xs text-zinc-500 dark:text-zinc-400 group-hover:underline'>
                {row.original.to_currency.currency_name}
              </p>
            </div>
          </div>
        </Link>
      )
    },
  },
  {
    id: "from_amount",
    accessorKey: "from_currency.amount_formatted",
    header: "From Amount",
    cell: ({ row }) => {
      const { from_currency } = row.original
      return (
        <div className='flex flex-col'>
          <p className='text-sm font-medium'>
            {formatSmartBalance(from_currency.amount_formatted)} {from_currency.currency_symbol}
          </p>
          <p className='text-xs text-zinc-500 dark:text-zinc-400'>${from_currency.amount_usd}</p>
        </div>
      )
    },
  },
  {
    id: "to_amount",
    accessorKey: "to_currency.amount_formatted",
    header: "To Amount",
    cell: ({ row }) => {
      const { to_currency } = row.original
      return (
        <div className='flex flex-col'>
          <p className='text-sm font-medium'>
            {formatSmartBalance(to_currency.amount_formatted)} {to_currency.currency_symbol}
          </p>
          <p className='text-xs text-zinc-500 dark:text-zinc-400'>${to_currency.amount_usd}</p>
        </div>
      )
    },
  },
  {
    id: "input_tx_hash",
    accessorKey: "input_tx_hash",
    header: "Source Tx",
    cell: ({ row }) => {
      return (
        <div className='flex items-center gap-1'>
          <Link
            className='flex items-center gap-1 text-xs text-secondary-custom hover:underline font-medium break-words'
            href={row.original.input_hash_explorer_url || ""}
            target='_blank'
            rel='noopener noreferrer'
          >
            {formatAddress(row.original.input_tx_hash || "")}
            <HiArrowTopRightOnSquare className='size-4' />
          </Link>
        </div>
      )
    },
  },
  {
    id: "output_tx_hash",
    accessorKey: "output_tx_hash",
    header: "Destination Tx",
    cell: ({ row }) => {
      return (
        <div className='flex flex-col'>
          <Link
            className='flex items-center gap-1 text-xs text-secondary-custom hover:underline font-medium break-words'
            href={row.original.output_hash_explorer_url || ""}
            target='_blank'
            rel='noopener noreferrer'
          >
            {formatAddress(row.original.output_tx_hash || "")}
            <HiArrowTopRightOnSquare className='size-4' />
          </Link>
        </div>
      )
    },
  },
  {
    id: "status",
    header: "Status",
    cell: () => {
      return (
        <Badge variant='outline' className='flex items-center'>
          <BsCheckCircleFill className='text-emerald-600 size-3' />
          Success
        </Badge>
      )
    },
  },
  {
    id: "time_estimate",
    accessorKey: "time_estimate",
    header: "Time",
    cell: ({ row }) => {
      return <p className='text-sm font-medium'>{row.original.time_estimate}s</p>
    },
  },
]

const TransactionsTable = ({ transactions }: { transactions: Transaction[] }) => {
  return <DataTable columns={columns} data={transactions} />
}

export default TransactionsTable
