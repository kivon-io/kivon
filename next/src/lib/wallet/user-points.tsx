"use client"

import { Grid } from "@/components/decorations/grid"
import { trpc } from "@/trpc/client"
import { useDynamicWallet } from "./use-dynamic-wallet"

const UserPoints = () => {
  const { address } = useDynamicWallet()
  const { data: user } = trpc.getUser.useQuery(
    { userAddress: address as string },
    {
      enabled: !!address,
    }
  )

  return (
    <div className='bg-gradient-to-br from-zinc-800 to-black p-4 rounded-xl relative overflow-hidden'>
      <div className='relative z-10'>
        <p className='text-xs font-medium text-zinc-200'>XP Points</p>
        <p className='text-2xl font-bold text-white font-barlow'>{user?.points}</p>
      </div>
      <Grid size={20} className='absolute -top-5 right-0' />
    </div>
  )
}

export default UserPoints
