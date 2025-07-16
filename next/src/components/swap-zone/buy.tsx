"use client"
import { motion } from "motion/react"
import { usePathname } from "next/navigation"

const Buy = () => {
  const pathname = usePathname()
  if (!pathname.includes("buy")) return null
  return (
    <motion.div className='h-[500px] rounded-3xl bg-white flex flex-col items-center justify-center gap-2'>
      <h1 className='text-2xl font-bold'>Buy</h1>
      <p className='text-sm text-zinc-500'>Buy crypto with fiat or other cryptocurrencies.</p>
      <span className='text-sm text-zinc-500'>Coming soon...</span>
    </motion.div>
  )
}

export default Buy
