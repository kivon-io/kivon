"use client"
import { motion } from "motion/react"
import { usePathname } from "next/navigation"
import { Button } from "../ui/button"
import SelectCoin from "./exchange/select-coin"

const Exchange = () => {
  // only show if params match exchange
  const pathname = usePathname()
  if (!pathname.includes("exchange")) return null

  return (
    <motion.div className='h-fit rounded-3xl bg-white p-5 flex flex-col gap-5'>
      <SelectCoin />
      <Button className='w-full rounded-lg' size='lg'>
        Continue
      </Button>
    </motion.div>
  )
}

export default Exchange
