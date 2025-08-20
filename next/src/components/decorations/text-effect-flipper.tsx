import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import React from "react"

const DURATION = 0.25
const STAGGER = 0.025

interface FlipLinkProps {
  children: string
  href?: string
  className?: string
}

const FlipLink: React.FC<FlipLinkProps> = ({ children, href, className }) => {
  return (
    <motion.a
      initial='initial'
      whileHover='hovered'
      {...(href && { href, target: "_blank" })}
      className={cn(
        "relative block overflow-hidden whitespace-nowrap text-4xl font-semibold uppercase dark:text-white/90 sm:text-7xl md:text-8xl ",
        className
      )}
      // style={{
      //   lineHeight: 0.85,
      // }}
    >
      <div>
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: {
                y: 0,
              },
              hovered: {
                y: "-100%",
              },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className='inline-block'
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
      <div className='absolute inset-0'>
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: {
                y: "100%",
              },
              hovered: {
                y: 0,
              },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className='inline-block'
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
    </motion.a>
  )
}

export default FlipLink
