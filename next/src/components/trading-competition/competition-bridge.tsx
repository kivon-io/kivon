"use client"

import { useRouter } from "next/navigation"
import { Button } from "../ui/button"

export const CompetitionBridge = ({ competition }: { competition: Competition }) => {
  const router = useRouter()

  const handleBridge = () => {
    router.push(
      `/bridge?step=ti&fromCurrency=${competition.originCurrency.currencyAddress}&fromChainId=${competition.originChain.chainId}&toCurrency=${competition.destinationCurrency.currencyAddress}&toChainId=${competition.destinationChain.chainId}`
    )
  }
  return (
    <Button variant='tertiary' size='sm' onClick={handleBridge}>
      Bridge
    </Button>
  )
}
