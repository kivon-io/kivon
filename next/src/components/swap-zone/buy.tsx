"use client"
import { motion } from "motion/react"
import { usePathname } from "next/navigation"

const Buy = () => {
  const pathname = usePathname()
  if (!pathname.includes("buy")) return null
  return (
    <motion.div className='h-[500px] rounded-3xl bg-white'>
      <h1>Buy</h1>
    </motion.div>
  )
}

export default Buy
