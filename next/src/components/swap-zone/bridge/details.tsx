import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { useBridge } from "@/context/bridge-context"
import { APP_NAME } from "@/lib/shared/constants"
import { cn } from "@/lib/utils"
import React from "react"
import { BiGasPump } from "react-icons/bi"
import { PiTimer } from "react-icons/pi"
import { BridgeFormSchema } from "./constants"

const Details = () => {
  const { form } = useBridge()
  const { origin, destination, amount } = form.watch()

  if (amount === 0) return null

  return (
    <Accordion
      type='single'
      collapsible
      className='bg-white dark:bg-neutral-900 rounded-xl border border-zinc-200 dark:border-zinc-800 px-2.5'
    >
      <AccordionItem value='details'>
        <AccordionTrigger className='hover:no-underline focus:no-underline group'>
          <div className='flex w-full justify-between items-center'>
            <TokenAmount origin={origin} destination={destination} />
            {/* only show when accordion is closed */}
            <AmountAndGas className='group-data-[state=open]:hidden' />
          </div>
        </AccordionTrigger>
        <AccordionContent className='flex flex-col gap-2'>
          <Item title='Route'>
            <p>{APP_NAME}</p>
          </Item>
          <Item title='Estimated Time'>
            <EstimatedTime />
          </Item>
          <Item title='Network cost'>
            <Gas />
          </Item>
          <Item title='Price impact'>
            <p>0.00%</p>
          </Item>
          <Item title='Max slippage'>
            <Badge variant='outline' className='text-xs'>
              Auto
            </Badge>
          </Item>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default Details

const Item = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <div className='flex justify-between'>
      <p className='text-sm text-zinc-700 dark:text-zinc-100 font-medium'>{title}</p>
      {children}
    </div>
  )
}

const TokenAmount = ({
  origin,
  destination,
}: {
  origin: BridgeFormSchema["origin"]
  destination: BridgeFormSchema["destination"]
}) => {
  return (
    <div className='flex'>
      <p className='text-sm text-zinc-700 dark:text-zinc-100 font-medium'>
        1 {origin.tokenSymbol} = {destination.tokenSymbol}
      </p>
    </div>
  )
}

const AmountAndGas = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center gap-2 transition-all duration-300", className)}>
      <EstimatedTime />
      <div className='h-1 w-1 bg-zinc-200 dark:bg-zinc-700 rounded-full' />
      <Gas />
    </div>
  )
}

const EstimatedTime = () => {
  return (
    <div className='flex items-center gap-1'>
      <PiTimer className='w-4 h-4 text-zinc-700 dark:text-zinc-100' />
      <p className='text-sm text-zinc-700 dark:text-zinc-100 font-medium'>~ 10s</p>
    </div>
  )
}

const Gas = () => {
  return (
    <div className='flex items-center gap-1'>
      <BiGasPump className='w-4 h-4 text-zinc-700 dark:text-zinc-100' />
      <p className='text-sm text-zinc-700 dark:text-zinc-100 font-medium'>~ $0.03</p>
    </div>
  )
}
