import { cn } from "@/lib/utils"

const TokenName = ({ name, className }: { name: string; className?: string }) => {
  return <p className={cn("text-sm text-zinc-500", className)}>{name}</p>
}

export default TokenName
