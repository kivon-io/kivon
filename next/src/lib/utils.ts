import { clsx, type ClassValue } from "clsx"
import superjson from "superjson"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const transformer = superjson
