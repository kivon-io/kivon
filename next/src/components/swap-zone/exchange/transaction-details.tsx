import Badge from "@/components/decorations/badge"
import Symbol from "@/components/elements/symbol"
import TokenName from "@/components/elements/token-name"
import { Input } from "@/components/ui/input"
import { useAppContext } from "@/context/app-context"
import { useExchange } from "@/context/exchange-context"
import { motion } from "motion/react"
import { MdOutlineKeyboardArrowDown } from "react-icons/md"
import { EXCHANGE_STEPS } from "./constants"

const TransactionDetails = () => {
  const { step, form } = useExchange()
  const { sendToken, receiveToken } = form.watch()

  if (step !== EXCHANGE_STEPS.TRANSACTION_DETAILS) return null

  return (
    <div className='relative flex flex-col'>
      <AmountDetails type='send' token={sendToken} />
      <div className='relative left-5 h-12 border-l border-dashed border-zinc-200 flex items-center'>
        <p className='text-xs font-medium pl-3 text-zinc-600'>Estimated rate: 1 ETH ~ 2900 USD</p>
        <div className='absolute h-2 w-2 rounded-full -translate-x-1/2 transform -translate-y-1/2 top-1/2 bg-zinc-200' />
      </div>
      <AmountDetails type='receive' token={receiveToken} />
    </div>
  )
}

export default TransactionDetails

const AmountDetails = ({ type, token }: { type: "send" | "receive"; token: string }) => {
  const { handleType, toggleTokenList } = useAppContext()

  const handleSelectCoin = () => {
    handleType(type)
    toggleTokenList()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className='bg-zinc-100 relative border border-zinc-200 rounded-xl p-4 flex flex-col gap-2'
    >
      <p className='text-sm'>You {type === "send" ? "send" : "receive"}</p>
      <div className='flex gap-2 items-center'>
        <div className='h-10 w-10 rounded-full bg-zinc-200 shrink-0'></div>
        <div className='flex flex-col w-full'>
          <div className='w-full flex justify-between items-center gap-2'>
            <div className='flex gap-1 items-center cursor-pointer' onClick={handleSelectCoin}>
              <Symbol symbol='ETH' className='font-medium text-zinc-800' />
              <MdOutlineKeyboardArrowDown className='text-zinc-600 text-lg' />
            </div>
            <Input
              value={0.1}
              className='w-full text-right text-base md:text-lg font-medium focus-visible:ring-0 focus-within:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none focus-within:outline-none border-none shadow-none'
            />
          </div>
          <div className='flex items-center gap-2'>
            <TokenName name={token} />
            <Badge>
              <span className='text-xs capitalize'>{token}</span>
            </Badge>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
