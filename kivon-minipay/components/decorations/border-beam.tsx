"use client"

import { useId } from "react"

import { cn } from "@/lib/utils"

interface BorderBeamProps {
  size?: number
  duration?: number
  delay?: number
  colorFrom?: string
  colorTo?: string
  className?: string
  style?: React.CSSProperties
  reverse?: boolean
  initialOffset?: number
  borderWidth?: number
}

/**
 * Rotating border highlight for icon badges.
 * Uses SVG + CSS spin (not offset-path) for MiniPay / older WebView support.
 */
export function BorderBeam({
  className,
  duration = 6,
  delay = 0,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
  style,
  reverse = false,
  borderWidth = 2,
  size = 90,
}: BorderBeamProps) {
  const id = useId().replace(/:/g, "")
  const gradientId = `border-beam-${id}`
  const radius = 50 - borderWidth
  const circumference = 2 * Math.PI * radius
  const arcLength = Math.min(size, circumference * 0.45)

  return (
    <svg
      className={cn(
        "pointer-events-none absolute inset-0 size-full origin-center animate-spin",
        className
      )}
      style={{
        animationDuration: `${duration}s`,
        animationDelay: `${-delay}s`,
        animationDirection: reverse ? "reverse" : "normal",
        ...style,
      }}
      viewBox="0 0 100 100"
      aria-hidden
    >
      <defs>
        <linearGradient
          id={gradientId}
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="50"
          x2="100"
          y2="50"
        >
          <stop offset="0%" stopColor={colorFrom} stopOpacity="0" />
          <stop offset="45%" stopColor={colorFrom} />
          <stop offset="55%" stopColor={colorTo} />
          <stop offset="100%" stopColor={colorTo} stopOpacity="0" />
        </linearGradient>
      </defs>
      <circle
        cx="50"
        cy="50"
        r={radius}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth={borderWidth * 2}
        strokeLinecap="round"
        strokeDasharray={`${arcLength} ${circumference - arcLength}`}
      />
    </svg>
  )
}
