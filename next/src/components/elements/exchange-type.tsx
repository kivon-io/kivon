import { cn } from "@/lib/utils"

const ExchangeType = ({ type, className }: { type: "send" | "receive"; className?: string }) => {
  return (
    <p className={cn("text-sm text-zinc-500 dark:text-zinc-300", className)}>
      {type === "send" ? "Send" : "Receive"}
    </p>
  )
}

export default ExchangeType
