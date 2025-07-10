import { cn } from "@/lib/utils"
import { useId } from "react"

export const Grid = ({
  pattern,
  size,
  className,
}: {
  pattern?: number[][]
  size?: number
  className?: string
}) => {
  const p = pattern ?? [
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
  ]
  return (
    <div
      className={cn(
        "pointer-events-none absolute top-20 left-0 right-0 bottom-0 h-full w-full [mask-image:linear-gradient(white,white)]",
        className
      )}
    >
      <div className='absolute inset-0 bg-gradient-to-b from-zinc-100/50 to-zinc-300/50 opacity-100 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-zinc-900/30 dark:to-zinc-900/30'>
        <GridPattern
          width={size ?? 20}
          height={size ?? 20}
          x='-12'
          y='4'
          squares={p}
          className='fill-zinc-500/50 stroke-zinc-500/50 dark:fill-zinc-500/50 dark:stroke-zinc-500/50 absolute inset-0 h-full w-full mix-blend-overlay'
        />
      </div>
    </div>
  )
}
//eslint-disable-next-line @typescript-eslint/no-explicit-any
export function GridPattern({ width, height, x, y, squares, ...props }: any) {
  const patternId = useId()
  return (
    <svg aria-hidden='true' {...props}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits='userSpaceOnUse'
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill='none' />
        </pattern>
      </defs>
      <rect width='100%' height='100%' strokeWidth={0} fill={`url(#${patternId})`} />
      {squares && (
        <svg x={x} y={y} className='overflow-visible'>
          {/* {squares.map(([x, y, index]: [number, number, number]) => (
            <rect
              strokeWidth='0'
              key={`${x}-${y}-${index}`}
              width={width + 1}
              height={height + 1}
              x={x * width}
              y={y * height}
            />
          ))} */}
          {squares.map(([x, y]: [number, number], i: number) => (
            <rect
              strokeWidth='0'
              key={`${x}-${y}-${i}`}
              width={width + 1}
              height={height + 1}
              x={x * width}
              y={y * height}
            />
          ))}
        </svg>
      )}
    </svg>
  )
}
