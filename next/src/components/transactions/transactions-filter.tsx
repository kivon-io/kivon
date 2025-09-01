"use client"

import { useTransactionsFilter } from "@/hooks/use-transactions-filter"
import { cn } from "@/lib/utils"
import { useDynamicWallet } from "@/lib/wallet/use-dynamic-wallet"
import { SearchIcon, X } from "lucide-react"
import {
  HiOutlineAdjustments,
  HiOutlineArrowNarrowLeft,
  HiOutlineArrowNarrowRight,
} from "react-icons/hi"
import { useDebounceCallback } from "usehooks-ts"
import { BlurImage } from "../blur-image"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet"

export const FilterHeader = ({ chains }: { chains: Chain[] }) => {
  const { address } = useDynamicWallet()
  const { getCurrentParams, setFromChain, setToChain, setAddress, setSearchQuery } =
    useTransactionsFilter()
  const currentParams = getCurrentParams()

  const searchValue = currentParams.search ?? ""

  const handleSetSearchQuery = useDebounceCallback((search: string) => {
    setSearchQuery(search)
  }, 200)

  return (
    <div className='flex md:flex-row flex-col md:items-center md:justify-between'>
      <div className='flex items-center gap-2'>
        {address && (
          <Select value={currentParams.address ?? "all"} onValueChange={setAddress}>
            <SelectTrigger>
              <SelectValue placeholder='Only mine' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={address}>Only mine</SelectItem>
              <SelectItem value='all'>All</SelectItem>
            </SelectContent>
          </Select>
        )}
        <SearchInput searchValue={searchValue} onSearchChange={handleSetSearchQuery} />
        <SelectChainMobile
          chains={chains}
          fromChainId={currentParams.fromChainId}
          toChainId={currentParams.toChainId}
          onFromChainChange={setFromChain}
          onToChainChange={setToChain}
        />
        {/* {hasActiveFilters && (
          <Button variant='outline' size='sm' onClick={() => {}} className='text-xs'>
            Clear filters
          </Button>
        )} */}
      </div>
      <div className='flex items-center gap-4'>
        <div className='md:flex hidden'>
          <ChainDetails
            chains={chains}
            fromChainId={currentParams.fromChainId}
            toChainId={currentParams.toChainId}
            onFromChainChange={setFromChain}
            onToChainChange={setToChain}
          />
        </div>
      </div>
    </div>
  )
}

const SearchInput = ({
  searchValue,
  onSearchChange,
}: {
  searchValue: string
  onSearchChange: (search: string) => void
}) => {
  const { setSearchQuery } = useTransactionsFilter()
  const onClear = () => {
    setSearchQuery("")
  }
  return (
    <div className='relative md:min-w-[350px]'>
      <SearchIcon className='absolute left-2 top-1/2 -translate-y-1/2 flex items-center justify-center text-zinc-600 size-4' />
      <Input
        className='pl-8 pr-8 focus-visible:ring-0 focus-within:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none focus-within:outline-none shadow-none'
        placeholder='Filter by wallet address, transaction hash, ENS'
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      {searchValue && (
        <Button
          variant='ghost'
          size='sm'
          onClick={onClear}
          className='absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0 hover:bg-zinc-100 dark:hover:bg-zinc-800'
        >
          <X className='h-3 w-3' />
        </Button>
      )}
    </div>
  )
}

const SelectChainMobile = ({
  chains,
  fromChainId,
  toChainId,
  onFromChainChange,
  onToChainChange,
}: {
  chains: Chain[]
  fromChainId?: string
  toChainId?: string
  onFromChainChange: (chainId: string) => void
  onToChainChange: (chainId: string) => void
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant='outline'
          size='icon'
          className='md:hidden flex items-center justify-center'
        >
          <HiOutlineAdjustments />
        </Button>
      </SheetTrigger>
      <SheetContent
        side='bottom'
        className='bg-white dark:bg-black/90 max-h-[85vh] rounded-t-xl border-t border-zinc-200 dark:border-zinc-800'
      >
        <SheetHeader>
          <SheetTitle className='text-base font-medium'>Select a chain</SheetTitle>
          <SheetDescription className='sr-only'>Select a chain</SheetDescription>
        </SheetHeader>
        <ChainDetails
          className='p-5 gap-2'
          chains={chains}
          fromChainId={fromChainId}
          toChainId={toChainId}
          onFromChainChange={onFromChainChange}
          onToChainChange={onToChainChange}
        />
      </SheetContent>
    </Sheet>
  )
}

const ChainDetails = ({
  chains,
  className,
  fromChainId,
  toChainId,
  onFromChainChange,
  onToChainChange,
}: {
  chains: Chain[]
  className?: string
  fromChainId?: string
  toChainId?: string
  onFromChainChange: (chainId: string) => void
  onToChainChange: (chainId: string) => void
}) => {
  return (
    <div className={cn("flex md:flex-row flex-col md:gap-2 gap-0 md:items-end", className)}>
      <div className='flex flex-col gap-1'>
        <p className='text-xs text-zinc-500 dark:text-zinc-400'>From</p>
        <Select value={fromChainId ?? "all"} onValueChange={onFromChainChange}>
          <SelectTrigger className='w-full md:w-[200px]'>
            <SelectValue placeholder='All Chains' />
          </SelectTrigger>
          <SelectContent className='max-h-[250px] overflow-y-auto'>
            <SelectItem value='all'>All Chains</SelectItem>
            {chains.map((chain) => (
              <SelectItem key={chain.id} value={chain.id.toString()}>
                <div className='flex items-center gap-2 capitalize'>
                  <BlurImage
                    src={chain.iconUrl ?? chain.logoUrl ?? ""}
                    alt={chain.name}
                    className='h-6 w-6 rounded-full object-cover object-center'
                    width={24}
                    height={24}
                  />
                  {chain.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button
        size='icon'
        className='group flex flex-col items-center justify-center relative bottom-0 gap-0 cursor-pointer rotate-90 md:rotate-0'
        variant='ghost'
      >
        <HiOutlineArrowNarrowRight className='text-zinc-600 size-3 group-hover:translate-x-0.5 duration-200 transition-all' />
        <HiOutlineArrowNarrowLeft className='text-zinc-600 size-3 group-hover:-translate-x-0.5 duration-200 transition-all' />
      </Button>
      <div className='flex flex-col gap-1'>
        <p className='text-xs text-zinc-500 dark:text-zinc-400'>To</p>
        <Select value={toChainId ?? "all"} onValueChange={onToChainChange}>
          <SelectTrigger className='w-full md:w-[200px]'>
            <SelectValue placeholder='All Chains' />
          </SelectTrigger>
          <SelectContent className='max-h-[250px] overflow-y-auto'>
            <SelectItem value='all'>All Chains</SelectItem>
            {chains.map((chain) => (
              <SelectItem key={chain.id} value={chain.id.toString()}>
                <div className='flex items-center gap-2 capitalize'>
                  <BlurImage
                    src={chain.iconUrl ?? chain.logoUrl ?? ""}
                    alt={chain.name}
                    className='h-6 w-6 rounded-full object-cover object-center'
                    width={24}
                    height={24}
                  />
                  {chain.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
