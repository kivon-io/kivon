import Badge from "@/components/decorations/badge"
import ExchangeType from "@/components/elements/exchange-type"
import { Heading } from "@/components/elements/heading"
import { useAppContext } from "@/context/app-context"
import { useExchange } from "@/context/exchange-context"
import { cn } from "@/lib/utils"
import { motion } from "motion/react"

import Symbol from "@/components/elements/symbol"
import TokenName from "@/components/elements/token-name"
import Image from "next/image"
import { HiOutlineArrowSmRight } from "react-icons/hi"
import { EXCHANGE_STEPS, EXCHANGE_TYPE, ExchangeFormSchema } from "./constants"

const SelectCoin = () => {
  const { step, form } = useExchange()

  const sendToken = form.watch("sendToken")
  const receiveToken = form.watch("receiveToken")

  if (step !== EXCHANGE_STEPS.SELECT_COIN) return null

  const handleSwitchTokens = () => {
    form.setValue("sendToken", receiveToken)
    form.setValue("receiveToken", sendToken)
  }

  return (
    <div className='flex flex-col gap-8 items-center justify-center w-full'>
      <Heading as='h2' className='text-center text-sm md:text-base'>
        Select which assets to exchange
      </Heading>

      <div className='grid grid-cols-12 gap-0 w-full'>
        <CoinCard type={EXCHANGE_TYPE.SEND} className='col-span-5' token={sendToken} />
        <div className='col-span-2 flex items-center justify-center'>
          <div
            className='rounded-xl border border-zinc-200 dark:border-zinc-800 h-10 w-10 flex items-center justify-center cursor-pointer'
            onClick={handleSwitchTokens}
          >
            <HiOutlineArrowSmRight className='text-zinc-500 dark:text-zinc-300' />
          </div>
        </div>
        <CoinCard type={EXCHANGE_TYPE.RECEIVE} className='col-span-5' token={receiveToken} />
      </div>
    </div>
  )
}

export default SelectCoin

const CoinCard = ({
  type,
  token,

  className,
}: {
  type: (typeof EXCHANGE_TYPE)[keyof typeof EXCHANGE_TYPE]
  token: ExchangeFormSchema["sendToken"] | ExchangeFormSchema["receiveToken"]
  className?: string
}) => {
  const { toggleTokenList, handleType } = useAppContext()

  const handleClick = () => {
    handleType(type)
    toggleTokenList()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
      className={cn(
        "border border-zinc-200 dark:border-zinc-800 bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-neutral-900 dark:to-neutral-950 rounded-xl p-5 relative cursor-pointer",
        className
      )}
      onClick={() => handleClick()}
    >
      <div className='relative z-20 flex flex-col gap-4 items-center justify-center'>
        <ExchangeType type={type} />
        <div className='flex flex-col gap-2 items-center justify-center'>
          {token.image && (
            <Image
              src={token.image}
              alt={token.name}
              className='object-contain object-center w-8 h-8'
              width={32}
              height={32}
            />
          )}
          <div className='flex flex-col gap-1 items-center justify-center'>
            <Symbol symbol={token.ticker} />
            <TokenName className='text-xs md:text-sm capitalize text-center' name={token.name} />
            <Badge>
              <p className='text-xs uppercase font-medium'>{token.network}</p>
            </Badge>
          </div>
        </div>
      </div>
      <div className='absolute -top-3.5 h-2 w-4/5 left-1/2 -translate-x-1/2 translate-y-1/2 bg-zinc-50 dark:bg-neutral-900 border-t border-l border-r border-zinc-200 dark:border-zinc-800 rounded-t-xl opacity-80' />
      <div className='absolute -top-[22px] left-1/2 -translate-x-1/2 bg-zinc-50 dark:bg-neutral-800 h-2 w-3/5 translate-y-1/2 border-t border-l border-r border-zinc-200 dark:border-zinc-700 rounded-t-xl opacity-50' />
    </motion.div>
  )
}
