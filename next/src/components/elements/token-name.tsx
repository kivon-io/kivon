import { cn } from "@/lib/utils"

const TokenName = ({ name, className }: { name: string; className?: string }) => {
  return (
    <p
      className={cn(
        "text-sm text-zinc-500 dark:text-zinc-300 select-none pointer-events-none capitalize",
        className
      )}
    >
      {name}
    </p>
  )
}

export default TokenName
