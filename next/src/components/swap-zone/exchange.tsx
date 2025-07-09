"use client"
import { motion } from "motion/react"
import { usePathname } from "next/navigation"

const Exchange = () => {
  // only show if params match exchange
  const pathname = usePathname()
  if (!pathname.includes("exchange")) return null
  return (
    <motion.div className='h-[500px] rounded-3xl bg-white'>
      <h1>Exchange</h1>
    </motion.div>
  )
}

export default Exchange
