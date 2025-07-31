"use client"

import { ExchangeT } from "@/components/elements/exchange-type"
import { Heading } from "@/components/elements/heading"
import { useAppContext } from "@/context/app-context"
import { useBridge } from "@/context/bridge-context"
import { EXCHANGE_TYPE } from "@/lib/shared/constants"
import { HiOutlineArrowSmRight } from "react-icons/hi"
import SelectAssetCard from "../select-asset-card"
import { BridgeFormSchema } from "./constants"

const SelectAsset = () => {
  const { form } = useBridge()

  const origin = form.watch("origin")
  const destination = form.watch("destination")

  const handleSwitchTokens = () => {}
  return (
    <div className='flex flex-col gap-8 items-center justify-center w-full'>
      <Heading as='h2' className='text-center text-sm md:text-base'>
        Select which assets to bridge
      </Heading>

      <div className='grid grid-cols-12 gap-0 w-full'>
        <CoinCard type={EXCHANGE_TYPE.SEND} className='col-span-5' token={origin} />
        <div className='col-span-2 flex items-center justify-center'>
          <div
            className='rounded-xl border border-zinc-200 dark:border-zinc-800 h-10 w-10 flex items-center justify-center cursor-pointer'
            onClick={handleSwitchTokens}
          >
            <HiOutlineArrowSmRight className='text-zinc-500 dark:text-zinc-300' />
          </div>
        </div>
        <CoinCard type={EXCHANGE_TYPE.RECEIVE} className='col-span-5' token={destination} />
      </div>
    </div>
  )
}

export default SelectAsset

const CoinCard = ({
  type,
  token,
  className,
}: {
  type: ExchangeT
  token: BridgeFormSchema["origin"] | BridgeFormSchema["destination"]
  className?: string
}) => {
  const { toggleBridgeTokenList } = useAppContext()

  const handleClick = () => {
    toggleBridgeTokenList()
  }

  return <SelectAssetCard type={type} token={token} onClick={handleClick} className={className} />
}
