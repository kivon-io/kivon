import { RELAY_LINK_API_URL } from "@/lib/shared/constants"
import { useState } from "react"
import { useAccount, useWalletClient } from "wagmi"
import { Chain as WagmiChain } from "wagmi/chains"

export type StepStatus = "incomplete" | "pending" | "complete" | "failed"

export type ExecutionStatus = "idle" | "executing" | "polling" | "success" | "failed"

export const useExecuteSteps = () => {
  const { address } = useAccount()
  const { data: walletClient } = useWalletClient()
  //   const { writeContract } = useWriteContract()

  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [currentItemIndex, setCurrentItemIndex] = useState(0)
  const [executionStatus, setExecutionStatus] = useState<ExecutionStatus>("idle")
  const [steps, setSteps] = useState<Step[]>([])
  const [error, setError] = useState<string | null>(null)

  const executeSteps = async (quote: Quote) => {
    if (!quote.steps || quote.steps.length === 0) {
      setError("No steps to execute")
      return
    }

    // Cast incoming quote steps to our Step type
    const stepArray = quote.steps as Step[]
    setSteps(stepArray)
    setExecutionStatus("executing")
    setError(null)
    setCurrentStepIndex(0)
    setCurrentItemIndex(0)

    try {
      await processSteps(stepArray)
    } catch (err) {
      // propagate user rejection to caller
      if (err instanceof Error && err.message === "USER_REJECTED") {
        throw err
      }
      setError(err instanceof Error ? err.message : "Execution failed")
      setExecutionStatus("failed")
    }
  }

  const processSteps = async (stepsToProcess: Step[]) => {
    for (let stepIndex = 0; stepIndex < stepsToProcess.length; stepIndex++) {
      setCurrentStepIndex(stepIndex)
      const step = stepsToProcess[stepIndex]

      // Skip steps with no items
      if (!step.items || step.items.length === 0) {
        continue
      }

      for (let itemIndex = 0; itemIndex < step.items.length; itemIndex++) {
        setCurrentItemIndex(itemIndex)
        const item = step.items[itemIndex]

        if (item.status === "complete") {
          continue
        }

        if (step.kind === "transaction") {
          await executeTransaction(item)
        } else if (step.kind === "signature") {
          await executeSignature(item)
        }

        // Poll for completion if check endpoint exists
        if (item.check) {
          await pollForCompletion(item.check)
        }
      }
    }

    setExecutionStatus("success")
  }

  const executeTransaction = async (item: StepItem) => {
    if (!walletClient || !address) {
      throw new Error("Wallet not connected")
    }

    try {
      // Update step status locally
      updateStepItemStatus(currentStepIndex, currentItemIndex, "pending")

      const hash = await walletClient.sendTransaction({
        account: address,
        to: item.data.to as `0x${string}`,
        data: item.data.data as `0x${string}`,
        value: BigInt(item.data.value),
        gas: BigInt(item.data.gas),
        maxFeePerGas: BigInt(item.data.maxFeePerGas),
        maxPriorityFeePerGas: BigInt(item.data.maxPriorityFeePerGas),
        chainId: item.data.chainId as WagmiChain["id"],
      })

      return hash
    } catch (err) {
      updateStepItemStatus(currentStepIndex, currentItemIndex, "failed")

      // Handle user rejection specifically
      if (err instanceof Error) {
        if (err.message.includes("User denied") || err.message.includes("User rejected")) {
          throw new Error("USER_REJECTED")
        }
      }

      throw err
    }
  }

  const executeSignature = async (item: StepItem) => {
    // TODO: Implement signature execution based on signatureKind
    // This would handle EIP191 and EIP712 signatures
    console.log("item", item)
    throw new Error("Signature execution not implemented yet")
  }

  const pollForCompletion = async (check: { endpoint: string; method: string }) => {
    setExecutionStatus("polling")
    const maxAttempts = 60 // 5 minutes with 5 second intervals
    let attempts = 0

    while (attempts < maxAttempts) {
      try {
        const response = await fetch(`${RELAY_LINK_API_URL}${check.endpoint}`, {
          method: check.method,
        })

        if (!response.ok) {
          throw new Error(`Status check failed: ${response.status}`)
        }

        const result = await response.json()

        if (result.status === "success") {
          updateStepItemStatus(currentStepIndex, currentItemIndex, "complete")
          return
        } else if (result.status === "failure" || result.status === "refund") {
          updateStepItemStatus(currentStepIndex, currentItemIndex, "failed")
          throw new Error(`Transaction failed with status: ${result.status}`)
        }

        // Wait 5 seconds before next poll
        await new Promise((resolve) => setTimeout(resolve, 5000))
        attempts++
      } catch (err) {
        if (attempts === maxAttempts - 1) {
          throw err
        }
        await new Promise((resolve) => setTimeout(resolve, 5000))
        attempts++
      }
    }

    throw new Error("Polling timeout - transaction status unknown")
  }

  const updateStepItemStatus = (stepIndex: number, itemIndex: number, status: StepStatus) => {
    setSteps((prevSteps) => {
      const newSteps = [...prevSteps]
      if (newSteps[stepIndex]?.items[itemIndex]) {
        newSteps[stepIndex].items[itemIndex].status = status
      }
      return newSteps
    })
  }

  const reset = () => {
    console.log("reset called")
    setCurrentStepIndex(0)
    setCurrentItemIndex(0)
    setExecutionStatus("idle")
    setSteps([])
    setError(null)
  }

  return {
    executeSteps,
    currentStepIndex,
    currentItemIndex,
    executionStatus,
    steps,
    error,
    reset,
    isExecuting: executionStatus === "executing" || executionStatus === "polling",
  }
}
