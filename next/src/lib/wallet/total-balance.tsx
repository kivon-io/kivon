"use client"

import { Button } from "@/components/ui/button"
import { useAppContext } from "@/context/app-context"
import { useState } from "react"
import { BsEye, BsEyeSlash } from "react-icons/bs"
import { cn } from "../utils"

const TotalBalance = ({ className }: { className?: string }) => {
  const [isVisible, setIsVisible] = useState(localStorage.getItem("kv-balance-visible") === "true")
  const { totalUSD } = useAppContext()

  const handleToggle = () => {
    setIsVisible(!isVisible)
    localStorage.setItem("kv-balance-visible", isVisible ? "false" : "true")
  }

  return (
    <div className='flex gap-2 items-center'>
      <div
        className={cn(
          "text-2xl font-semibold text-zinc-900 dark:text-zinc-200 font-mono",
          className
        )}
      >
        ${isVisible ? totalUSD.toFixed(2) : "****"}
      </div>
      <Button className='w-fit h-fit p-1.5' variant='outline' size='icon' onClick={handleToggle}>
        {isVisible ? <BsEye className='size-3' /> : <BsEyeSlash className='size-3' />}
      </Button>
    </div>
  )
}

export default TotalBalance
