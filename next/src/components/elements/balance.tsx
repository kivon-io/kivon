import { useBridge } from "@/context/bridge-context"
import { cn } from "@/lib/utils"
import { useBalanceCheck } from "@/lib/wallet/use-balance-check"
import { useAccount } from "wagmi"

const Balance = ({ className }: { className?: string }) => {
  const { address } = useAccount()
  const { form } = useBridge()
  const chainId = form.watch("origin.chainId")
  const token = form.watch("origin.tokenContractAddress")
  const amount = form.watch("amount")
  const isNative = form.watch("origin.tokenIsNative")

  const { hasInsufficientBalance, balanceSmartFormatted } = useBalanceCheck(
    address,
    token,
    chainId,
    amount,
    isNative
  )

  if (!address) return null

  return (
    <div
      className={cn(
        "text-zinc-500 dark:text-zinc-400 text-xs",
        hasInsufficientBalance && "text-red-500 dark:text-red-200",
        className
      )}
    >
      Balance: {balanceSmartFormatted}
    </div>
  )
}

export default Balance
