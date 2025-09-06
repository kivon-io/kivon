"use client"

import { useTransactionsFilter } from "@/hooks/use-transactions-filter"
import { TRANSACTION_TYPE } from "@/lib/shared/constants"
import { cn, formatAddress, formatSmartBalance } from "@/lib/utils"
import { ColumnDef } from "@tanstack/react-table"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { BsCheckCircleFill } from "react-icons/bs"
import { HiArrowTopRightOnSquare } from "react-icons/hi2"
import { BlurImage } from "../blur-image"
import Loader from "../loader"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
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
          <div className='flex items-center gap-2 shrink-0 min-w-[100px]'>
            <div className='relative flex items-center gap-2 shrink-0'>
              {from_currency.currency_logo_uri && (
                <BlurImage
                  src={from_currency.currency_logo_uri}
                  alt={from_currency.currency_name}
                  className={cn(
                    "object-contain object-center w-8 h-8 shrink-0",
                    row.original.transaction_type === TRANSACTION_TYPE.BRIDGE && "rounded-full"
                  )}
                  width={32}
                  height={32}
                />
              )}
              {from_currency.chain_logo_uri &&
                row.original.transaction_type === TRANSACTION_TYPE.BRIDGE && (
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
          <div className='flex items-center gap-2 shrink-0 min-w-[100px]'>
            <div className='flex relative items-center gap-2 shrink-0'>
              {to_currency.currency_logo_uri && (
                <BlurImage
                  src={to_currency.currency_logo_uri}
                  alt={to_currency.currency_name}
                  className={cn(
                    "object-contain object-center w-8 h-8 shrink-0",
                    row.original.transaction_type === TRANSACTION_TYPE.BRIDGE && "rounded-full"
                  )}
                  width={32}
                  height={32}
                />
              )}
              {to_currency.chain_logo_uri &&
                row.original.transaction_type === TRANSACTION_TYPE.BRIDGE && (
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
          <AmountUsd amount={from_currency.amount_usd} />
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
          <AmountUsd amount={to_currency.amount_usd} />
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
          {row.original.input_tx_hash ? (
            <Link
              className='flex items-center gap-1 text-xs text-secondary-custom hover:underline font-medium break-words'
              href={row.original.input_hash_explorer_url || ""}
              target='_blank'
              rel='noopener noreferrer'
            >
              {formatAddress(row.original.input_tx_hash || "")}
              <HiArrowTopRightOnSquare className='size-4' />
            </Link>
          ) : (
            <p className='text-xs text-zinc-500 dark:text-zinc-400'>-</p>
          )}
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
          {row.original.output_tx_hash ? (
            <Link
              className='flex items-center gap-1 text-xs text-secondary-custom hover:underline font-medium break-words'
              href={row.original.output_hash_explorer_url || ""}
              target='_blank'
              rel='noopener noreferrer'
            >
              {formatAddress(row.original.output_tx_hash || "")}
              <HiArrowTopRightOnSquare className='size-4' />
            </Link>
          ) : (
            <p className='text-xs text-zinc-500 dark:text-zinc-400'>-</p>
          )}
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

const TransactionsTable = ({
  transactions,
  isLoading,
  currentPage,
  totalPages,
}: {
  transactions: Transaction[]
  isLoading?: boolean
  currentPage?: number
  totalPages?: number
}) => {
  const { setPage } = useTransactionsFilter()

  const handlePageChange = (page: number) => {
    setPage(page)
  }

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-64'>
        <div className='flex items-center'>
          <Loader className='text-secondary-custom' />
          <p className='text-sm text-zinc-500 dark:text-zinc-400'>Loading transactions...</p>
        </div>
      </div>
    )
  }

  return (
    <div className='space-y-4'>
      <DataTable columns={columns} data={transactions} />

      {/* Pagination */}
      {totalPages && totalPages > 1 && (
        <div className='flex items-center justify-end'>
          <div className='flex items-center space-x-2'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => handlePageChange((currentPage || 1) - 1)}
              disabled={(currentPage || 1) <= 1}
              className='cursor-pointer'
            >
              <ChevronLeft className='h-4 w-4' />
              <p className='hidden md:block'>Previous</p>
            </Button>

            <div className='flex items-center space-x-1'>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1
                return (
                  <Button
                    key={pageNum}
                    variant={pageNum === (currentPage || 1) ? "default" : "outline"}
                    size='sm'
                    onClick={() => handlePageChange(pageNum)}
                    className='w-8 h-8 p-0 cursor-pointer'
                  >
                    {pageNum}
                  </Button>
                )
              })}

              {totalPages > 5 && (
                <>
                  {totalPages > 6 && <span className='px-2'>...</span>}
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => handlePageChange(totalPages)}
                    className='w-8 h-8 p-0 cursor-pointer'
                  >
                    {totalPages}
                  </Button>
                </>
              )}
            </div>

            <Button
              variant='outline'
              size='sm'
              onClick={() => handlePageChange((currentPage || 1) + 1)}
              disabled={(currentPage || 1) >= totalPages}
              className='cursor-pointer'
            >
              <p className='hidden md:block'>Next</p>
              <ChevronRight className='h-4 w-4' />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default TransactionsTable

const AmountUsd = ({ amount }: { amount: string }) => {
  if (Number(amount) === 0) return null
  return <p className='text-xs text-zinc-500 dark:text-zinc-400'>${amount}</p>
}
