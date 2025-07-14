"use client"
import { motion } from "motion/react"
import { usePathname } from "next/navigation"
import ExchangeAction from "./exchange/action"
import SelectCoin from "./exchange/select-coin"
import SendTransaction from "./exchange/send-transaction"
import { DialogTips } from "./exchange/tips"
import TransactionDetails from "./exchange/transaction-details"
import NewTransaction from "./new-transaction"

const Exchange = () => {
  // only show if params match exchange
  const pathname = usePathname()
  if (!pathname.includes("exchange")) return null

  // const hello = trpc.sayHello.useQuery()

  // console.log("HELLO: ", hello)

  return (
    <div className='flex flex-col gap-5'>
      <motion.div className='h-fit rounded-3xl bg-white p-5 flex flex-col gap-5'>
        <SelectCoin />
        <TransactionDetails />
        <SendTransaction />
        <ExchangeAction />
        <div className='border-t border-zinc-200 pt-4 mt-1 flex flex-col gap-4'>
          <NewTransaction />
          <DialogTips />
        </div>
      </motion.div>
    </div>
  )
}

export default Exchange
