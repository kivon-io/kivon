"use client"

import { useBridge } from "@/context/bridge-context"
import { useTradingView } from "@/lib/tradingview/tradingview-context"
import { cn, isConnectedChainEnabled } from "@/lib/utils"
import Menu from "../menu"
import DataError from "../network-error"
import BridgeAction from "./action"
import BridgeInfo from "./bridge-info"
import Chart, { ViewCharButton } from "./chart"
import Details from "./details"
import SelectAsset from "./select-asset"
import Slippage from "./slippage"

const Bridge = () => {
  const { origin } = useBridge().form.watch()
  const checkChainisEnabled = isConnectedChainEnabled(origin)
  const { isChartOpen } = useTradingView()

  return (
    <div
      className={cn(
        "grid grid-cols-12 gap-4 max-w-lg mx-auto",
        isChartOpen ? "grid-cols-12 max-w-7xl" : "grid-cols-1"
      )}
    >
      <div className={cn("col-span-12", isChartOpen ? "col-span-12 md:col-span-8" : "col-span-8")}>
        <Chart />
      </div>
      <div
        className={cn(
          "col-span-12 flex flex-col gap-1",
          isChartOpen ? "col-span-12 md:col-span-4" : "col-span-12"
        )}
      >
        <Menu>
          <Slippage />
        </Menu>

        <div className='h-fit rounded-3xl bg-gradient-to-b from-white to-zinc-100 dark:from-neutral-900 dark:to-neutral-950 border border-zinc-200 dark:border-zinc-800 p-5 flex flex-col gap-5'>
          <SelectAsset />
          <BridgeInfo />
          {!checkChainisEnabled && (
            <DataError message={`${origin.chainName} is currently unavailable`} />
          )}
          <BridgeAction />
          {/* <div className='border-t border-zinc-200 dark:border-zinc-800 pt-4 mt-1 flex flex-col gap-4'>
          <DialogTips />
        </div> */}
        </div>
        <Details />
        <div className='mt-1'>
          <ViewCharButton />
        </div>
      </div>
    </div>
  )
}

export default Bridge
