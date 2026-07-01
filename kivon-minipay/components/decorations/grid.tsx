import { useId } from "react"

import { cn } from "@/lib/utils"

type GridPatternProps = {
  width: number
  height: number
  x: string
  y: string
  squares?: readonly (readonly [number, number])[]
  className?: string
}

function GridPattern({
  width,
  height,
  x,
  y,
  squares,
  className,
}: GridPatternProps) {
  const patternId = useId()

  return (
    <svg aria-hidden className={className}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} />
      {squares ? (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([squareX, squareY], index) => (
            <rect
              strokeWidth="0"
              key={`${squareX}-${squareY}-${index}`}
              width={width + 1}
              height={height + 1}
              x={squareX * width}
              y={squareY * height}
            />
          ))}
        </svg>
      ) : null}
    </svg>
  )
}

type GridProps = {
  pattern?: readonly (readonly [number, number])[]
  size?: number
  className?: string
  gridFillClassName?: string
}

export function Grid({
  pattern = [
    [7, 1],
    [8, 3],
    [9, 5],
    [10, 2],
    [11, 4],
  ],
  size = 20,
  className,
  gridFillClassName,
}: GridProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute top-20 right-0 bottom-0 left-0 h-full w-full [mask-image:linear-gradient(white,white)] dark:[mask-image:linear-gradient(var(--color-neutral-950),var(--color-neutral-950))]",
        className
      )}
    >
      <div className="absolute inset-0 bg-linear-to-b from-zinc-100/50 to-zinc-300/50 opacity-100 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-neutral-900/50 dark:via-neutral-900/50 dark:to-neutral-900/50">
        <GridPattern
          width={size}
          height={size}
          x="-12"
          y="4"
          squares={pattern}
          className={cn(
            "absolute inset-0 h-full w-full fill-zinc-500/50 stroke-zinc-500/50 mix-blend-overlay dark:fill-neutral-500/50 dark:stroke-neutral-500/50",
            gridFillClassName
          )}
        />
      </div>
    </div>
  )
}
