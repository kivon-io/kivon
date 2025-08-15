"use client"

import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import Image from "next/image"
import { useEffect, useState } from "react"
import { BsBank, BsCheck } from "react-icons/bs"
import { LuCoins } from "react-icons/lu"
import { TbAutomation } from "react-icons/tb"
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
      "Treasuries & DAOs standardizing treasury sleeves (e.g., “Top-20 L1s,” “DeFi blue-chips,” “Stablecoin carry”). ",
  },
]

const WhyKivon = () => {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <Section className='relative md:pt-0 mt-12 sm:mt-0 overflow-hidden md:overflow-visible max-w-7xl mx-auto'>
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
        <div className='p-4 md:p-16 bg-white dark:bg-zinc-900 relative h-full'>
          <Heading as='h2' className='text-left md:text-left text-base md:text-base w-fit ml-0'>
            {whosIsItFor[0].description}
          </Heading>
          <div className='h-[17rem] relative flex w-full flex-col overflow-hidden p-2 mt-10'>
            <AnimatedList className='gap-2 px-10'>
              {[...Array(30)].map((_, index) => (
                <div
                  key={index}
                  className='bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-2 rounded-xl flex justify-between items-center'
                >
                  <div className='flex items-center gap-2'>
                    <div className='h-12 w-12 rounded-lg bg-zinc-400 dark:bg-zinc-800'></div>
                    <p>Brett Harris</p>
                  </div>
                  <div className='rounded-full bg-zinc-200 dark:bg-zinc-800 px-2 py-1 text-xs'>
                    Asset Manager
                  </div>
                </div>
              ))}
            </AnimatedList>
            <div className='pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-white dark:from-zinc-900'></div>
          </div>
        </div>
        <div className='p-4 md:p-16 relative'>
          <Heading as='h2' className='text-left md:text-left text-base md:text-base w-fit ml-0'>
            {whosIsItFor[1].description}
          </Heading>
          <div className='relative select-none mt-10 w-full h-full flex items-center justify-center'>
            <div className='rounded-xl absolute left-0 top-0 z-10 grid grid-cols-5 gap-2 bg-white dark:bg-[#0A0A0B] px-3 py-4'>
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
                    {index === 4 && <CardFive />}
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
    <div className='relative h-full w-full rounded-sm bg-gradient-to-b from-[#50af95] via-[#50af95] to-[#9cf7de]'>
      <Image src={"/images/coins/tether.svg"} alt='tether' fill className='object-contain' />
      <div className='text-white dark:text-white absolute inset-x-0 -bottom-4 z-10 -mx-[0.5625rem] flex items-center gap-1.5 whitespace-nowrap rounded-full bg-gray-800/80 bg-gradient-to-b from-white/10 to-[67%] py-1 pl-1.5 pr-2.5 font-medium shadow-[0_0.9px_1.8px_theme(colors.black/20%),0_1.8px_11.7px_theme(colors.black/10%)] backdrop-blur-sm before:absolute before:inset-0 before:rounded-full before:ring-1 before:ring-inset before:ring-white/5 before:[mask-image:linear-gradient(to_right,white,transparent)] after:absolute after:inset-0 after:rounded-full after:ring-1 after:ring-inset after:ring-[#64E5FF]/[0.08] after:[mask-image:linear-gradient(to_left,white,transparent)]'>
        <BsCheck className='size-4 shrink-0' />
        <p className='text-xs'>Approved</p>
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
