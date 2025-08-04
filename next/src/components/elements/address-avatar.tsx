// components/wallet-icon.tsx
"use client"
import jazzicon from "@metamask/jazzicon"
import { useEffect, useRef } from "react"

interface AddressAvatarProps {
  address: string
  className?: string
}

export default function AddressAvatar({ address, className }: AddressAvatarProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    ref.current.innerHTML = ""

    // jazzicon takes a diameter and a numeric seed
    const seed = parseInt(address.slice(2, 10), 16)
    const icon = jazzicon(ref.current.offsetWidth, seed)
    ref.current.appendChild(icon)
  }, [address])

  return <div ref={ref} className={className} />
}
