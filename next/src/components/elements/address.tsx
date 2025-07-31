import { cn } from "@/lib/utils"

const Address = ({ address, className }: { address: string; className?: string }) => {
  const shortAddress = address.slice(0, 6) + "..." + address.slice(-4)
  return <p className={cn("text-sm text-zinc-500 dark:text-zinc-400", className)}>{shortAddress}</p>
}

export default Address
