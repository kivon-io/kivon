import { useBridge } from "@/context/bridge-context"
import { cn } from "@/lib/utils"
import { useBalanceCheck } from "@/lib/wallet/use-balance-check"
import { useDynamicWallet } from "@/lib/wallet/use-dynamic-wallet"

const Balance = ({ className }: { className?: string }) => {
  const { address } = useDynamicWallet()
  const { form } = useBridge()
  const chainId = form.watch("origin.chainId")
  const token = form.watch("origin.tokenContractAddress")
  const amount = form.watch("amount")
  const isNative = form.watch("origin.tokenIsNative")

  const { hasInsufficientBalance, balanceSmartFormatted } = useBalanceCheck(
    address as `0x${string}`,
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
