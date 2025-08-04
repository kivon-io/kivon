"use client"

import Symbol from "@/components/elements/symbol"
import { useAppContext } from "@/context/app-context"
import { trpc } from "@/trpc/client"
import { Network } from "alchemy-sdk"
import Image from "next/image"
import { useEffect } from "react"
import { useAccount } from "wagmi"

const WalletBalances = () => {
  const { updateTotalUSD } = useAppContext()
  const { address } = useAccount()
  const { data: balances } = trpc.getTokenBalances.useQuery(
    {
      address: address ?? "",
    },
    {
      enabled: !!address,
      retry: false,
      refetchInterval: 1000 * 60 * 10, // 10 min
    }
  )

  const allBalances = balances?.flatMap((b) => b.tokens)
  const hasValue = allBalances?.filter((t) => (t.balanceUSD ?? 0) > 0)
  hasValue?.sort((a, b) => b.balanceUSD! - a.balanceUSD!)

  const totalUSD = hasValue?.reduce((sum, t) => sum + (t.balanceUSD ?? 0), 0) ?? 0

  useEffect(() => {
    if (totalUSD) {
      updateTotalUSD(totalUSD)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalUSD])

  return (
    <div className='flex flex-col gap-2 overflow-y-auto relative h-full pb-10 md:pb-0'>
      {hasValue?.map((token) => (
        <BalanceItem key={token.contractAddress} token={token} />
      ))}
    </div>
  )
}

export default WalletBalances

const BalanceItem = ({
  token,
}: {
  token: {
    name: string
    symbol: string
    logo: string | null
    balance: number
    balanceUSD: number
    contractAddress: string
    network: Network
  }
}) => {
  return (
    <div className='flex p-2 justify-between items-center hover:bg-white dark:hover:bg-zinc-800 rounded-lg transition-all duration-300 ease-in-out'>
      <div className='flex gap-2'>
        {/* <div className='h-10 w-10 rounded-full bg-zinc-200 dark:bg-zinc-800' /> */}
        {token.logo ? (
          <Image
            src={token.logo}
            alt={token.symbol}
            width={40}
            height={40}
            className='rounded-full w-10 h-10'
          />
        ) : (
          <div className='h-10 w-10 rounded-full bg-zinc-200 dark:bg-zinc-800'>
            {token.symbol.slice(0, 2)}
          </div>
        )}
        <div className='flex flex-col'>
          <Symbol symbol={token.symbol} className='text-sm' />
          <div className='text-sm text-zinc-500 dark:text-zinc-400'>{token.name}</div>
        </div>
      </div>
      <div className='flex flex-col gap-1 text-right'>
        <p className='text-sm font-semibold text-zinc-900 dark:text-zinc-200'>
          ${token.balanceUSD.toFixed(2)}
        </p>
        <p className='text-xs text-zinc-500 dark:text-zinc-400 font-medium'>
          {token.balance.toFixed(4)} {token.symbol}
        </p>
      </div>
    </div>
  )
}
