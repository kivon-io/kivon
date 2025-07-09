"use client"
import { cn } from "@/lib/utils"
import { motion } from "motion/react"
import React from "react"

const SwapZoneContainer = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={cn("max-w-lg mx-auto", className)}
    >
      {children}
    </motion.div>
  )
}

export default SwapZoneContainer
