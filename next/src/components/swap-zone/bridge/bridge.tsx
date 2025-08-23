"use client"

import { useBridge } from "@/context/bridge-context"
import { isConnectedChainEnabled } from "@/lib/utils"
import Menu from "../menu"
import DataError from "../network-error"
import BridgeAction from "./action"
import BridgeInfo from "./bridge-info"
import Details from "./details"
import SelectAsset from "./select-asset"
import Slippage from "./slippage"

const Bridge = () => {
  const { origin } = useBridge().form.watch()
  const checkChainisEnabled = isConnectedChainEnabled(origin)

  return (
    <div className='flex flex-col gap-1'>
      <Menu>
        <Slippage />
      </Menu>

      <div className='h-fit mb-20 rounded-3xl bg-gradient-to-b from-white to-zinc-100 dark:from-neutral-900 dark:to-neutral-950 border border-zinc-200 dark:border-zinc-800 p-5 flex flex-col gap-5'>
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
    </div>
  )
}

export default Bridge
