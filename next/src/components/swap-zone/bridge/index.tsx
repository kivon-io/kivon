"use client"

import BridgeProvider from "@/context/bridge-context"
import SwapZoneContainer from "../swap-zone-container"
import Bridge from "./bridge"
import BridgeTokenList from "./bridge-token-list"
import RecipientAddress from "./recipient-address"

const BridgeInterface = ({ chains }: { chains: Chain[] }) => {
  return (
    <BridgeProvider chains={chains}>
      <SwapZoneContainer className='relative z-10 mb-20 mt-20 md:mt-0'>
        <Bridge />
        <BridgeTokenList />
        <RecipientAddress />
      </SwapZoneContainer>
    </BridgeProvider>
  )
}

export default BridgeInterface
