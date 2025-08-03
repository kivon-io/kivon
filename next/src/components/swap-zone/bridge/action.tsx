"use client"

import { Button } from "@/components/ui/button"
import { useBridge } from "@/context/bridge-context"
import { BRIDGE_STAGES } from "./constants"

const BridgeAction = () => {
  const { step, handleStep } = useBridge()

  const handleNextStep = () => {
    if (step === BRIDGE_STAGES.SELECT_ASSET) {
      handleStep(BRIDGE_STAGES.TRANSACTION_INFORMATION)
    }
  }

  return (
    <Button
      onClick={handleNextStep}
      className='w-full h-12 rounded-lg bg-primary dark:bg-white dark:text-black'
    >
      {step === BRIDGE_STAGES.SELECT_ASSET ? "Continue" : "Connect Wallet"}
    </Button>
  )
}

export default BridgeAction
