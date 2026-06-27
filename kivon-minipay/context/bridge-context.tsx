"use client"

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react"
import {
  DEFAULT_DESTINATION,
  DEFAULT_ORIGIN,
} from "@/lib/bridge/constants"
import type { BridgeAsset } from "@/lib/bridge/types"

/** Whether the large amount field is currently expressed in token units or USD. */
export type AmountMode = "token" | "usd"

type BridgeContextValue = {
  origin: BridgeAsset | null
  destination: BridgeAsset | null
  setOrigin: (asset: BridgeAsset) => void
  setDestination: (asset: BridgeAsset) => void

  /** Raw string the user typed, expressed in the active `amountMode`. */
  amount: string
  setAmount: (value: string) => void

  amountMode: AmountMode
  toggleAmountMode: () => void

  /** Price of one origin token in USD. Null until a price source is wired up. */
  originUsdPrice: number | null
  setOriginUsdPrice: (price: number | null) => void

  /** `amount` normalised to token units, regardless of the active mode. */
  tokenAmount: number
  /** `amount` normalised to USD, or null when no price is available. */
  usdAmount: number | null

  /** Destination recipient. Must be set explicitly before bridging. */
  recipient: string | null
  setRecipient: (address: string | null) => void
}

const BridgeContext = createContext<BridgeContextValue | null>(null)

/** Keep only a valid decimal string (digits + a single dot). */
function sanitizeAmount(value: string) {
  const cleaned = value.replace(/[^0-9.]/g, "")
  const [whole, ...rest] = cleaned.split(".")
  if (rest.length === 0) return whole
  return `${whole}.${rest.join("")}`
}

export function BridgeProvider({ children }: { children: React.ReactNode }) {
  const [origin, setOriginState] = useState<BridgeAsset | null>(DEFAULT_ORIGIN)
  const [destination, setDestinationState] = useState<BridgeAsset | null>(
    DEFAULT_DESTINATION
  )
  const [amount, setAmountState] = useState("")
  const [amountMode, setAmountMode] = useState<AmountMode>("token")
  const [originUsdPrice, setOriginUsdPrice] = useState<number | null>(null)
  const [recipient, setRecipient] = useState<string | null>(null)

  const setAmount = useCallback((value: string) => {
    setAmountState(sanitizeAmount(value))
  }, [])

  const setOrigin = useCallback((asset: BridgeAsset) => {
    setOriginState(asset)
    setOriginUsdPrice(null)
    setAmountMode("token")
  }, [])

  const setDestination = useCallback((asset: BridgeAsset) => {
    setDestinationState(asset)
    setRecipient(null)
  }, [])

  const numericAmount = Number(amount) || 0

  const { tokenAmount, usdAmount } = useMemo(() => {
    if (amountMode === "token") {
      return {
        tokenAmount: numericAmount,
        usdAmount: originUsdPrice != null ? numericAmount * originUsdPrice : null,
      }
    }
    // amount is in USD — convert back to token units when we know the price.
    return {
      tokenAmount:
        originUsdPrice != null && originUsdPrice > 0
          ? numericAmount / originUsdPrice
          : 0,
      usdAmount: numericAmount,
    }
  }, [amountMode, numericAmount, originUsdPrice])

  const toggleAmountMode = useCallback(() => {
    setAmountMode((prevMode) => {
      const nextMode: AmountMode = prevMode === "token" ? "usd" : "token"

      // Convert the visible value so the underlying token amount is preserved.
      if (originUsdPrice != null && originUsdPrice > 0) {
        const current = Number(amount) || 0
        const converted =
          nextMode === "usd" ? current * originUsdPrice : current / originUsdPrice
        setAmountState(converted ? trimFloat(converted) : "")
      }

      return nextMode
    })
  }, [amount, originUsdPrice])

  const value = useMemo<BridgeContextValue>(
    () => ({
      origin,
      destination,
      setOrigin,
      setDestination,
      amount,
      setAmount,
      amountMode,
      toggleAmountMode,
      originUsdPrice,
      setOriginUsdPrice,
      tokenAmount,
      usdAmount,
      recipient,
      setRecipient,
    }),
    [
      origin,
      destination,
      setOrigin,
      setDestination,
      amount,
      setAmount,
      amountMode,
      toggleAmountMode,
      originUsdPrice,
      tokenAmount,
      usdAmount,
      recipient,
    ]
  )

  return <BridgeContext.Provider value={value}>{children}</BridgeContext.Provider>
}

export function useBridge() {
  const context = useContext(BridgeContext)
  if (!context) {
    throw new Error("useBridge must be used within a BridgeProvider")
  }
  return context
}

/** Drop trailing zeros from a converted float without scientific notation. */
function trimFloat(value: number) {
  return parseFloat(value.toFixed(6)).toString()
}
