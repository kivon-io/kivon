import { cn } from "@/lib/utils"
import React from "react"

const Section = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div
      className={cn(
        "pt-10 md:pt-36 max-w-screen-2xl mx-auto rounded-sm px-2 md:px-5 2xl:px-0 relative z-10",
        className
      )}
    >
      {children}
    </div>
  )
}

export default Section
