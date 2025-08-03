import { cn } from "@/lib/utils"

const Balance = ({ className }: { className?: string }) => {
  return (
    <div className={cn("text-zinc-500 dark:text-zinc-400 text-xs", className)}>Balance: 0.002</div>
  )
}

export default Balance
