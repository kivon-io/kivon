"use client"

import { useExchange } from "@/context/exchange-context"
import { motion } from "motion/react"
import { usePathname } from "next/navigation"
import ExchangeAction from "./exchange/action"
import SelectCoin from "./exchange/select-coin"
import SendTransaction from "./exchange/send-transaction"
import { DialogTips } from "./exchange/tips"
import TransactionDetails from "./exchange/transaction-details"
import NewTransaction from "./new-transaction"
import TransactionId from "./transaction-id"

const Exchange = () => {
  const { exchangeTransactionStatus } = useExchange()

  const pathname = usePathname()
  if (!pathname.includes("swap")) return null

  return (
    <div className='flex flex-col gap-1'>
      <TransactionId transactionId={exchangeTransactionStatus.id} />
      <motion.div className='h-fit rounded-3xl bg-gradient-to-b from-white to-zinc-100 dark:from-neutral-900 dark:to-neutral-950 border border-zinc-200 dark:border-zinc-800 p-5 flex flex-col gap-5'>
        <SelectCoin />
        <TransactionDetails />
        <SendTransaction />
        <ExchangeAction />
        <div className='border-t border-zinc-200 dark:border-zinc-800 pt-4 mt-1 flex flex-col gap-4'>
          <NewTransaction />
          <DialogTips />
        </div>
      </motion.div>
    </div>
  )
}

export default Exchange
