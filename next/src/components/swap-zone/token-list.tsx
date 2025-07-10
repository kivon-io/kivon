"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useAppContext } from "@/context/app-context"
import { useExchange } from "@/context/exchange-context"
import Badge from "../decorations/badge"
import Symbol from "../elements/symbol"
import TokenName from "../elements/token-name"
import { Input } from "../ui/input"
import { ScrollArea } from "../ui/scroll-area"
import { EXCHANGE_TYPE } from "./exchange/constants"

const TokenList = () => {
  const { state, type, toggleTokenList } = useAppContext()
  const { form } = useExchange()
  const open = state.tokenListOpen

  const onOpenChange = () => {
    toggleTokenList()
  }

  const handleClick = (token: string) => {
    if (type === EXCHANGE_TYPE.SEND) {
      form.setValue("sendToken", token)
    } else {
      form.setValue("receiveToken", token)
    }

    toggleTokenList()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className='
          transition-all duration-300
          opacity-0 scale-95
          data-[state=open]:opacity-100 data-[state=open]:scale-100
        '
      >
        <DialogHeader>
          <DialogTitle>Select a token</DialogTitle>
          <DialogDescription>Select a token to swap</DialogDescription>
        </DialogHeader>
        <div className='flex flex-col gap-4'>
          <Input placeholder='Search for a token' />

          <ScrollArea className='h-full w-full max-h-[350px] space-y-2'>
            {Array.from({ length: 100 }).map((_, index) => (
              <div
                key={index}
                className='w-full bg-zinc-100 flex gap-2 items-center px-3 py-2 rounded-xl hover:bg-zinc-200 cursor-pointer transition-all duration-300'
                onClick={() => handleClick(type === EXCHANGE_TYPE.SEND ? "ethereum" : "usdt")}
              >
                <div className='h-10 w-10 rounded-full bg-zinc-400'></div>
                <div className='flex flex-col gap-1'>
                  <div className='flex gap-2 items-center'>
                    <Symbol className='text-sm font-medium' symbol='SYM' />
                    <Badge>
                      <span className='text-xs'>Chain</span>
                    </Badge>
                  </div>
                  <TokenName className='text-sm' name='Token Name' />
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default TokenList
