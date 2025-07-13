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
import Image from "next/image"
import { useState } from "react"
import Badge from "../decorations/badge"
import Symbol from "../elements/symbol"
import TokenName from "../elements/token-name"
import { Input } from "../ui/input"
import { ScrollArea } from "../ui/scroll-area"
import { EXCHANGE_TYPE } from "./exchange/constants"

const TokenList = () => {
  const { state, type, toggleTokenList } = useAppContext()
  const { form, currencies } = useExchange()
  const open = state.tokenListOpen
  const [filteredCurrencies, setFilteredCurrencies] = useState<Currency[]>(currencies)
  const onOpenChange = () => {
    toggleTokenList()
  }

  const handleClick = (token: Currency) => {
    if (type === EXCHANGE_TYPE.SEND) {
      form.setValue("sendToken", {
        ticker: token.ticker,
        name: token.name,
        image: token.image,
        network: token.network,
        isFiat: token.isFiat,
        supportsFixedRate: token.supportsFixedRate,
      })
    } else {
      form.setValue("receiveToken", {
        ticker: token.ticker,
        name: token.name,
        image: token.image,
        network: token.network,
        isFiat: token.isFiat,
        supportsFixedRate: token.supportsFixedRate,
      })
    }

    toggleTokenList()
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const filteredCurrencies = currencies.filter(
      (currency) =>
        currency.name.toLowerCase().includes(value.toLowerCase()) ||
        currency.ticker.toLowerCase().includes(value.toLowerCase()) ||
        currency.network.toLowerCase().includes(value.toLowerCase())
    )
    setFilteredCurrencies(filteredCurrencies)
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
          <Input
            placeholder='Search for a token'
            className='h-12 capitalize'
            onChange={handleSearch}
          />

          <ScrollArea className='h-full w-full max-h-[350px] space-y-2'>
            {filteredCurrencies?.map((currency, index) => (
              <div
                key={index}
                className='w-full bg-zinc-100 flex gap-2 items-center px-3 py-2 rounded-xl hover:bg-zinc-200 cursor-pointer transition-all duration-300'
                onClick={() => handleClick(currency)}
              >
                {currency.image && (
                  <Image
                    src={currency.image}
                    alt={currency.name}
                    className='object-contain object-center w-8 h-8'
                    width={32}
                    height={32}
                  />
                )}
                <div className='flex flex-col gap-1'>
                  <div className='flex gap-2 items-center'>
                    <Symbol
                      className='text-sm font-bold uppercase text-zinc-900'
                      symbol={currency.ticker}
                    />
                    <Badge>
                      <span className='text-xs uppercase'>{currency.network}</span>
                    </Badge>
                  </div>
                  <TokenName className='text-sm capitalize' name={currency.name} />
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
