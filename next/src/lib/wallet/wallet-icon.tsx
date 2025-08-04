import Image from "next/image"
import { useEffect, useState } from "react"
import { useAccount } from "wagmi"
import { cn } from "../utils"

const WalletIcon = ({ className }: { className?: string }) => {
  const { connector } = useAccount()

  const [connectorIcon, setConnectorIcon] = useState<string | null>(null)

  // Fetch connector icon
  useEffect(() => {
    const fetchConnectorIcon = async () => {
      if (connector?.icon) {
        setConnectorIcon(connector.icon)
        return
      }

      // @ts-expect-error - rkDetails.iconUrl is a known property from the connector
      if (connector?.rkDetails?.iconUrl) {
        try {
          // @ts-expect-error - iconUrl is an async function
          const icon = await connector.rkDetails.iconUrl()
          setConnectorIcon(icon)
        } catch (error) {
          console.error("Failed to fetch connector icon:", error)
          setConnectorIcon(null)
        }
      }
    }

    fetchConnectorIcon()
  }, [connector])

  //   console.log("connector: ", connector)

  return connectorIcon ? (
    <Image
      src={connectorIcon}
      alt={connector?.name || "Wallet"}
      width={24}
      height={24}
      className={cn("rounded-sm", className)}
    />
  ) : (
    <div className='h-6 w-6 rounded-full border border-zinc-200 dark:border-zinc-800 bg-gradient-to-b from-zinc-100 to-zinc-500 dark:from-zinc-400 dark:to-zinc-900' />
  )
}

export default WalletIcon
