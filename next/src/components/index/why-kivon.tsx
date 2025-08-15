"use client"

import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { BsBank } from "react-icons/bs"
import { LuCoins } from "react-icons/lu"
import { TbAutomation } from "react-icons/tb"
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

const WhyKivon = () => {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <Section className='relative pt-0 md:pt-0 overflow-hidden'>
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
                <Heading as='h2' className='text-left md:text-left text-lg md:text-lg w-fit ml-0'>
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
      <Lines />
    </Section>
  )
}

export default WhyKivon
