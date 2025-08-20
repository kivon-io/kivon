"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import Image from "next/image"
import { useEffect, useState } from "react"
import { BsBank, BsBarChart, BsCheck } from "react-icons/bs"
import { CgArrowsExchangeAlt } from "react-icons/cg"
import { FaChartPie } from "react-icons/fa"
import { LuCoins, LuHandshake } from "react-icons/lu"
import { PiChartLineUp } from "react-icons/pi"
import { TbAutomation, TbCoins } from "react-icons/tb"
import { AnimatedList } from "../decorations/animated-list"
import { AvatarCircles } from "../decorations/avatar-circles"
import { FlickeringGrid } from "../decorations/flickering-grid"
import Lines from "../decorations/lines"
import { Heading } from "../elements/heading"
import { Subheading } from "../elements/sub_heading"
import Section from "../section"

const content = [
  {
    title: "Index in a token",
    icon: <LuCoins className='size-4' />,
    description:
      "Clients subscribe once and hold one asset (your index share) that represents a diversified basket. Holdings and transactions are verifiable on-chain, 24/7.",
  },
  {
    title: "Institution-ready",
    icon: <BsBank className='size-4' />,
    description:
      "Whitelists, policy controls, multi-sig ownership, automation and analytics—delivered via Kivon's enterprise stack.",
  },
  {
    title: "Actionable and automated",
    icon: <TbAutomation className='size-4' />,
    description:
      "Rebalance with one transaction across multiple venues using basket trading; schedule or trigger by thresholds.",
  },
]

const whosIsItFor = [
  {
    description:
      "Asset managers & family offices seeking compliant, policy-driven exposure to a curated crypto basket.",
  },
  {
    description:
      "Standardize treasury sleeves with policy-controlled, programmable index exposures—for example Top-20 L1s, DeFi blue chips, or stablecoin carry",
  },
]

const users = [
  {
    name: "Banks",
    info: "Regulated Funds",
    icon: <BsBank className='size-5' />,
  },
  {
    name: "Trading Firms",
    info: "Yield Strategies",
    icon: <BsBarChart className='size-5' />,
  },
  {
    name: "Market Makers",
    info: "Standard Funds",
    icon: <PiChartLineUp className='size-5' />,
  },
  {
    name: "Venture Capital",
    info: "Index Products",
    icon: <LuHandshake className='size-5' />,
  },
  {
    name: "Private Equity",
    info: "Private Vaults",
    icon: <FaChartPie className='size-5' />,
  },
  {
    name: "CEXs",
    info: "Liquidity Pools",
    icon: <CgArrowsExchangeAlt className='size-5' />,
  },
  {
    name: "Custodians",
    icon: <TbCoins className='size-5' />,
    info: "Custody Services",
  },
]

const WhyKivon = () => {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <Section className='md:px-0 relative md:pt-0 mt-12 sm:mt-0 overflow-hidden md:overflow-visible max-w-7xl mx-auto'>
      <div className='h-4 flex items-center justify-center relative overflow-hidden bg-zinc-100 dark:bg-zinc-900 w-full '>
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
      <div className='grid grid-cols-12 gap-4 relative z-10 pl-4 md:pl-0'>
        <div className='col-span-12 md:col-span-4 md:border-r border-dashed border-zinc-300 dark:border-zinc-700 py-4 md:py-12'>
          <div className='relative'>
            <Heading as='h1' className='text-left md:text-left w-fit ml-0 font-bold'>
              Why Kivon
            </Heading>
            <Subheading className='text-left md:text-left w-fit ml-0 max-w-md'>
              Our focus is to provide best-in-class index solutions for our users, providing
              long-term inflation-resistant money: asset-backed currencies.
            </Subheading>
          </div>
        </div>
        <div className='col-span-12 md:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 divide-x divide-dashed divide-zinc-300 dark:divide-zinc-700'>
          {content.map((item, index) => (
            <motion.div
              key={index}
              className='relative py-4 md:py-12 group'
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className='flex gap-2 items-center'>
                {item.icon}
                <Heading
                  as='h2'
                  className='text-left md:text-left text-base md:text-base w-fit ml-0'
                >
                  {item.title}
                </Heading>
              </div>
              <Subheading className='text-base md:text-sm text-left md:text-left w-fit'>
                {item.description}
              </Subheading>
            </motion.div>
          ))}
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-dashed border-zinc-300 dark:border-zinc-700 h-full'>
        <div className='p-2 md:p-16 bg-white dark:bg-zinc-900 relative h-full'>
          <Heading as='h1' className='text-left md:text-left w-fit ml-0 font-bold'>
            Who is it for?
          </Heading>
          <Heading as='h2' className='text-left md:text-left text-base md:text-base w-fit ml-0'>
            {whosIsItFor[0].description}
          </Heading>
          <div className='h-[17rem] relative flex w-full flex-col overflow-hidden p-2 mt-10'>
            <AnimatedList className='gap-2 md:px-10'>
              {users.map((user, index) => (
                <div
                  key={index}
                  className={cn(
                    "bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-2 rounded-xl flex justify-between items-center"
                  )}
                >
                  <div className='flex items-center gap-2'>
                    <div className='border border-zinc-200 dark:border-zinc-700 relative h-12 w-12 rounded-lg bg-zinc-400 dark:bg-zinc-800 flex items-center justify-center text-white'>
                      {user.icon}
                    </div>
                    <p className='text-sm'>{user.name}</p>
                  </div>
                  <div className='rounded-full bg-zinc-200 dark:bg-zinc-800 px-2 py-1 text-xs font-medium font-mono'>
                    {user.info}
                  </div>
                </div>
              ))}
            </AnimatedList>
            <div className='pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-white dark:from-zinc-900'></div>
          </div>
        </div>
        <div className='p-4 md:p-16 relative'>
          <Heading as='h1' className='text-left md:text-left w-fit ml-0 font-bold'>
            Treasuries & DAOs
          </Heading>
          <Heading as='h2' className='text-left md:text-left text-base md:text-base w-fit ml-0'>
            {whosIsItFor[1].description}
          </Heading>
          <div className='relative select-none mt-5 w-[26.5rem] h-[17rem] flex items-center justify-center'>
            <div className=' rounded-xl absolute -mx-4 -my-4 left-0 top-0 z-10 grid grid-cols-5 gap-2 bg-white dark:bg-[#0A0A0B] px-3 py-4'>
              <div
                className='absolute inset-x-4 inset-y-[1.125rem] break-words bg-[radial-gradient(77.54%_77.54%_at_50%_46.74%,#9394A2_0%,rgba(54,54,59,0)_100%)] bg-clip-text font-mono text-[0.4375rem]/3 tracking-widest text-zinc-500 dark:text-transparent'
                style={{ maskImage: "url(/images/grid-mask.svg)", maskSize: "100%" }}
              >
                U4SQ3C306J67PDSAXGD2GKHJN78BN8DW25T7E5T61V2P32P8DDZXKPUOPMLAE6ZWAH0L1AS2HECVZHDH7H546SOWE1Y2GWNDP9UC5OZNR7ZTO6RRTJACN802KUUN72NVUV8DCNZW57PVYMIYAHU3QG87S923ELSX9L20AFEZV2MUZAEV81DNAC8ESA73H6LQS6O355KPGW6JZLU7FW3YF61UHXIOYMJ68TNMTW9VHP5JO28FK06X2LMHEE5QDM5NFMBFWPOS344KJ38F7XNRXO7GTGBZME0BNFVCJEF2BZGITJM6RAK2VX30QZGYN9XAW0ICJ6Y6WCDA1LMUPYRX856UU62LU4UFL93SLQO624CFBC6CK4C4V3AEEGMZLDBDU8D6J3LTKNE8XDDVU4SQ3C306J67PDSAXGD2GKHJN78BN8DW25T7E5T61V2P32P8DDZXKPUOPMLAE6ZWAH0L1AS2HECVZHDH7H546SOWE1Y2GWNDP9UC5OZNR7ZTO6RRTJACN802KUUN72NVUV8DCNZW57PVYMIYAHU3QG87S923ELSX9L20AFEZV2MUZAEV81DNAC8ESA73H6LQS6O355KPGW6JZLU7FW3YF61UHXIOYMJ68TNMTW9VHP5JO28FK06X2LMHEE5QDM5NFMBFWPOS344KJ38F7XNRXO7GTGBZME0BNFVCJEF2BZGITJM6RAK2VX30QZGYN9XAW0ICJ6Y6WCDA1LMUPYRX856UU62LU4UFL93SLQO624CFBC6CK4C4V3AEEGMZLDBDU8D6J3LTKNE8XDDVU4SQ3C306J67PDSAXGD2GKHJN78BN8DW25T7E5T61V2P32P8DDZXKPUOPMLAE6ZWAH0L1AS2HECVZHDH7H546SOWE1Y2GWNDP9UC5OZNR7ZTO6RRTJACN802KUUN72NVUV8DCNZW57PVYMIYAHU3QG87S923ELSX9L20AFEZV2MUZAEV81DNAC8ESA73H6LQS6O355KPGW6JZLU7FW3YF61UHXIOYMJ68TNMTW9VHP5JO28FK06X2LMHEE5QDM5NFMBFWPOS344KJ38F7XNRXO7GTGBZME0BNFVCJEF2BZGITJM6RAK2VX30QZGYN9XAW0ICJ6Y6WCDA1LMUPYRX856UU62LU4UFL93SLQO624CFBC6CK4C4V3AEEGMZLDBDU8D6J3LTKNE8XDDVU4SQ3C306J67PDSAXGD2GKHJN78BN8DW25T7E5T61V2P32P8DDZXKPUOPMLAE6ZWAH0L1AS2HECVZHDH7H546SOWE1Y2GWNDP9UC5OZNR7ZTO6RRTJACN802KUUN72NVUV8DCNZW57PVYMIYAHU3QG87S923ELSX9L20AFEZV2MUZAEV81DNAC8ESA73H6LQS6O355KPGW6JZLU7FW3YF61UHXIOYMJ68TNMTW9VHP5JO28FK06X2LMHEE5QDM5NFMBFWPOS344KJ38F7XNRXO7GTGBZME0BNFVCJEF2BZGITJM6RAK2VX30QZGYN9XAW0ICJ6Y6WCDA1LMUPYRX856UU62LU4UFL93SLQO624CFBC6CK4C4V3AEEGMZLDBDU8D6J3LTKNE8XDDVU4SQ3C306J67PDSAXGD2GKHJN78BN8DW25T7E5T61V2P32P8DDZXKPUOPMLAE6ZWAH0L1AS2HECVZHDH7H546SOWE1Y2GWNDP9UC5OZNR7ZTO6RRTJACN802KUUN72NVUV8DCNZW57PVYMIYAHU3QG87S923ELSX9L20AFEZV2MUZAEV81DNAC8ESA73H6LQS6O355KPGW6JZLU7FW3YF61UHXIOYMJ68TNMTW9VHP5JO28FK06X2LMHEE5QDM5NFMBFWPOS344KJ38F7XNRXO7GTGBZME0BNFVCJEF2BZGITJM6RAK2VX30QZGYN9XAW0ICJ6Y6WCDA1LMUPYRX856UU62LU4UFL93SLQO624CFBC6CK4C4V3AEEGMZLDBDU8D6J3LTKNE8XDDVU4SQ3C306J67PDSAXGD2GKHJ
              </div>
              {[...Array(15)].map((_, index) => {
                return (
                  <div
                    className=' h-[5.5rem] w-20 ring-1 ring-zinc-200 dark:ring-zinc-800 rounded-sm bg-zinc-100 dark:bg-zinc-900'
                    key={index}
                  >
                    {index === 0 && <CardOne />}
                    {index === 3 && <CardThree />}
                    {index === 4 && <CardFive />}
                    {index === 6 && <CardSeven />}
                    {index === 8 && <CardNine />}
                    {index === 13 && <CardEleven />}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      <Lines />
    </Section>
  )
}

export default WhyKivon

const CardOne = () => {
  return (
    <div className='relative h-full w-full rounded-sm'>
      <Image src={"/images/coins/usdc.svg"} alt='usdc' fill className='object-contain' />
      <div className='text-white dark:text-white absolute inset-x-0 -bottom-4 z-10 -mx-[0.5625rem] flex items-center gap-1.5 whitespace-nowrap rounded-full bg-gray-800/80 bg-gradient-to-b from-white/10 to-[67%] py-1 pl-1.5 pr-2.5 font-medium shadow-[0_0.9px_1.8px_theme(colors.black/20%),0_1.8px_11.7px_theme(colors.black/10%)] backdrop-blur-sm before:absolute before:inset-0 before:rounded-full before:ring-1 before:ring-inset before:ring-white/5 before:[mask-image:linear-gradient(to_right,white,transparent)] after:absolute after:inset-0 after:rounded-full after:ring-1 after:ring-inset after:ring-[#64E5FF]/[0.08] after:[mask-image:linear-gradient(to_left,white,transparent)]'>
        <BsCheck className='size-4 shrink-0' />
        <p className='text-xs'>Approved</p>
      </div>
    </div>
  )
}

const CardThree = () => {
  return (
    <div className='relative w-full h-full flex items-center justify-center'>
      <div className='absolute inset-0 rounded-[0.25rem] bg-[radial-gradient(circle,transparent_0%,#60A5FA_51%,transparent_100%)] opacity-30 [clip-path:polygon(0_0,5rem_0,5rem_5.5rem,0_5.5rem,0_1.5px,1.5px_1.5px,1.5px_5.40625rem,4.90625rem_5.40625rem,4.90625rem_1.5px,1.5px_1.5px,0_1.5px)]'></div>
      <div className='absolute rounded-sm bg-blue-400/10 px-1 font-mono text-xs tracking-widest text-blue-400 shadow-[inset_0_0_1px_theme(colors.white/0.15)]'>
        <svg viewBox='0 0 42 12' fill='none' className='absolute inset-0'>
          <path
            d='M39 0.5H40.5C41.0523 0.5 41.5 0.947715 41.5 1.5V3M3 0.5H1.5C0.947715 0.5 0.5 0.947715 0.5 1.5V3M39 11.5H40.5C41.0523 11.5 41.5 11.0523 41.5 10.5V9M3 11.5H1.5C0.947715 11.5 0.5 11.0523 0.5 10.5V9'
            stroke='#60A5FA'
          ></path>
        </svg>
        FUNDS
      </div>
    </div>
  )
}

const CardFive = () => {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const coins = [
    {
      imageUrl: "/images/coins/ethereum.svg",
    },
    {
      imageUrl: "/images/coins/solana.svg",
    },
    {
      imageUrl: "/images/coins/binance-coin.svg",
    },
  ]
  return (
    <div className='relative h-full w-full flex items-center justify-center'>
      <AvatarCircles avatarClassName='h-8 w-8 bg-white dark:bg-zinc-900' avatarUrls={coins} />
      {/* <div className='z-10 absolute inset-x-0 top-11 h-px bg-[linear-gradient(90deg,transparent_0%,theme(colors.white)_49.87%,transparent_100%)]'></div> */}
      {/* <div className='z-10 absolute inset-x-0 bottom-1 -mx-2 h-10 dark:bg-[radial-gradient(45.87%_106.25%_at_50%_0%,#fff,rgba(255,255,255,0))] bg-[radial-gradient(45.87%_106.25%_at_50%_0%,#000,rgba(0,0,0,0))] mix-blend-plus-lighter blur-[1.5px]'></div> */}
      <svg viewBox='0 0 80 88' fill='none' className='absolute inset-0'>
        <path
          d='M0.5 7V3.5C0.5 1.84315 1.84315 0.5 3.5 0.5H7'
          stroke={isDark ? "white" : "black"}
          strokeOpacity='0.5'
          strokeLinejoin='round'
        ></path>
        <path
          d='M0.5 81V84.5C0.5 86.1569 1.84315 87.5 3.5 87.5H7'
          stroke={isDark ? "white" : "black"}
          strokeOpacity='0.5'
          strokeLinejoin='round'
        ></path>
        <path
          d='M79.5 7V3.5C79.5 1.84315 78.1569 0.5 76.5 0.5H73'
          stroke={isDark ? "white" : "black"}
          strokeOpacity='0.5'
          strokeLinejoin='round'
        ></path>
        <path
          d='M79.5 81V84.5C79.5 86.1569 78.1569 87.5 76.5 87.5H73'
          stroke={isDark ? "white" : "black"}
          strokeOpacity='0.5'
          strokeLinejoin='round'
        ></path>
      </svg>
    </div>
  )
}

const CardSeven = () => {
  return (
    <div className='relative h-full w-full flex items-center justify-center'>
      <div className='place-items-center uppercase rounded bg-zinc-200 dark:bg-zinc-800 px-1 font-mono text-xs tracking-widest text-zinc-500 dark:text-zinc-400 shadow-[inset_0_0_1px_theme(colors.white/0.15)]'>
        Pools
      </div>
    </div>
  )
}

const CardNine = () => {
  return (
    <div className='relative h-full w-full flex items-center justify-center'>
      <div className='place-items-center uppercase rounded bg-zinc-200 dark:bg-zinc-800 px-1 font-mono text-xs tracking-widest text-zinc-500 dark:text-zinc-400 shadow-[inset_0_0_1px_theme(colors.white/0.15)]'>
        Staking
      </div>
    </div>
  )
}

const CardEleven = () => {
  return (
    <div className='relative h-full w-full rounded-sm bg-gradient-to-b from-zinc-100 to-white dark:from-zinc-900 dark:to-zinc-900'>
      <Image src={"/images/coins/bitcoin.svg"} alt='bitcoin' fill className='object-contain' />
      <div className='absolute -bottom-3 left-1/2 grid size-6 -translate-x-1/2 place-items-center rounded-full bg-white/80 dark:bg-gray-800/80 bg-gradient-to-b from-white/10 to-[67%] shadow-[0_0.9px_1.8px_theme(colors.black/20%),0_1.8px_11.7px_theme(colors.black/10%)] backdrop-blur-sm before:absolute before:inset-0 before:rounded-full before:ring-1 before:ring-inset before:ring-white/5 before:[mask-image:linear-gradient(to_right,white,transparent)] after:absolute after:inset-0 after:rounded-full after:ring-1 after:ring-inset after:ring-[#64E5FF]/[0.08] after:[mask-image:linear-gradient(to_left,white,transparent)]'>
        <span className='relative flex size-2.5 '>
          <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75'></span>
          <span className='relative inline-flex size-2.5 rounded-full bg-emerald-500'></span>
        </span>
      </div>
    </div>
  )
}
