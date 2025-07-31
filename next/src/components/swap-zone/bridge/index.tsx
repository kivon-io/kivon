"use client"

import BridgeProvider from "@/context/bridge-context"
import SwapZoneContainer from "../swap-zone-container"
import Bridge from "./bridge"
import BridgeTokenList from "./bridge-token-list"

const BridgeInterface = ({ chains }: { chains: Chain[] }) => {
  return (
    <BridgeProvider chains={chains}>
      <SwapZoneContainer className='relative z-10 mt-20 md:mt-0'>
        <Bridge />
        <BridgeTokenList />
      </SwapZoneContainer>
    </BridgeProvider>
  )
}

export default BridgeInterface
