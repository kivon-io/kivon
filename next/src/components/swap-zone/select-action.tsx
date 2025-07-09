"use client"
import { usePathname, useRouter } from "next/navigation"
import SwapZoneContainer from "./swap-zone-container"

const actions = [
  {
    id: 1,
    title: "Exchange",
    key: "exchange",
  },
  {
    id: 2,
    title: "Buy",
    key: "buy",
  },
  {
    id: 3,
    title: "Sell",
    key: "sell",
  },
  {
    id: 4,
    title: "Defi",
    key: "defi",
  },
]

const SelectSwapType = () => {
  const pathname = usePathname()

  const router = useRouter()

  const handleSelectSwapType = (key: string) => {
    router.push(`/${key}`)
  }

  if (pathname !== "/") return null

  return (
    <SwapZoneContainer className='bg-white p-5 lg:p-6 border border-zinc-200 rounded-3xl'>
      <div className='grid grid-cols-2 gap-5 lg:gap-6'>
        {actions.map((action) => (
          <div
            key={action.id}
            className='flex flex-col items-center justify-center h-44 bg-zinc-100 border border-zinc-200 rounded-2xl p-5 shadow-sm cursor-pointer'
            onClick={() => handleSelectSwapType(action.key)}
          >
            <div className='w-10 h-10 bg-zinc-50 rounded-full'></div>
            <p className='text-sm font-medium'>{action.title}</p>
          </div>
        ))}
      </div>
    </SwapZoneContainer>
  )
}

export default SelectSwapType
