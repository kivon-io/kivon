"use client"
import { motion } from "motion/react"
import { usePathname } from "next/navigation"

const DefiSwap = () => {
  const pathname = usePathname()
  if (!pathname.includes("defi")) return null

  return (
    <motion.div className='h-[500px] rounded-3xl bg-white'>
      <h1>Defi</h1>
    </motion.div>
  )
}

export default DefiSwap
