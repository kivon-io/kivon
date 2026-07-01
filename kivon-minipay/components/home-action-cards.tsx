"use client"

import { ArrowRightLeft, TrendingUp } from "lucide-react"
import { motion } from "motion/react"
import Link from "next/link"

import { BorderBeam } from "@/components/decorations/border-beam"
import { Grid } from "@/components/decorations/grid"
import { cn } from "@/lib/utils"

const actions = [
  {
    href: "/bridge",
    title: "Bridge",
    description: "Move tokens from Celo to other networks.",
    icon: ArrowRightLeft,
    pattern: [
      [7, 1],
      [8, 3],
      [9, 5],
      [10, 2],
      [11, 4],
    ],
  },
  {
    href: "/earn",
    title: "Earn",
    description: "Deposit USDT and earn up to 5% yield on Celo.",
    icon: TrendingUp,
    pattern: [
      [6, 2],
      [7, 4],
      [8, 1],
      [9, 3],
      [10, 5],
    ],
  },
] as const

export function HomeActionCards() {
  return (
    <div className="grid grid-cols-1 gap-2">
      {actions.map(
        ({ href, title, description, icon: Icon, pattern }, index) => (
          <motion.div
            key={href}
            whileTap={{ scale: 0.95 }}
            className="min-w-0 flex-1"
          >
            <Link
              href={href}
              className="group relative flex h-48 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border border-zinc-200 bg-linear-to-br from-zinc-50 to-zinc-100 p-4 dark:border-zinc-800 dark:from-neutral-900 dark:to-black"
            >
              <div className="relative z-10 flex flex-col items-center justify-center gap-3">
                <div
                  className={cn(
                    "relative flex size-20 items-center justify-center rounded-full border border-zinc-200 bg-linear-to-br from-zinc-50 to-zinc-200 shadow-lg shadow-zinc-200 dark:border-zinc-800 dark:from-neutral-800 dark:to-black dark:shadow-neutral-800/50"
                  )}
                >
                  <Icon
                    className="relative z-10 size-6 text-foreground"
                    aria-hidden
                  />
                  <div className="absolute size-8 bg-zinc-200 dark:bg-neutral-800" />

                  <div className="absolute top-0 left-6 hidden h-full w-px bg-zinc-300 md:flex dark:bg-zinc-700/50" />
                  <div className="absolute top-0 right-6 hidden h-full w-px bg-zinc-300 md:flex dark:bg-zinc-700/50" />
                  <div className="absolute top-6 left-0 hidden h-px w-full bg-zinc-300 md:flex dark:bg-zinc-700/50" />
                  <div className="absolute bottom-6 left-0 hidden h-px w-full bg-zinc-300 md:flex dark:bg-zinc-700/50" />

                  <BorderBeam
                    delay={(index + 1) * 0.5}
                    duration={(index + 1) * 5}
                    size={90}
                    borderWidth={1}
                    className="opacity-100 transition-opacity duration-300 group-hover:opacity-100 md:opacity-0"
                  />
                </div>
                <div className="flex flex-col items-center gap-1">
                  <p className="text-center text-sm font-bold">{title}</p>
                  <p className="max-w-[220px] text-center text-xs text-muted-foreground">
                    {description}
                  </p>
                </div>
              </div>
              <Grid
                size={20}
                pattern={pattern}
                className="absolute top-0 right-0"
              />
            </Link>
          </motion.div>
        )
      )}
    </div>
  )
}
