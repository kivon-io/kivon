"use client"

import { Button } from "@/components/ui/button"
import { APP_LOGO_URL } from "@/lib/app/config"
import { APP_NAME } from "@/lib/relay/constants"
import { motion } from "motion/react"
import Link from "next/link"

const fadeUp = (delay: number) => ({
  initial: { y: 16, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.5, delay },
})

function Blob({
  className,
  color,
  dur,
  reverse,
}: {
  className: string
  color: string
  dur: number
  reverse?: boolean
}) {
  const direction = reverse ? -1 : 1

  return (
    <motion.div
      className={`pointer-events-none absolute will-change-transform ${className}`}
      animate={{ x: [0, 44 * direction] }}
      transition={{
        duration: dur,
        repeat: Infinity,
        repeatType: "mirror",
        ease: [0.45, 0.05, 0.55, 0.95],
      }}
    >
      <motion.div
        className="size-full rounded-full"
        style={{
          filter: "blur(60px)",
          background: `radial-gradient(circle, ${color}, transparent 68%)`,
        }}
        animate={{
          y: [0, -32 * direction],
          scale: [1, 1.08],
        }}
        transition={{
          y: {
            duration: dur * 1.18,
            repeat: Infinity,
            repeatType: "mirror",
            ease: [0.45, 0.05, 0.55, 0.95],
          },
          scale: {
            duration: dur * 1.35,
            repeat: Infinity,
            repeatType: "mirror",
            ease: [0.45, 0.05, 0.55, 0.95],
          },
        }}
      />
    </motion.div>
  )
}

export default function WelcomePage() {
  return (
    <div className="relative flex min-h-svh w-full flex-col items-center justify-center overflow-hidden bg-[#0E0A0C]">
      <Blob
        className="top-[90px] left-[-60px] h-[280px] w-[280px] opacity-55"
        color="#e87a99"
        dur={9}
      />
      <Blob
        className="right-[-70px] bottom-[120px] h-[300px] w-[300px] opacity-50"
        color="#f0a36e"
        dur={11}
        reverse
      />
      <Blob
        className="top-[40%] left-[40%] h-[220px] w-[220px] opacity-40"
        color="#d06380"
        dur={13}
        reverse
      />

      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          className="mb-8 h-[118px] w-[118px]"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 240, damping: 15 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={APP_LOGO_URL ?? ""}
            alt="Kivon"
            width={118}
            height={118}
            style={{
              boxShadow:
                "0 20px 50px rgba(0,0,0,.5), 0 0 0 1px rgba(255,255,255,.10)",
            }}
          />
        </motion.div>
        <motion.h1
          className="text-[34px] font-extrabold tracking-tight text-white"
          {...fadeUp(0.45)}
        >
          kivon
        </motion.h1>
        <motion.p
          className="text-sm font-medium text-[#B8A6AC]"
          {...fadeUp(0.6)}
        >
          Move stablecoins, chain to chain
        </motion.p>
      </div>

      <motion.div
        className="absolute inset-x-6 bottom-[54px] z-10"
        {...fadeUp(0.85)}
      >
        <Link href="/">
          <Button className="h-12 w-full rounded-full" size="lg">
            Bridge Now
          </Button>
        </Link>
        <p className="mt-3.5 text-center text-xs font-medium text-[#7E6E74]">
          Powered by the {APP_NAME} relayer
        </p>
      </motion.div>
    </div>
  )
}
