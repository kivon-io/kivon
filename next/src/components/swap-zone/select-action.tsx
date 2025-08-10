"use client"
import { cn } from "@/lib/utils"
import { motion } from "motion/react"
import { usePathname, useRouter } from "next/navigation"
import { AiOutlineSwap } from "react-icons/ai"
import { PiVaultLight } from "react-icons/pi"
import { RiVisaLine } from "react-icons/ri"
import { RxLapTimer } from "react-icons/rx"
import { BorderBeam } from "../decorations/border-beam"
import { Grid } from "../decorations/grid"
import { Heading } from "../elements/heading"
import SwapZoneContainer from "./swap-zone-container"

// RiP2pLine

const actions = [
  {
    id: 1,
    title: "Swap-Bridge",
    key: "swap",
    icon: "AiOutlineSwap",
  },
  {
    id: 4,
    title: "Buy-Sell",
    key: "fiat",
    icon: "RiVisaLine",
  },
  {
    id: 2,
    title: "Limit-Futures-DCA",
    key: "limit-futures-dca",
    icon: "RxLapTimer",
  },
  {
    id: 3,
    title: "Index DTF",
    key: "index-dtf",
    icon: "PiVaultLight",
  },
]

const iconsMap = {
  swap: <AiOutlineSwap className='text-black dark:text-white w-6 h-6 z-10' />,
  fiat: <RiVisaLine className='text-black dark:text-white w-6 h-6 z-10' />,
  "limit-futures-dca": <RxLapTimer className='text-black dark:text-white w-6 h-6 z-10' />,
  "index-dtf": <PiVaultLight className='text-black dark:text-white w-6 h-6 z-10' />,
}

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
      <div className='grid grid-cols-2 gap-2 md:gap-4'>
        {actions.map((action) => (
          <motion.div
            key={action.id}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            whileTap={{ scale: 0.95 }}
            className='group flex flex-col items-center justify-center h-32 md:h-44 bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-neutral-900 dark:to-neutral-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 cursor-pointer overflow-hidden relative'
            onClick={() => handleSelectSwapType(action.key)}
          >
            <div className=' relative z-10 flex flex-col items-center justify-center gap-3'>
              <div
                className={cn(
                  "flex items-center justify-center w-16 h-16 md:w-20 md:h-20 relative bg-gradient-to-br from-zinc-50 to-zinc-200 dark:from-neutral-800 dark:to-black rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-lg shadow-zinc-200 dark:shadow-neutral-800/50"
                )}
              >
                {iconsMap[action.key as keyof typeof iconsMap]}
                <div className='absolute bg-zinc-200 dark:bg-neutral-800 w-8 h-8 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2' />

                <div className='hidden md:flex absolute top-0 left-6 w-[1px] h-full bg-zinc-300 dark:bg-zinc-700/50' />
                <div className='hidden md:flex absolute top-0 right-6 w-[1px] h-full bg-zinc-300 dark:bg-zinc-700/50' />
                <div className='hidden md:flex absolute top-6 left-0 w-full h-[1px] bg-zinc-300 dark:bg-zinc-700/50' />
                <div className='hidden md:flex absolute bottom-6 left-0 w-full h-[1px] bg-zinc-300 dark:bg-zinc-700/50' />

                {/* only show on hover */}
                <BorderBeam
                  duration={8}
                  size={100}
                  className='opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                />
              </div>
              <p className='text-sm font-bold text-center'>{action.title}</p>
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
//     <p className='text-sm md:text-lg font-bold absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 '>
//       {action.title}
//     </p>
//     <div
//       className={cn(
//         "w-20 h-20 md:w-32 md:h-32 absolute",
//         index === 0 && "-bottom-22 -right-22  md:-bottom-30 md:-right-32",
//         index === 1 && "-bottom-22 -left-22  md:-bottom-30 md:-left-32",
//         index === 2 && "-top-22 -right-22  md:-top-30 md:-right-32",
//         index === 3 && "-top-22 -left-22  md:-top-30 md:-left-32"
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
