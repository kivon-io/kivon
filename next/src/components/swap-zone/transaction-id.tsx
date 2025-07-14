import { cn } from "@/lib/utils"
import { Check, Copy } from "lucide-react"
import { useState } from "react"
import { Button } from "../ui/button"

const TransactionId = ({
  transactionId,
  className,
}: {
  transactionId: string
  className?: string
}) => {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(transactionId)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  if (!transactionId) return null

  return (
    <div
      className={cn(
        "w-fit ml-auto flex items-center gap-2 bg-zinc-100 rounded-lg px-2 relative right-5 border border-zinc-200 py-1",
        className
      )}
    >
      <p className='text-xs text-zinc-500'>Transaction ID:</p>
      <div className='flex items-center gap-2'>
        <p className='text-xs text-zinc-900 font-medium'>{transactionId}</p>
        <Button
          size='icon'
          variant='ghost'
          className='h-5 w-5 hover:bg-transparent'
          onClick={handleCopy}
        >
          {isCopied ? <Check /> : <Copy />}
        </Button>
      </div>
    </div>
  )
}

export default TransactionId
