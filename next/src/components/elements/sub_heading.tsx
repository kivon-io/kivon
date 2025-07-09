import { cn } from "@/lib/utils"
import { MotionProps } from "framer-motion"
import React from "react"
import Balancer from "react-wrap-balancer"

export const Subheading = ({
  className,
  as: Tag = "h2",
  children,
  ...props
}: {
  className?: string
  as?: React.ElementType
  children: React.ReactNode
} & MotionProps &
  React.HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <Tag
      className={cn(
        "text-sm md:text-base max-w-4xl text-left my-4 mx-auto",
        "text-zinc-500 text-center font-normal",
        className
      )}
      {...props}
    >
      <Balancer>{children}</Balancer>
    </Tag>
  )
}
