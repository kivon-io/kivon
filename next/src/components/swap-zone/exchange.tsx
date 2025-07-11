"use client"
import { motion } from "motion/react"
import { usePathname } from "next/navigation"
import ExchangeAction from "./exchange/action"
import SelectCoin from "./exchange/select-coin"
import SendTransaction from "./exchange/send-transaction"
import TransactionDetails from "./exchange/transaction-details"

const Exchange = () => {
  // only show if params match exchange
  const pathname = usePathname()
  if (!pathname.includes("exchange")) return null

  return (
    <motion.div className='h-fit rounded-3xl bg-white p-5 flex flex-col gap-5'>
      <SelectCoin />
      <TransactionDetails />
      <SendTransaction />
      <ExchangeAction />
    </motion.div>
  )
}

export default Exchange
