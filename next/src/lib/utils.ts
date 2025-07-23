import { clsx, type ClassValue } from "clsx"
import superjson from "superjson"
import { twMerge } from "tailwind-merge"

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

export const getHeroData = (data: any) => {
  return data.dynamic_zone[0].hero
}
