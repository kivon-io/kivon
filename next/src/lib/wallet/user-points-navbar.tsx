"use client"

import { Grid } from "@/components/decorations/grid"
import { trpc } from "@/trpc/client"
import { useDynamicWallet } from "./use-dynamic-wallet"

const UserPointsNavbar = () => {
  const { address } = useDynamicWallet()
  const { data: user } = trpc.getUser.useQuery(
    { userAddress: address as string },
    {
      enabled: !!address,
    }
  )

  return (
    <div className='text-sm bg-gradient-to-br from-zinc-800 to-black px-4 py-2 rounded-md relative overflow-hidden h-9 w-fit flex items-center justify-center border border-zinc-200 dark:border-zinc-800'>
      <div className='relative z-10'>
        <p className='text-white font-barlow font-medium'>{user?.points} XP</p>
      </div>
      <Grid size={20} className='absolute -top-5 right-0' />
    </div>
  )
}

export default UserPointsNavbar
