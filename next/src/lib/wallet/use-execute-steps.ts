import transactionFailed from "@/data/transaction-failed.json"
import transactionHash from "@/data/transaction-hash.json"
import { RELAY_LINK_API_URL, SIMMULATE_FAILED } from "@/lib/shared/constants"
import { useState } from "react"
import { useAccount, useSwitchChain, useWalletClient } from "wagmi"
import { sendTransaction } from "wagmi/actions"
import { wagmiConfig } from "./wagmi"

export type StepStatus = "incomplete" | "pending" | "complete" | "failed"

export type ExecutionStatus = "idle" | "executing" | "polling" | "success" | "failed"

export type CheckResultT = {
  status: "success" | "failure" | "refund"
  details: string
  inTxHashes: string[]
  txHashes: string[]
  time: number
  originChainId: number
  destinationChainId: number
}

export const useExecuteSteps = () => {
  const { address, chainId } = useAccount()
  const { data: walletClient } = useWalletClient()
  const { switchChainAsync } = useSwitchChain()

  //   const { writeContract } = useWriteContract()

  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [currentItemIndex, setCurrentItemIndex] = useState(0)
  const [executionStatus, setExecutionStatus] = useState<ExecutionStatus>("idle")
  const [steps, setSteps] = useState<Step[]>([])
  const [error, setError] = useState<string | null>(null)
  const [checkResult, setCheckResult] = useState<CheckResultT | null>(null)
  const [simulate, setSimulate] = useState<boolean>(
    process.env.NEXT_PUBLIC_SIMULATE_EXECUTION === "true"
  )

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

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
    setCheckResult(null)
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
    // Always mark as pending first so UI updates immediately
    updateStepItemStatus(currentStepIndex, currentItemIndex, "pending")

    if (simulate) {
      // Simulate a 10s execution delay then mark complete
      await delay(5_000)
      updateStepItemStatus(currentStepIndex, currentItemIndex, "complete")
      return
    }

    if (!walletClient || !address) {
      throw new Error("Wallet not connected")
    }
    if (item.data.chainId && item.data.chainId !== chainId) {
      await switchChainAsync({ chainId: item.data.chainId })
    }

    try {
      const hash = await sendTransaction(wagmiConfig, {
        account: address,
        to: item.data.to as `0x${string}`,
        data: item.data.data as `0x${string}`,
        value: BigInt(item.data.value),
        gas: BigInt(item.data.gas),
        maxFeePerGas: BigInt(item.data.maxFeePerGas),
        maxPriorityFeePerGas: BigInt(item.data.maxPriorityFeePerGas),
        // @ts-expect-error - chainId is a valid property
        chainId: item.data.chainId,
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

  const executeSignature = async (_item: StepItem) => {
    console.log("executeSignature", _item)
    // Simulate signatures too when simulate flag is on
    if (simulate) {
      updateStepItemStatus(currentStepIndex, currentItemIndex, "pending")
      await delay(100_000)
      updateStepItemStatus(currentStepIndex, currentItemIndex, "complete")
      return
    }

    // TODO: Implement signature execution based on signatureKind
    throw new Error("Signature execution not implemented yet")
  }

  const pollForCompletion = async (check: { endpoint: string; method: string }) => {
    if (simulate && !SIMMULATE_FAILED) {
      // In simulate mode, consider the item complete already and skip remote polling
      updateStepItemStatus(currentStepIndex, currentItemIndex, "complete")
      setCheckResult(transactionHash as unknown as CheckResultT)
      return transactionHash
    } else if (simulate && SIMMULATE_FAILED) {
      updateStepItemStatus(currentStepIndex, currentItemIndex, "failed")
      setExecutionStatus("failed")
      setCheckResult(transactionFailed as unknown as CheckResultT)
      return transactionFailed
    }

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
        // console.log("attempt result: ", { attempts, result })

        if (result.status === "success") {
          updateStepItemStatus(currentStepIndex, currentItemIndex, "complete")
          setCheckResult(result)
          // console.log("attempt: ", result)
          return result
        } else if (result.status === "failure" || result.status === "refund") {
          updateStepItemStatus(currentStepIndex, currentItemIndex, "failed")
          setExecutionStatus("failed")
          setCheckResult(result)
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
    setCurrentStepIndex(0)
    setCurrentItemIndex(0)
    setExecutionStatus("idle")
    setSteps([])
    setError(null)
    setCheckResult(null)
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
    simulate,
    setSimulate,
    checkResult,
  }
}
