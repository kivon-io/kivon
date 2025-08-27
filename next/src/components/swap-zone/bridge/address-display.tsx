"use client"

import { ExchangeT } from "@/components/elements/exchange-type"
import { useBridge } from "@/context/bridge-context"
import { EXCHANGE_TYPE } from "@/lib/shared/constants"
import { cn, formatAddress } from "@/lib/utils"
import { MdOutlineKeyboardArrowDown } from "react-icons/md"

const AddressDisplay = ({
  address,
  type,
  className,
}: {
  address: string
  type: ExchangeT
  className?: string
}) => {
  const { handleOpenRecipientAddressDialog } = useBridge()
  return (
    <div
      className={cn(
        "flex items-center gap-1 font-semibold font-mono text-xs text-secondary-custom ",
        type === EXCHANGE_TYPE.RECEIVE && "cursor-pointer",
        className
      )}
      onClick={() => type === EXCHANGE_TYPE.RECEIVE && handleOpenRecipientAddressDialog(true)}
    >
      {formatAddress(address)}
      {type === EXCHANGE_TYPE.RECEIVE && (
        <div className='relative shrink-0'>
          <MdOutlineKeyboardArrowDown className='size-4' />
        </div>
      )}
    </div>
  )
}

export default AddressDisplay
