import Buy from "./buy"
import Defi from "./defi"
import Exchange from "./exchange"
import Sell from "./sell"
import SwapZoneContainer from "./swap-zone-container"

const Swap = () => {
  return (
    <SwapZoneContainer>
      <Exchange />
      <Buy />
      <Sell />
      <Defi />
    </SwapZoneContainer>
  )
}

export default Swap
