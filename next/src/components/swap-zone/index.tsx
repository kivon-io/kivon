import Buy from "./buy"
import Defi from "./defi"
import Exchange from "./exchange"
import Sell from "./sell"
import SwapZoneContainer from "./swap-zone-container"

const Swap = () => {
  return (
    <SwapZoneContainer className='relative z-10 mt-20 md:mt-0'>
      <Exchange />
      <Buy />
      <Sell />
      <Defi />
    </SwapZoneContainer>
  )
}

export default Swap
