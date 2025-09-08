import { Button } from "@/components/ui/button"
import { useBridge } from "@/context/bridge-context"
import TradingViewWidget from "@/lib/tradingview"
import { useTradingView } from "@/lib/tradingview/tradingview-context"
import { BsEye, BsEyeSlash } from "react-icons/bs"

export const ViewCharButton = () => {
  const { handleToggleChart, isChartOpen } = useTradingView()

  return (
    <Button variant='secondary' onClick={handleToggleChart}>
      {!isChartOpen ? (
        <BsEye className='size-4 text-secondary-custom' />
      ) : (
        <BsEyeSlash className='size-4 text-secondary-custom' />
      )}
      {isChartOpen ? "Hide Chart" : "View Chart"}
    </Button>
  )
}

const Chart = () => {
  const { isChartOpen } = useTradingView()
  const { origin } = useBridge().form.watch()

  if (!isChartOpen) return null

  return (
    <div className='h-[500px] chart-container rounded-2xl overflow-hidden'>
      <TradingViewWidget ticker={origin.tokenSymbol} />
    </div>
  )
}

export default Chart
