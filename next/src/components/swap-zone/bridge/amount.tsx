import { Button } from "@/components/ui/button"
import { useBridge } from "@/context/bridge-context"
import { EXCHANGE_TYPE } from "@/lib/shared/constants"
import { formatAmount } from "@/lib/utils"
import { LuArrowDownUp } from "react-icons/lu"

const AmountComponent = ({ type }: { type: "send" | "receive" }) => {
  // depeding on the type show the value in usd or amount formatted
  const { quote, isShowUsd, handleToggleUsd } = useBridge()

  // amount amount to readable format add commas where needed, should not add commad after the decimal point

  // amount formatted
  const amount =
    type === EXCHANGE_TYPE.SEND
      ? quote
        ? quote?.details.currencyIn.amountFormatted
        : 0
      : quote
      ? quote?.details.currencyOut.amountFormatted
      : 0

  // USD
  const usd =
    type === EXCHANGE_TYPE.SEND
      ? quote
        ? formatAmount(quote.details.currencyIn.amountUsd)
        : "0.00"
      : quote
      ? formatAmount(quote.details.currencyOut.amountUsd)
      : "0.00"
  const amountFormatted = isShowUsd ? `$${usd}` : formatAmount(amount.toString())

  // impact in % only show if the type is receive
  const totalImpact = type === EXCHANGE_TYPE.RECEIVE ? quote?.details.totalImpact.percent : null

  return (
    <div className='flex gap-1 items-center'>
      <p className='text-xs md:text-sm font-medium text-zinc-500 dark:text-zinc-400'>
        {amountFormatted} {totalImpact && `(${totalImpact}%)`}
      </p>
      {type === EXCHANGE_TYPE.SEND && (
        <Button
          className='rounded-lg h-fit py-1 px-1.5 w-fit'
          variant='outline'
          size='icon'
          onClick={handleToggleUsd}
        >
          <LuArrowDownUp className='text-zinc-600 text-xs' />
        </Button>
      )}
    </div>
  )
}

export default AmountComponent
