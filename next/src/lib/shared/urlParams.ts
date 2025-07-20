import { useRouter, useSearchParams } from "next/navigation"

export function useUpdateTokenParam() {
  const router = useRouter()
  const searchParams = useSearchParams()

  return (key: "from" | "to", value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set(key, value)
    router.replace(`?${params.toString()}`, { scroll: false })
  }
}
