"use client"
import { usePathname } from "next/navigation"

export const useIsReviews = () => usePathname().startsWith("/reviews")
export const useIsIndex = () => usePathname().startsWith("/index-dtf")
