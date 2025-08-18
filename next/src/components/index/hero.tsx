"use client"

import { cn } from "@/lib/utils"
import { ArrowRightIcon } from "lucide-react"
import Link from "next/link"
import { AnimatedShinyText } from "../decorations/animated-shiny-text"
import { Grid } from "../decorations/grid"
import { ShimmerButton } from "../decorations/shimmer-button"
import { Heading } from "../elements/heading"
import { Subheading } from "../elements/sub_heading"

const IndexHero = () => {
  return (
    <div className='bg-black dark:bg-zinc-900 relative flex h-[37rem] md:h-[40rem] w-full overflow-hidden antialiased md:items-center md:justify-center'>
      <div
        className={cn(
          "pointer-events-none absolute inset-0 [background-size:40px_40px] select-none"
        )}
      />

      <div className='relative z-10 mx-auto w-full max-w-7xl p-4 pt-20 md:pt-0'>
        <div className='z-10 flex md:min-h-20 items-center justify-center'>
          <div
            className={cn(
              "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            )}
          >
            <AnimatedShinyText className='inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400'>
              <span>✨ Introducing Kivon Index</span>
              <ArrowRightIcon className='ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5' />
            </AnimatedShinyText>
          </div>
        </div>

        <Heading
          as='h1'
          size='xl'
          className='text-center font-bold from-white via-zinc-200 to-zinc-500 dark:from-white dark:via-zinc-200 dark:to-zinc-500'
        >
          Institutional-grade crypto indexes. One subscription. On-chain.
        </Heading>
        <Subheading
          as={"p"}
          className='text-center mx-auto sm:max-w-2xl text-base md:text-lg text-zinc-300 dark:text-zinc-300'
        >
          Construct diversified baskets (BTC, ETH, SOL, LINK up to 20+) and give your clients a
          single tokenized exposure with automated rebalancing, transparent holdings, and
          programmable fees—built on non-custodial vault infrastructure.
        </Subheading>
        <div className='flex justify-center items-center gap-4'>
          <Link href='/contact-us'>
            <ShimmerButton className='h-11'>
              <p className='text-white'>Early Access</p>
            </ShimmerButton>
          </Link>
        </div>
      </div>
      <Grid size={60} className='absolute inset-0' />
    </div>
  )
}

export default IndexHero
