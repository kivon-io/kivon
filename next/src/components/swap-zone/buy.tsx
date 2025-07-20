"use client"
import { motion } from "motion/react"

const Buy = () => {
  return (
    <motion.div className='h-[500px] rounded-3xl bg-white dark:bg-neutral-900 flex flex-col items-center justify-center gap-2'>
      <h1 className='text-2xl font-bold'>Buy/Sell</h1>
      <p className='text-sm text-zinc-500'>Buy/Sell crypto with fiat or other cryptocurrencies.</p>
      <span className='text-sm text-zinc-500'>Coming soon...</span>
    </motion.div>
  )
}

export default Buy
