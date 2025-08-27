import { BridgeFormSchema, VM_TYPES } from "@/components/swap-zone/bridge/constants"
import { clsx, type ClassValue } from "clsx"
import superjson from "superjson"
import { twMerge } from "tailwind-merge"
import { Chain as WagmiChain } from "wagmi/chains"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const transformer = superjson

// format date to utc
export const formatDateToUtc = (date: string) => {
  return new Date(date).toUTCString()
}

export const formatDate = (date: string) => {
  if (!date) return ""

  return new Date(date).toLocaleString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export const appendUrlToTxHash = (url: string, txHash: string) => {
  // example: "https://www.oklink.com/base/tx/$$" replace $$ with txHash
  return url.replace("$$", txHash)
}

export const getProperUrl = (url: string) => {
  if (!url) return "/"

  // If it's an external URL, return as-is
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url
  }

  // Handle internal URLs
  let finalUrl = url

  // If URL doesn't start with /, add it
  if (!finalUrl.startsWith("/")) {
    finalUrl = `/${finalUrl}`
  }

  // Remove double slashes
  finalUrl = finalUrl.replace(/\/+/g, "/")

  return finalUrl
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getHeroData = (data: any) => {
  return data.dynamic_zone[0].hero
}

/*
@accpets chains array
@returns first chain and first 2 tokens from the featuredTokens array
*/
export const getFirstChainAndTokens = (chains: Chain[]) => {
  return {
    chain: chains[0],
    tokens: chains[0].featuredTokens.slice(0, 2),
  }
}

export const checkAddress = (address: string) => {
  return (
    address.length >= 26 &&
    (address.startsWith("0x") ||
      address.startsWith("1") ||
      address.startsWith("3") ||
      address.startsWith("bc1") ||
      address.match(/^[A-HJ-NP-Z1-9]{32,44}$/) ||
      address.match(/^[a-zA-Z0-9]{25,62}$/))
  )
}

export const formatAddress = (address: string) => {
  if (!address) return ""
  return address.slice(0, 6) + "..." + address.slice(-4)
}

/**
 * The `formatAmount` function formats a given amount string by adding commas to the integer part.
 * @param {string} amount - The `amount` parameter is a string representing a numerical value that may
 * or may not have decimal places. The function `formatAmount` is designed to format this numerical
 * value by adding commas as thousand separators and keeping the decimal places intact. If the `amount`
 * is "0.00", it will
 * @returns The `formatAmount` function takes a string `amount` as input and formats it by adding
 * commas to the integer part if it is not "0" or "0.00". If the input amount is "0.00", it returns
 * "0.00". If the input amount is "0", it returns "0". Otherwise, it splits the amount by the decimal
 * point, adds commas
 */
export const formatAmount = (amount: string) => {
  if (amount === "0.00") return "0.00"
  if (amount === "0") return "0"

  amount = Number(amount).toFixed(2)
  const parts = amount.split(".")
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  return parts.join(".")
}

export const isConnectedChainEnabled = (origin: BridgeFormSchema["origin"]) => {
  return origin.vmType === VM_TYPES.EVM
}

/*
  check if the user needs to provide a wallet address to receive the token
  this happens when the destination chains is not EVM and does match the connected wallet chain
*/

export const checkIfUserNeedsToProvideWalletAddress = (
  destination: BridgeFormSchema["destination"],
  connectedWalletChain: WagmiChain
) => {
  if (!connectedWalletChain) return false
  return destination.vmType !== VM_TYPES.EVM && destination.chainId !== connectedWalletChain.id
}

/**
 * Smart balance formatting function that adjusts decimal places based on amount
 * - For amounts >= 1: Show 1 decimal place
 * - For amounts < 1: Show decimals until first non-zero digit + 2 more digits
 * - For amounts between 1-10 with significant decimals: Show 4 decimal places
 */
export const formatSmartBalance = (balance: string | number): string => {
  if (!balance) return "0"

  const num = typeof balance === "string" ? parseFloat(balance) : balance

  if (isNaN(num)) return "0"
  if (num === 0) return "0"

  // For amounts >= 10, show 1 decimal place
  if (num >= 10) {
    return num.toFixed(1)
  }

  // For amounts between 1 and 10, show 4 decimal places for precision
  if (num >= 1) {
    return num.toFixed(4)
  }

  // For amounts < 1, find the first non-zero decimal and show 2 more digits
  const str = num.toString()
  if (str.includes("e")) {
    // Handle scientific notation (very small numbers)
    const decimalPlaces = Math.max(6, Math.abs(parseInt(str.split("e-")[1])) + 2)
    return num.toFixed(decimalPlaces)
  }

  const decimalPart = str.split(".")[1] || ""
  let firstNonZeroIndex = -1

  for (let i = 0; i < decimalPart.length; i++) {
    if (decimalPart[i] !== "0") {
      firstNonZeroIndex = i
      break
    }
  }

  if (firstNonZeroIndex === -1) return "0"

  // Show up to the first non-zero digit + 2 more digits
  const decimalPlaces = Math.min(firstNonZeroIndex + 3, 8) // Cap at 8 decimal places
  return num.toFixed(decimalPlaces)
}
