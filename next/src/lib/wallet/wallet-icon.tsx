import Image from "next/image"
import { cn } from "../utils"
import { useDynamicWallet } from "./use-dynamic-wallet"

const WalletIcon = ({ className }: { className?: string }) => {
  const { connectorName, connectorIcon } = useDynamicWallet()

  return connectorIcon ? (
    <Image
      src={connectorIcon}
      alt={connectorName || "Wallet"}
      width={24}
      height={24}
      className={cn("rounded-sm", className)}
    />
  ) : (
    <div className='h-6 w-6 rounded-full border border-zinc-200 dark:border-zinc-800 bg-gradient-to-b from-zinc-100 to-zinc-500 dark:from-zinc-400 dark:to-zinc-900' />
  )
}

export default WalletIcon
