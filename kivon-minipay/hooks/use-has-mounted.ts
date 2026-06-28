"use client"

import { useSyncExternalStore } from "react"

/** True after the first client paint — avoids SSR/client wallet text mismatches. */
export function useHasMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )
}
