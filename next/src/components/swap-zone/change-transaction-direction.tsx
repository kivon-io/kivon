import { cn } from "@/lib/utils"
import { HiOutlineArrowNarrowDown, HiOutlineArrowNarrowUp } from "react-icons/hi"

const ChangeTransactionDirection = ({
  handleChangeSwapDirection,
  className,
}: {
  handleChangeSwapDirection: () => void
  className?: string
}) => {
  return (
    <div
      className={cn(
        "group rounded-lg relative right-10 h-10 w-10 flex items-center justify-center border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 transition duration-200 cursor-pointer",
        className
      )}
      onClick={handleChangeSwapDirection}
    >
      <HiOutlineArrowNarrowDown className='text-zinc-600 text-sm group-hover:translate-y-0.5 duration-200 transition-all' />
      <HiOutlineArrowNarrowUp className='text-zinc-600 text-sm group-hover:-translate-y-0.5 duration-200 transition-all' />
    </div>
  )
}

export default ChangeTransactionDirection
