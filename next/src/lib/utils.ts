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
