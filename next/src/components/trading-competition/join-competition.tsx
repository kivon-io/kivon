"use client"

import { useDynamicWallet } from "@/lib/wallet/use-dynamic-wallet"
import { trpc } from "@/trpc/client"
import { useDynamicContext } from "@dynamic-labs/sdk-react-core"
import { FiCheckCircle } from "react-icons/fi"
import { toast } from "sonner"
import { Button } from "../ui/button"

const JoinCompetition = ({ competition }: { competition: Competition }) => {
  const { address, isConnected } = useDynamicWallet()
  const { setShowAuthFlow } = useDynamicContext()
  const { mutateAsync: joinCompetition, isPending } = trpc.joinCompetition.useMutation()
  const { data: isUserJoined, isPending: isCheckingIfUserJoined } =
    trpc.checkIfUserJoinedCompetition.useQuery(
      {
        id: competition.id,
        userAddress: (address as string) ?? "",
      },
      {
        enabled: Boolean(isConnected && address),
      }
    )

  const handleJoinCompetition = async () => {
    if (!isConnected) {
      setShowAuthFlow(true)
      return
    }

    try {
      const response = await joinCompetition({
        id: competition.id,
        userAddress: address as string,
      })

      if (response.id) {
        toast.success("Competition joined successfully")
      }
    } catch (error) {
      console.error(error)
      toast.error("Failed to join competition")
    }
  }

  return isUserJoined && !isCheckingIfUserJoined ? (
    <div className='text-emerald-600 dark:text-emerald-400 flex items-center gap-2 border border-emerald-200 dark:border-emerald-800 rounded-lg px-2 py-1 bg-emerald-50 dark:bg-emerald-950'>
      <FiCheckCircle className='size-4 text-emerald-600 dark:text-emerald-400' />
      Joined{" "}
    </div>
  ) : (
    <Button
      variant='tertiary'
      onClick={handleJoinCompetition}
      disabled={isPending}
      busy={isPending}
    >
      {!isConnected ? "Connect Wallet" : isPending ? "Joining..." : "Join Competition"}
    </Button>
  )
}

export default JoinCompetition
