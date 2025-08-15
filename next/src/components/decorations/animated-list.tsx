"use client"

import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "motion/react"
import React, { ComponentPropsWithoutRef, useEffect, useMemo, useState } from "react"

export interface AnimatedListItemProps {
  children: React.ReactNode
  isCurrent?: boolean
}
export function AnimatedListItem({ children, isCurrent = false }: AnimatedListItemProps) {
  const animations = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1, originY: 0 },
    exit: { scale: 0, opacity: 0 },
    transition: { type: "spring" as const, stiffness: 350, damping: 40 },
  }
  let content = children
  if (React.isValidElement(children)) {
    const element = children as React.ReactElement<{
      className?: string
      children?: React.ReactNode
    }>
    const elementClassName = cn(
      (element.props.className as string) || "",
      isCurrent ? "" : "opacity-50 w-[92%] blur-xs mx-auto"
    )
    const newChildren = React.Children.map(element.props.children, (child, idx) => {
      if (idx === 0 && React.isValidElement(child)) {
        const childElement = child as React.ReactElement<{
          className?: string
          children?: React.ReactNode
        }>
        const innerChildren = React.Children.map(
          childElement.props.children,
          (subchild, subidx) => {
            if (subidx === 0 && React.isValidElement(subchild)) {
              const subElement = subchild as React.ReactElement<{ className?: string }>
              return React.cloneElement(subElement, {
                className: cn(
                  (subElement.props.className as string) || "",
                  isCurrent ? "bg-gradient-to-b from-secondary-custom to-blue-500/50" : ""
                ),
              })
            }
            return subchild
          }
        )
        return React.cloneElement(childElement, {}, innerChildren)
      }
      return child
    })
    content = React.cloneElement(element, { className: elementClassName }, newChildren)
  }
  return (
    <motion.div {...animations} layout className='mx-auto w-full'>
      {content}
    </motion.div>
  )
}

export interface AnimatedListProps extends ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode
  delay?: number
}

export const AnimatedList = React.memo(
  ({ children, className, delay = 3000, ...props }: AnimatedListProps) => {
    const [index, setIndex] = useState(0)
    const childrenArray = useMemo(() => React.Children.toArray(children), [children])

    useEffect(() => {
      const timeout = setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % childrenArray.length)
      }, delay)
      return () => clearTimeout(timeout)
    }, [index, delay, childrenArray.length])

    const itemsToShow = useMemo(() => {
      //  const result = childrenArray.slice(0, index + 1).reverse()
      //  return result
      const len = childrenArray.length
      if (len === 0) return []
      const start = index % len
      // rotate the array so current item is first, looping seamlessly
      return childrenArray.slice(start).concat(childrenArray.slice(0, start))
    }, [index, childrenArray])

    return (
      <div className={cn(`flex flex-col items-center gap-4`, className)} {...props}>
        <AnimatePresence>
          {itemsToShow.map((item, idx) => (
            <AnimatedListItem key={(item as React.ReactElement).key} isCurrent={idx === 0}>
              {item}
            </AnimatedListItem>
          ))}
        </AnimatePresence>
      </div>
    )
  }
)

AnimatedList.displayName = "AnimatedList"
