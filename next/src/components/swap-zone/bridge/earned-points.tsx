"use client"

import { trpc } from "@/trpc/client"
import { TbCoins } from "react-icons/tb"

const EarnedPoints = ({ amount }: { amount: number }) => {
  const { data: points } = trpc.getPoints.useQuery()
  const earnedPoints = amount * (points ?? 0)

  return (
    <div className='flex gap-2 border border-emerald-200 dark:border-emerald-800 rounded-lg p-2.5 relative overflow-hidden bg-emerald-500/30 dark:bg-emerald-500/20'>
      <div className='h-10 w-12 rounded-md flex items-center justify-center bg-emerald-100 dark:bg-emerald-800'>
        <TbCoins className='text-emerald-500 dark:text-emerald-200 size-6' />
      </div>
      <div className='w-full flex flex-col'>
        <p className='text-sm font-medium'>You have earned</p>
        <p className='text-sm font-semibold font-barlow'>{earnedPoints} XP</p>
      </div>
    </div>
  )
}

export default EarnedPoints
