"use client"
import Address from "@/components/elements/address"
import AddressAvatar from "@/components/elements/address-avatar"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useDynamicContext } from "@dynamic-labs/sdk-react-core"
import { useState } from "react"
import { BsCheck, BsCopy, BsPower } from "react-icons/bs"
import { useMediaQuery } from "usehooks-ts"
import { useAccount } from "wagmi"
import { formatAddress } from "../utils"
import TotalBalance from "./total-balance"
import WalletBalances from "./wallet-balances"
import WalletIcon from "./wallet-icon"

const ConnectedWallet = () => {
  const { address, isConnected, chain } = useAccount()
  const { handleLogOut } = useDynamicContext()
  const [isCopied, setIsCopied] = useState(false)
  const mediaQuery = useMediaQuery("(min-width: 768px)")

  if (!isConnected) return null

  const handleCopy = () => {
    navigator.clipboard.writeText(address as string)
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 2000)
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className='flex items-center gap-2 w-fit px-2 bg-white dark:bg-neutral-950'
          variant='outline'
        >
          <AddressAvatar address={address as string} className='h-6 w-6' />
          <p className='text-xs md:text-sm font-medium'>{formatAddress(address as string)}</p>
        </Button>
      </SheetTrigger>
      <SheetContent
        side={mediaQuery ? "right" : "bottom"}
        className='max-h-[85vh] min-h-[85vh] md:min-h-auto md:max-h-[98vh] h-full w-full sm:w-3/4 md:my-auto md:right-4 md:rounded-2xl rounded-t-2xl'
      >
        <SheetHeader>
          <SheetTitle>
            <div className='flex items-center gap-2'>
              <AddressAvatar address={address as string} className='h-8 w-8' />
              <p className='text-sm font-medium'>{formatAddress(address as string)}</p>
            </div>
          </SheetTitle>
          <SheetDescription className='sr-only'>Connected Wallet</SheetDescription>
        </SheetHeader>
        <div className='relative p-2 flex flex-col gap-5 overflow-y-hidden'>
          <div className='bg-white dark:bg-neutral-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 space-y-2'>
            <div className='flex justify-between items-center'>
              <div className='flex gap-2'>
                <WalletIcon className='h-8 w-8' />
                <div className='flex flex-col'>
                  <p className='text-sm font-medium'>{chain?.name}</p>
                  <Address className='text-xs font-medium' address={address as string} />
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <Button
                  variant='outline'
                  size='icon'
                  className='hover:bg-zinc-200 dark:hover:bg-zinc-950'
                  onClick={handleCopy}
                >
                  {isCopied ? <BsCheck className='size-3' /> : <BsCopy className='size-3' />}
                </Button>
                <Button
                  variant='outline'
                  size='icon'
                  className='hover:bg-zinc-200 dark:hover:bg-zinc-950'
                  onClick={() => handleLogOut()}
                >
                  <BsPower className='size-3' />
                </Button>
              </div>
            </div>
            <div className='border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 flex flex-col gap-2'>
              {/* {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <div className='h-4 w-4 bg-zinc-200 dark:bg-zinc-900 rounded-full' />
                    <p className='text-sm font-medium'>ETH</p>
                  </div>
                  <p className='text-sm text-zinc-500 dark:text-zinc-400 font-medium'>$0.007</p>
                </div>
              ))} */}
              <TotalBalance />
            </div>
          </div>
          {/* show all tokens in the wallet and balances */}
          <WalletBalances />
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default ConnectedWallet
