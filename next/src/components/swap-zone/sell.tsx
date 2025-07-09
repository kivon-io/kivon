"use client"
import { motion } from "motion/react"
import { usePathname } from "next/navigation"

const SellSwap = () => {
  const pathname = usePathname()
  if (!pathname.includes("sell")) return null
  return (
    <motion.div className='h-[500px] rounded-3xl bg-white'>
      <h1>Sell</h1>
    </motion.div>
  )
}

export default SellSwap
