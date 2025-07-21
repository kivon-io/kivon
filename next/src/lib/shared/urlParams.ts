// import { useRouter, useSearchParams } from "next/navigation"

// export function useUpdateTokenParam() {
//   const router = useRouter()
//   const searchParams = useSearchParams()

//   return (key: "from" | "to", value: string) => {
//     const params = new URLSearchParams(searchParams.toString())
//     params.set(key, value)
//     router.replace(`?${params.toString()}`, { scroll: false })
//   }
// }

import { useParams, useRouter, useSearchParams } from "next/navigation"

export function useUpdateTokenParam() {
  const router = useRouter()
  const params = useParams() as { params?: string[] }

  return (key: "from" | "to", value: string) => {
    // Get current values from the URL
    const current = params?.params || []
    let from = current[0] || ""
    let to = current[1] || ""

    if (key === "from") {
      from = value
      // If from and to are the same, clear to
      if (from === to) to = ""
    } else {
      to = value
      // If from and to are the same, clear from
      if (from === to) from = ""
    }

    // Build the new path
    let newPath = "/swap"
    if (from) newPath += `/${from}`
    if (to) newPath += `/${to}`

    router.replace(newPath, { scroll: false })
  }
}

export function useUrlRoute() {
  const params = useParams() as { slug?: string[] }

  const from = params?.slug?.[0] || ""
  const to = params?.slug?.[1] || ""

  return { from, to }
}

/*
  set from and to in the url only if exist if not don't set it
  if from and to are the same, clear to
*/
export function useUpdateSwapUrl() {
  const router = useRouter()
  const params = useParams() as { slug?: string[] }
  const searchParams = useSearchParams()

  return (key: "from" | "to", value: string) => {
    // Parse current path segments
    const slug = params?.slug || []
    let from = slug[0] || ""
    let to = slug[1] || ""

    // Only update if the segment exists
    if (key === "from" && from) from = value
    if (key === "to" && to) to = value

    // Build new path
    let newPath = "/swap"
    if (from) newPath += `/${from}`
    if (to) newPath += `/${to}`

    // Preserve query string (e.g., step=transaction-details)
    const query = searchParams.toString()
    if (query) newPath += `?${query}`

    router.replace(newPath, { scroll: false })
  }
}
