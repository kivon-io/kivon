"use client"

import ExchangeProvider from "@/context/exchange-context"
import Exchange from "./exchange"
import SwapZoneContainer from "./swap-zone-container"
import TokenList from "./token-list"

const Swap = ({ currencies, from, to }: { currencies: Currency[]; from: string; to: string }) => {
  return (
    <ExchangeProvider currencies={currencies} from={from} to={to}>
      <SwapZoneContainer className='relative z-10 mt-20 md:mt-0'>
        <Exchange />
        <TokenList />
      </SwapZoneContainer>
    </ExchangeProvider>
  )
}

export default Swap
