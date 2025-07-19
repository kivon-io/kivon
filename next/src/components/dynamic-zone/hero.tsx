"use client"
import { cn } from "@/lib/utils"
import { motion } from "motion/react"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Cover } from "../decorations/cover"
import { Grid } from "../decorations/grid"
import { Heading } from "../elements/heading"
import { Subheading } from "../elements/sub_heading"

const heading = "Exchange any Web3 Crypto limitlessly, instantly, securely and easily"

const Hero = ({ className }: { className?: string }) => {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  const heroRoutes = ["/", "/swap", "/buy", "/sell", "/bridge"]

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null // Prevents hydration mismatch
  // show hero only on these routes
  if (!heroRoutes.includes(pathname)) return null

  return (
    <div
      key={pathname}
      className={cn(
        "relative max-w-screen-2xl mx-auto mt-20 w-full",
        pathname !== "/" && "hidden md:block",
        className
      )}
    >
      <div className='relative z-20 '>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Heading as='h1' className='text-2xl md:text-4xl lg:text-5xl font-bold'>
            {heading.substring(0, heading.lastIndexOf(" "))}{" "}
            <Cover>{heading.split(" ").pop()}</Cover>
          </Heading>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className='mb-10'
        >
          <Subheading as='p' className='text-sm md:text-base lg:text-lg'>
            Exchange bitcoin and over 1,400+ crypto currencies with ease. No Wallet. No Tracking. No
            KYC. Swap multichain in seconds.
          </Subheading>
        </motion.div>
      </div>
      <Grid size={60} className='left-0 right-0 bottom-0 opacity-80 h-[950px] w-full' />
    </div>
  )
}

export default Hero
