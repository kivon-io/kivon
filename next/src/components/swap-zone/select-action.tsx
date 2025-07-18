"use client"
import { cn } from "@/lib/utils"
import { motion } from "motion/react"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { Grid } from "../decorations/grid"
import { Heading } from "../elements/heading"
import SwapZoneContainer from "./swap-zone-container"

const actions = [
  {
    id: 1,
    title: "Swap",
    key: "swap",
    image: "/images/badges/swap.png",
  },
  {
    id: 4,
    title: "Bridge",
    key: "bridge",
    image: "/images/badges/bridge.png",
  },
  {
    id: 2,
    title: "Buy",
    key: "buy",
    image: "/images/badges/buy.png",
  },
  {
    id: 3,
    title: "Sell",
    key: "sell",
    image: "/images/badges/sell.png",
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
    <SwapZoneContainer className='relative z-10 bg-white dark:bg-neutral-950 p-5 lg:p-6 border border-zinc-200 dark:border-zinc-800 rounded-3xl w-full'>
      <Heading as='h2' className='text-sm md:text-base font-medium mb-5'>
        Select an action to get started
      </Heading>
      <div className='grid grid-cols-2 gap-4'>
        {actions.map((action) => (
          <motion.div
            key={action.id}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            whileTap={{ scale: 0.95 }}
            className='flex flex-col items-center justify-center h-32 md:h-44 bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-neutral-900 dark:to-neutral-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 cursor-pointer overflow-hidden relative'
            onClick={() => handleSelectSwapType(action.key)}
          >
            <div className='relative z-10 flex flex-col items-center justify-center gap-3'>
              <div className={cn(" w-10 h-10 md:w-20 md:h-20 relative")}>
                <Image
                  src={action.image}
                  alt='swap'
                  className='w-full h-full object-contain'
                  fill
                />
              </div>
              <p className='text-sm md:text-lg font-bold text-center'>{action.title}</p>
            </div>
            <Grid size={20} className='absolute top-0 right-0 ' />
          </motion.div>
        ))}
      </div>
    </SwapZoneContainer>
  )
}

export default SelectSwapType

// <motion.div
//   key={action.id}
//   whileHover={{ scale: 1.05 }}
//   transition={{ duration: 0.2 }}
//   whileTap={{ scale: 0.95 }}
//   className='flex flex-col items-center justify-center h-32 md:h-44 bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-neutral-900 dark:to-neutral-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 cursor-pointer overflow-hidden relative'
//   onClick={() => handleSelectSwapType(action.key)}
// >
//   <div className='relative z-10'>
//     <p className='text-lg font-bold absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 '>
//       {action.title}
//     </p>
//     <div
//       className={cn(
//         " w-10 h-10 md:w-32 md:h-32 absolute",
//         index === 0 && "-bottom-30 -right-32",
//         index === 1 && "-bottom-30 -left-32",
//         index === 2 && "-top-30 -right-32",
//         index === 3 && "-top-30 -left-32"
//       )}
//     >
//       <Image
//         src={action.image}
//         alt='swap'
//         className='w-full h-full object-contain'
//         fill
//       />
//     </div>
//   </div>
//   <Grid size={20} className='absolute top-0 right-0 ' />
// </motion.div>
