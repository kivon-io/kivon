import { cn } from "@/lib/utils"

const Symbol = ({ symbol, className }: { symbol: string; className?: string }) => {
  return (
    <p
      className={cn(
        "text-sm uppercase text-zinc-900 dark:text-white font-bold select-none pointer-events-none",
        className
      )}
    >
      {symbol}
    </p>
  )
}

export default Symbol
