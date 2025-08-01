"use client"

import BridgeAction from "./action"
import SelectAsset from "./select-asset"

const Bridge = () => {
  return (
    <div className='flex flex-col gap-1'>
      <div className='h-fit rounded-3xl bg-gradient-to-b from-white to-zinc-100 dark:from-neutral-900 dark:to-neutral-950 border border-zinc-200 dark:border-zinc-800 p-5 flex flex-col gap-5'>
        <SelectAsset />
        <BridgeAction />
        {/* <div className='border-t border-zinc-200 dark:border-zinc-800 pt-4 mt-1 flex flex-col gap-4'>
          <DialogTips />
        </div> */}
      </div>
    </div>
  )
}

export default Bridge
