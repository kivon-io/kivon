import { cn } from "@/lib/utils"
import { BsFillInfoCircleFill } from "react-icons/bs"

const DataError = ({ message, className }: { message: string; className?: string }) => {
  return (
    <div
      className={cn(
        "flex items-start gap-2 bg-red-500/10 border border-red-500/20 p-2 rounded-md text-sm",
        className
      )}
    >
      <BsFillInfoCircleFill className='text-red-500 dark:text-red-200 size-4' />
      <p className=' text-red-500 dark:text-red-200 capitalize'>{message}</p>
    </div>
  )
}

export default DataError
