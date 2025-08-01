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
import { EXCHANGE_TYPE } from "@/lib/shared/constants"
import { useUpdateSwapUrl } from "@/lib/shared/urlParams"
import { useState } from "react"
import { useMediaQuery } from "usehooks-ts"
import Badge from "../decorations/badge"
import Symbol from "../elements/symbol"
import TokenName from "../elements/token-name"
import { Input } from "../ui/input"
import { ScrollArea } from "../ui/scroll-area"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "../ui/sheet"
import TokenLogo from "./token-logo"

const TokenList = () => {
  const updateSwapUrl = useUpdateSwapUrl()
  const isMobile = useMediaQuery("(max-width: 768px)")

  const { state, type, toggleTokenList } = useAppContext()
  const { form, currencies } = useExchange()

  const open = state.tokenListOpen
  const [filteredCurrencies, setFilteredCurrencies] = useState<Currency[]>(currencies || [])

  if (!currencies) return null

  const onOpenChange = () => {
    toggleTokenList()
  }

  // set from and to in the url only if exist if not don't set it

  const handleClick = (token: Currency) => {
    if (type === EXCHANGE_TYPE.SEND) {
      form.setValue("sendToken", {
        ticker: token.ticker,
        legacyTicker: token.legacyTicker,
        name: token.name,
        image: token.image,
        network: token.network,
        isFiat: token.isFiat,
        supportsFixedRate: token.supportsFixedRate,
      })
      updateSwapUrl("from", token.legacyTicker || token.ticker)
    } else {
      form.setValue("receiveToken", {
        ticker: token.ticker,
        legacyTicker: token.legacyTicker,
        name: token.name,
        image: token.image,
        network: token.network,
        isFiat: token.isFiat,
        supportsFixedRate: token.supportsFixedRate,
      })
      updateSwapUrl("to", token.legacyTicker || token.ticker)
    }

    toggleTokenList()
    setFilteredCurrencies(currencies)
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

  return isMobile ? (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side='bottom' className='bg-white dark:bg-black/90 rounded-t-3xl'>
        <SheetHeader>
          <SheetTitle>Select a token</SheetTitle>
          <SheetDescription>Select a token to swap</SheetDescription>
        </SheetHeader>
        <div className='flex flex-col gap-4 px-2 h-full relative'>
          <Input
            placeholder='Search for a token'
            className='h-12 capitalize'
            onChange={handleSearch}
          />

          <ScrollArea className='relative w-full max-h-[500px] space-y-2 overflow-y-auto'>
            {filteredCurrencies?.map((currency, index) => (
              <TokenItem key={index} currency={currency} handleClick={handleClick} />
            ))}
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  ) : (
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
              <TokenItem key={index} currency={currency} handleClick={handleClick} />
            ))}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default TokenList

const TokenItem = ({
  currency,
  handleClick,
}: {
  currency: Currency
  handleClick: (currency: Currency) => void
}) => {
  return (
    <div
      className='mb-2 w-full border border-zinc-200 dark:border-zinc-900 bg-zinc-100 dark:bg-neutral-950 flex gap-2 items-center px-3 py-2 rounded-xl hover:bg-zinc-200 dark:hover:bg-neutral-900 cursor-pointer transition-all duration-300'
      onClick={() => handleClick(currency)}
    >
      {currency.image && <TokenLogo src={currency.image} alt={currency.ticker} />}
      <div className='flex flex-col gap-1'>
        <div className='flex gap-2 items-center'>
          <Symbol symbol={currency.ticker} />
          <Badge>
            <span className='text-xs uppercase font-medium'>{currency.network}</span>
          </Badge>
        </div>
        <TokenName name={currency.name} />
      </div>
    </div>
  )
}
