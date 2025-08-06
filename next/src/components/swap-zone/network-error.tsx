import { cn } from "@/lib/utils"
import { BsFillInfoCircleFill } from "react-icons/bs"

const NetworkError = ({ message, className }: { message: string; className?: string }) => {
  return (
    <div
      className={cn(
        "flex items-center gap-2 bg-red-500/10 border border-red-500/20 p-2 rounded-md",
        className
      )}
    >
      <BsFillInfoCircleFill className='text-red-500 dark:text-red-200' />
      <p className='text-sm text-red-500 dark:text-red-200 capitalize'>{message}</p>
    </div>
  )
}

export default NetworkError
