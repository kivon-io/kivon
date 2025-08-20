"use client"

import { cn } from "@/lib/utils"
import { motion, useMotionValueEvent, useScroll } from "motion/react"
import { useTheme } from "next-themes"
import Image from "next/image"
import { useEffect, useMemo, useRef, useState } from "react"
import { BsPlus } from "react-icons/bs"
import { FlickeringGrid } from "../decorations/flickering-grid"
import Lines from "../decorations/lines"
import FlipLink from "../decorations/text-effect-flipper"
import { Heading } from "../elements/heading"
import { Subheading } from "../elements/sub_heading"
import Section from "../section"

const content = [
  {
    title: "+30 Protocols",
    description:
      "Build, customize, and manage fully on-chain index products designed for investors, institutions, and DAOs.",
  },
  {
    title: "Exposure to +200 Core Assets",
    description:
      "Instant diversification into established catalog of over 200 cryptocurrencies, featuring both blue-chips and emerging tokens, with support for emerging tokens as markets evolve.",
  },
  {
    title: "Multi-Chain Support",
    description: "Access protocols and trade assets across the leading decentralized networks.",
  },
  {
    title: "Endless Asset Possibilities",
    description:
      "Kivon Index supports crypto, stablecoins, DeFi tokens, and tokenized real-world assets, unlocking an unlimited range of portfolio design possibilities.",
  },
]

const chains = [
  "/images/chains/ethereum.svg",
  "/images/chains/base.jpeg",
  "/images/chains/arbitrum.svg",
  "/images/chains/polygon.svg",
]

const protocols = [
  "/images/protocols/yearn.svg",
  "/images/protocols/1inch.svg",
  "/images/protocols/three-one-third.svg",
  "",
  "/images/protocols/aave.svg",
  "/images/protocols/balancer.svg",
  "/images/protocols/compound.svg",
  "/images/protocols/paraswap.svg",
  "/images/protocols/curve.svg",
  "/images/protocols/gmx.svg",
  "/images/protocols/kiln.svg",
  "/images/protocols/swell.svg",
  "",
  "/images/protocols/uniswap-v2.svg",
  "/images/protocols/zero-lend.svg",
  "/images/protocols/lido.svg",
]

const coins = [
  "/images/coins/ethereum.svg",
  "/images/coins/usdc.svg",
  "/images/coins/dai.svg",
  "/images/coins/cardano.svg",
  "/images/coins/shiba-inu.svg",
]

const MoreInfo = () => {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const backgrounds = useMemo(
    () =>
      theme === "dark"
        ? ["#0b0809", "#000000", "#171717", "#0b0809"]
        : ["#f1f1f1", "#ffffff", "#ffffff", "#f1f1f1"],
    [theme]
  )

  const [gradient, setGradient] = useState(backgrounds[0])

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / content.length)
    const closestBreakpointIndex = cardsBreakpoints.reduce((acc, breakpoint, index) => {
      const distance = Math.abs(latest - breakpoint)
      if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
        return index
      }
      return acc
    }, 0)
    setGradient(backgrounds[closestBreakpointIndex % backgrounds.length])
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Update gradient when theme changes
    const cardsBreakpoints = content.map((_, index) => index / content.length)
    const latest = scrollYProgress.get()
    const closestBreakpointIndex = cardsBreakpoints.reduce((acc, breakpoint, index) => {
      const distance = Math.abs(latest - breakpoint)
      if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
        return index
      }
      return acc
    }, 0)
    setGradient(backgrounds[closestBreakpointIndex % backgrounds.length])
  }, [theme, backgrounds, scrollYProgress])

  return (
    <div className='w-full py-4'>
      <div className='h-10 flex items-center justify-center relative overflow-hidden bg-zinc-100 dark:bg-zinc-900 w-full '>
        {mounted && (
          <FlickeringGrid
            className='absolute inset-0 h-full w-full'
            squareSize={1}
            gridGap={2}
            color={theme === "dark" ? "#f0f0f0" : "#000000"}
            maxOpacity={0.5}
            flickerChance={0.1}
          />
        )}
      </div>
      <motion.div
        animate={{
          background: gradient,
        }}
        transition={{
          duration: 0.5,
        }}
        ref={ref}
        className='w-full relative h-full'
      >
        <Section className='relative max-w-7xl mx-auto px-2 md:px-0 2xl:px-0 overflow-hidden md:overflow-visible'>
          <ProtocolsContent />
          <CurrenciesContent />
          <MultiChainContent />
          <EndlessContent />
          <Lines />
        </Section>
      </motion.div>
    </div>
  )
}

export default MoreInfo

const ProtocolsContent = () => {
  return (
    <div className='grid grid-cols-12 gap-4 items-center mb-10'>
      <div className='col-span-12 md:col-span-7'>
        <Heading as='h1' className='text-left md:text-left w-fit ml-0 font-bold'>
          {content[0].title}
        </Heading>
        <Subheading className='text-left md:text-left text-base md:text-base w-fit ml-0'>
          {content[0].description}
        </Subheading>
      </div>
      <div className='col-span-12 md:col-span-5 relative'>
        <div className='grid grid-cols-4 gap-5'>
          {protocols.map((protocol, index) => {
            // Speed multiplier - change this value to make it faster (< 1) or slower (> 1)
            const speedMultiplier = 6 // 1 = original speed, 2 = 2x slower, 0.5 = 2x faster

            // Base delays from the original pattern
            const baseDelays = [
              214.286, 428.571, 641.857, 857.143, 428.571, 642.857, 857.143, 1071.43, 642.857,
              857.143, 1071.43, 1285.71, 857.143, 1071.43, 1285.71, 1500,
            ]

            const animationDelay = `${(baseDelays[index] || 214.286) * speedMultiplier}ms`

            return (
              <div
                className={cn(
                  "border border-zinc-200 dark:border-zinc-700 h-24 w-full rounded-xl bg-gradient-to-b from-neutral-50/50 via-neutral-100/50 to-neutral-200/50 dark:from-neutral-900/50 dark:via-neutral-950/50 dark:to-neutral-950/50 backdrop-blur-lg animate-quint flex items-center justify-center",
                  index === 3 && "!opacity-0",
                  index === 12 && "!opacity-0"
                )}
                style={{ animationDelay }}
                key={index}
              >
                <Image
                  src={protocol}
                  alt='Protocol'
                  width={100}
                  height={100}
                  className='object-contain w-4/5 h-4/5 rounded-lg '
                />
              </div>
            )
          })}
        </div>
        <div className='grid-lines absolute top-0 left-0 w-full h-full flex rotate-[180deg]'>
          <span className='w-[1px] h-full absolute top-0 left-[calc(25%-20px/4)] bg-zinc-200 dark:bg-zinc-800'></span>
          <span className='w-[1px] h-full absolute top-0 left-1/2 bg-zinc-200 dark:bg-zinc-800'></span>
          <span className='w-[1px] h-full absolute top-0 right-[calc(25%-20px/4)] bg-zinc-200 dark:bg-zinc-800'></span>
        </div>
        <div className='grid-lines absolute top-0 left-0 w-full h-full'>
          <span className='w-full h-[1px] absolute top-[calc(25%-20px/4)] bg-zinc-200 dark:bg-zinc-800'></span>
          <span className='w-full h-[1px] absolute top-1/2 bg-zinc-200 dark:bg-zinc-800'></span>
          <span className='w-full h-[1px] absolute bottom-[calc(25%-20px/4)] bg-zinc-200 dark:bg-zinc-800'></span>
        </div>
      </div>
    </div>
  )
}

const CurrenciesContent = () => {
  return (
    <div className='relative px-6 py-16 md:px-20 md:py-20 overflow-hidden'>
      <div className='absolute inset-x-0 top-0 h-px bg-zinc-200 dark:bg-zinc-800'></div>
      <Heading as='h1' className='text-left md:text-left w-fit ml-0 font-bold'>
        {content[1].title}
      </Heading>
      <Subheading className='text-left md:text-left text-base md:text-base w-fit ml-0'>
        {content[1].description}
      </Subheading>
      <div className='relative mt-10'>
        <div className='flex -space-x-6'>
          {coins.map((coin, index) => (
            <div
              className='relative overflow-hidden h-16 w-16 md:h-24 md:w-24 bg-white dark:bg-black border-2 border-white dark:border-zinc-800 rounded-full flex items-center justify-center'
              key={index}
            >
              <Image src={coin} alt='Coin' fill className='object-contain' />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const MultiChainContent = () => {
  return (
    <div className='relative px-6 py-16 md:px-20 md:py-20 overflow-hidden'>
      <div className='absolute inset-x-0 top-0 h-px bg-zinc-200 dark:bg-zinc-800'></div>
      <Heading as='h1' className='text-left md:text-left w-fit ml-0 font-bold'>
        {content[2].title}
      </Heading>
      <Subheading className='text-left md:text-left text-base md:text-base w-fit ml-0'>
        {content[2].description}
      </Subheading>
      <div className='relative mt-10'>
        <div className='flex md:justify-end'>
          <div className='flex -space-x-4'>
            {chains.map((chain, index) => (
              <div
                className='relative overflow-hidden h-16 w-16 md:h-24 md:w-24 bg-white dark:bg-black border-2 border-white dark:border-zinc-800 rounded-3xl flex items-center justify-center'
                key={index}
              >
                <Image src={chain} alt='Chain' fill className='object-contain' />
              </div>
            ))}
            <div className='bg-secondary-custom text-white relative flex items-center justify-center h-16 w-16 md:h-24 md:w-24 md:rounded-3xl rounded-xl -ml-4'>
              <BsPlus className='size-12' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const EndlessContent = () => {
  return (
    <div className='relative px-6 py-16 md:px-20 md:py-20 overflow-hidden'>
      <div className='absolute inset-x-0 top-0 h-px bg-zinc-200 dark:bg-zinc-800'></div>
      <div className='grid grid-cols-1 md:grid-cols-2 items-center'>
        <div>
          <Heading as='h1' className='text-left md:text-left w-fit ml-0 font-bold'>
            {content[3].title}
          </Heading>
          <Subheading className='text-left md:text-left text-base md:text-base w-fit ml-0'>
            {content[3].description}
          </Subheading>
        </div>
        <div className='h-full w-full flex justify-center md:justify-end items-center'>
          <section className='grid grid-cols-2 md:grid-cols-1 place-content-center gap-2 text-black'>
            <div className='group flex items-center justify-center '>
              <FlipLink className='text-xl md:text-4xl leading-[0.85] font-extrabold'>
                Bitcoin
              </FlipLink>
              <div className='w-12 h-12 bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl relative flex items-center justify-center'>
                <Image
                  src='/images/coins/bitcoin.svg'
                  alt='Bitcoin'
                  width={40}
                  height={40}
                  className=' w-10 h-10 grayscale-100 group-hover:grayscale-0 transition-all duration-300'
                />
              </div>
            </div>
            <div className='group flex items-center justify-center '>
              <div className='w-12 h-12 bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl relative flex items-center justify-center'>
                <Image
                  src='/images/coins/usdc.svg'
                  alt='USDC'
                  width={40}
                  height={40}
                  className=' w-10 h-10 grayscale-100 group-hover:grayscale-0 transition-all duration-300'
                />
              </div>
              <FlipLink className='text-xl md:text-4xl leading-[0.85] font-extrabold'>
                USDC
              </FlipLink>
            </div>

            <div className='group flex items-center justify-center '>
              <FlipLink className='text-xl md:text-4xl leading-[0.85] font-extrabold'>
                Ethereum
              </FlipLink>
              <div className='w-12 h-12 bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl relative flex items-center justify-center'>
                <Image
                  src='/images/coins/ethereum.svg'
                  alt='Ethereum'
                  width={40}
                  height={40}
                  className=' w-10 h-10 grayscale-100 group-hover:grayscale-0 transition-all duration-300'
                />
              </div>
            </div>
            <div className='group flex items-center justify-center '>
              <div className='w-12 h-12 bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl relative flex items-center justify-center'>
                <Image
                  src='/images/coins/tether.svg'
                  alt='Usdt'
                  width={40}
                  height={40}
                  className=' w-10 h-10 grayscale-100 group-hover:grayscale-0 transition-all duration-300'
                />
              </div>
              <FlipLink className='text-xl md:text-4xl leading-[0.85] font-extrabold'>
                Usdt
              </FlipLink>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
