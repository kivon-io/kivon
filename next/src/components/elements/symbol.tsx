import { cn } from "@/lib/utils"

const Symbol = ({ symbol, className }: { symbol: string; className?: string }) => {
  return (
    <p className={cn("text-sm text-zinc-500 select-none pointer-events-none", className)}>
      {symbol}
    </p>
  )
}

export default Symbol
