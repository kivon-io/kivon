"use client"

import { useEffect, useMemo, useState } from "react"
import { useBridge } from "@/context/bridge-context"
import { useEffectiveRecipient } from "@/hooks/use-effective-recipient"
import { useQuote } from "@/hooks/use-quote"
import { useWallet } from "@/hooks/use-wallet"
import { CELO_CHAIN_ID, RELAY_BRIDGE_QUOTES_ENABLED, RELAY_TESTNET_QUOTE_MESSAGE } from "@/lib/network/config"
import type { GetQuoteInput } from "@/lib/relay/schemas"

const DEBOUNCE_MS = 500

export function useBridgeQuote() {
  const { origin, destination, tokenAmount, setOriginUsdPrice } = useBridge()
  const { address, chainId } = useWallet()
  const effectiveRecipient = useEffectiveRecipient()

  const [debouncedAmount, setDebouncedAmount] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedAmount(tokenAmount), DEBOUNCE_MS)
    return () => clearTimeout(timer)
  }, [tokenAmount])

  const quoteParams = useMemo<GetQuoteInput | null>(() => {
    if (!origin || !destination || debouncedAmount <= 0) return null

    return {
      user: address ?? origin.tokenAddress,
      originChainId: origin.chainId,
      destinationChainId: destination.chainId,
      originCurrency: origin.tokenAddress,
      destinationCurrency: destination.tokenAddress,
      amount: debouncedAmount.toString(),
      decimals: origin.tokenDecimals,
      destinationVmType: destination.vmType,
      connectedChainId: chainId ?? CELO_CHAIN_ID,
      ...(effectiveRecipient && { recipient: effectiveRecipient }),
    }
  }, [origin, destination, debouncedAmount, address, chainId, effectiveRecipient])

  const canFetch =
    RELAY_BRIDGE_QUOTES_ENABLED &&
    Boolean(origin && destination && debouncedAmount > 0)

  const query = useQuote(quoteParams, { enabled: canFetch })

  // Drive the USD ↔ token toggle from the live quote price.
  useEffect(() => {
    if (!query.data) return

    const inAmount = Number(query.data.details.currencyIn.amountFormatted)
    const inUsd = Number(query.data.details.currencyIn.amountUsd)

    if (inAmount > 0 && inUsd > 0) {
      setOriginUsdPrice(inUsd / inAmount)
    }
  }, [query.data, setOriginUsdPrice])

  return {
    quote: query.data ?? null,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    isReady: canFetch,
    isPendingInput: tokenAmount > 0 && debouncedAmount !== tokenAmount,
    quotesDisabled: !RELAY_BRIDGE_QUOTES_ENABLED,
    quotesDisabledMessage: RELAY_TESTNET_QUOTE_MESSAGE,
  }
}
