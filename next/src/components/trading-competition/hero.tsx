"use client"

import { APP_NAME } from "@/lib/shared/constants"
import { cn } from "@/lib/utils"
import { Grid } from "../decorations/grid"
import { Heading } from "../elements/heading"
import { Subheading } from "../elements/sub_heading"

const CompetitionHero = () => {
  return (
    <div className='bg-black dark:bg-zinc-900 relative flex h-[35rem] w-full overflow-hidden antialiased md:items-center md:justify-center'>
      <div
        className={cn(
          "pointer-events-none absolute inset-0 [background-size:40px_40px] select-none"
        )}
      />

      <div className='relative z-10 mx-auto w-full max-w-7xl p-4 pt-20 md:pt-0 md:px-0'>
        <div className='grid grid-cols-12 gap-4'>
          <div className='col-span-12 md:col-span-8'>
            <Heading
              as='h1'
              size='xl'
              className='text-left font-bold from-white via-zinc-200 to-zinc-500 dark:from-white dark:via-zinc-200 dark:to-zinc-500 mt-3'
            >
              Trading challenge, Complete Tasks, Earn Rewards - Explore
            </Heading>
            <Subheading
              as={"p"}
              className='text-left text-base md:text-lg text-zinc-300 dark:text-zinc-300'
            >
              Kivon, a decentralized trading platform, is hosting a trading challenge. Complete
              tasks, earn rewards, and explore {APP_NAME}&apos;s trading strategies.
            </Subheading>
          </div>
          <div className='col-span-12 md:col-span-4'>
            {/* <div className='h-80 w-full rounded-2xl bg-white'></div> */}
          </div>
        </div>
      </div>
      <Grid size={60} className='absolute inset-0' />
    </div>
  )
}

export default CompetitionHero
