"use client"

import coinsData from "@/data/coins-data.json"
import { motion } from "motion/react"
import Image from "next/image"
import { Heading } from "../elements/heading"
import { Subheading } from "../elements/sub_heading"
import Section from "../section"

const Coins = () => {
  const { heading, description } = coinsData
  return (
    <Section className='max-w-7xl mx-auto px-4 md:px-0'>
      <div className='h-4 w-full relative overflow-hidden'>
        <Image
          src='/images/bg-hash.png'
          alt='bg-hash'
          fill
          className='w-full h-full object-cover'
        />
      </div>
      <div className='relative bg-white dark:bg-neutral-900 rounded-2xl pb-20 overflow-hidden md:overflow-visible'>
        <div className='relative overflow-hidden pb-10'>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='relative z-10 max-w-7xl mx-auto px-4 md:px-0 mt-20'
          >
            <Heading
              as='h2'
              className='text-xl md:text-2xl font-medium text-center w-full max-w-full'
            >
              {heading}
            </Heading>
            <Subheading className='text-sm text-neutral-500 dark:text-neutral-400 text-center w-full max-w-full'>
              {description}
            </Subheading>
          </motion.div>
          <div className='relative isolate'>
            <div className='absolute bottom-7 left-1/2 -z-10 ml-[calc(-1056/2/16*1rem)] h-[calc(550/17*1rem)] w-[calc(1056/16*1rem)] rounded-[50%] bg-gradient-to-t from-zinc-400/10 dark:from-zinc-700/10 to-40%'>
              <div className='absolute inset-px rounded-[50%]'></div>
            </div>
            <CoinsList />
          </div>
        </div>
        {/* <Grid size={30} className='absolute top-0 right-0' /> */}
        <div
          className='absolute opacity-30 inset-x-0 h-px -top-px bg-zinc-400/50 dark:bg-zinc-400/50'
          style={{
            backgroundImage:
              "url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 1'%3E%3Crect width='1' height='1' fill='%404040'/%3E%3C/svg%3E')",
            maskImage:
              "linear-gradient(to right, transparent, white 4rem, white calc(100% - 4rem), transparent)",
            marginLeft: "-4rem",
            marginRight: "-4rem",
          }}
        ></div>
        <div
          className='absolute opacity-30 inset-y-0 w-px -right-px bg-zinc-400/50 dark:bg-zinc-400/50'
          style={{
            backgroundImage:
              "url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 4'%3E%3Crect width='1' height='1' fill='%23212126'/%3E%3C/svg%3E')",
            maskImage:
              "linear-gradient(transparent, white 4rem, white calc(100% - 4rem), transparent)",
            marginTop: "-4rem",
            marginBottom: "-4rem",
          }}
        ></div>
        <div
          className='absolute opacity-30 inset-x-0 h-px -bottom-px bg-zinc-400/50 dark:bg-zinc-400/50'
          style={{
            backgroundImage:
              "url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 1'%3E%3Crect width='1' height='1' fill='%23212126'/%3E%3C/svg%3E')",
            maskImage:
              "linear-gradient(to right, transparent, white 4rem, white calc(100% - 4rem), transparent)",
            marginLeft: "-4rem",
            marginRight: "-4rem",
          }}
        ></div>
        <div
          className='absolute opacity-30 inset-y-0 w-px -left-px bg-zinc-400/50 dark:bg-zinc-400/50'
          style={{
            backgroundImage:
              "url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 4'%3E%3Crect width='1' height='1' fill='%23212126'/%3E%3C/svg%3E')",
            maskImage:
              "linear-gradient(transparent, white 4rem, white calc(100% - 4rem), transparent)",
            marginTop: "-4rem",
            marginBottom: "-4rem",
          }}
        ></div>
      </div>
    </Section>
  )
}

export default Coins

const CoinsList = () => {
  const arcStyles = [
    { transform: "translate(0, -5.9375rem)", opacity: 0.5 },
    { transform: "translate(0, -4.1875rem)", opacity: 0.8 },
    { transform: "translate(0, -2.9375rem)", opacity: 0.9 },
    { transform: "translate(0, -1.75rem)" },
    { transform: "translate(0, -.75rem)" },
    { transform: "translate(0, -.75rem)" },
    { transform: "translate(0, -1.75rem)" },
    { transform: "translate(0, -2.9375rem)", opacity: 0.9 },
    { transform: "translate(0, -4.1875rem)", opacity: 0.8 },
    { transform: "translate(0, -5.9375rem)", opacity: 0.5 },
  ]
  const coins = coinsData.coins.slice(0, 10) // 10 coins

  return (
    <ul className='flex items-center gap-x-5 justify-center mt-32 relative z-10'>
      {coins.slice(0, 5).map((coin, i) => (
        <li
          key={coin.id}
          style={arcStyles[i]}
          className='group hover:opacity-100 transition-all duration-300 shrink-0'
        >
          <div className='shrink-0 relative isolate flex items-center justify-center rounded-full p-3 backdrop-blur-[3px] bg-neutral-300/40 dark:bg-neutral-800/40 bg-gradient-to-b from-white/5 to-65% text-gray-400 shadow-[0_2px_13px_rgba(0,0,0,0.1),0_1px_2px_rgba(0,0,0,0.2)] ring-1 ring-inset ring-white/5'>
            <Image
              src={coin.image}
              alt={coin.name}
              width={24}
              height={24}
              className='shrink-0 w-6 h-6 grayscale-100 group-hover:grayscale-0 transition-all duration-300'
            />
          </div>
        </li>
      ))}
      {/* Middle div */}
      <li style={{ transform: "translate(0, 0)" }} className='hidden md:block'>
        <div className='bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-full px-4 py-2 font-semibold'>
          Over 1400+ Coins
        </div>
      </li>
      {coins.slice(5).map((coin, i) => (
        <li
          key={coin.id}
          style={arcStyles[i + 5]}
          className='group hover:opacity-100 transition-all duration-300 shrink-0'
        >
          <div className='shrink-0 relative isolate flex items-center justify-center rounded-full p-3 backdrop-blur-[3px] bg-neutral-300/40 dark:bg-neutral-800/40 bg-gradient-to-b from-white/5 to-65% text-gray-400 shadow-[0_2px_13px_rgba(0,0,0,0.1),0_1px_2px_rgba(0,0,0,0.2)] ring-1 ring-inset ring-white/5'>
            <Image
              src={coin.image}
              alt={coin.name}
              width={24}
              height={24}
              className='shrink-0 w-6 h-6 grayscale-100 group-hover:grayscale-0 transition-all duration-300'
            />
          </div>
        </li>
      ))}
    </ul>
  )
}
