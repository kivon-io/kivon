"use client"

import { ChartAreaIcon, RefreshCcw } from "lucide-react"
import { motion } from "motion/react"
import { useState } from "react"
import { Grid } from "../decorations/grid"
import { AnimatedNumberRandom } from "../elements/animated-number-random"
import FastService from "../elements/designs/fast-service"
import Secure from "../elements/designs/secure"
import { BentoGrid, BentoGridItem } from "../elements/grid"
import { Heading } from "../elements/heading"
import { Subheading } from "../elements/sub_heading"
import Section from "../section"
import { Badge } from "../ui/badge"

interface Services {
  id: number
  heading: string
  sub_heading: string
  live_support_card: {
    id: number
    title: string
    description: string
    span: string
  }
  market_rate_card: {
    id: number
    title: string
    description: string
    span: string
  }
  secure_card: {
    id: number
    title: string
    description: string
    span: string
  }
  transaction_card: {
    id: number
    title: string
    description: string
    span: string
  }
}

const Services = ({ services }: { services: Services[] }) => {
  const {
    heading,
    sub_heading,
    live_support_card,
    market_rate_card,
    secure_card,
    transaction_card,
  } = services[0]

  const items = [
    {
      id: live_support_card.id,
      title: live_support_card.title,
      description: live_support_card.description,
      key: "support",
      span: live_support_card.span,
    },
    {
      id: market_rate_card.id,
      title: market_rate_card.title,
      description: market_rate_card.description,
      key: "market",
      span: market_rate_card.span,
    },
    {
      id: secure_card.id,
      title: secure_card.title,
      description: secure_card.description,
      key: "secure",
      span: secure_card.span,
    },
    {
      id: transaction_card.id,
      title: transaction_card.title,
      description: transaction_card.description,
      key: "fast",
      span: transaction_card.span,
    },
  ]

  return (
    <Section>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className='relative max-w-7xl mx-auto px-4 md:px-0'
      >
        <Heading as='h2' className='text-xl md:text-2xl font-medium text-left w-full max-w-full'>
          {heading}
        </Heading>
        <Subheading className='text-sm text-neutral-500 dark:text-neutral-400 text-left w-full max-w-full'>
          {sub_heading}
        </Subheading>
      </motion.div>
      <BentoGrid className=''>
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={
              item.key === "support" ? (
                <Support />
              ) : item.key === "market" ? (
                <Market />
              ) : item.key === "secure" ? (
                <SecureComponent />
              ) : item.key === "fast" ? (
                <Fast />
              ) : (
                <Skeleton />
              )
            }
            bodyClassName={
              item.key === "support"
                ? "p-4"
                : item.key === "market"
                ? "p-4"
                : item.key === "secure"
                ? "p-4"
                : item.key === "fast"
                ? "p-4"
                : ""
            }
            className={[
              item.key === "support" && "md:col-span-2 p-0",
              item.key === "market" && "md:col-span-1 p-0",
              item.key === "fast" && "md:col-span-2 p-0",
              item.key === "secure" && "md:col-span-1 p-0",
            ]
              .filter(Boolean)
              .join(" ")}
          />
        ))}
      </BentoGrid>
    </Section>
  )
}

export default Services

const Skeleton = () => (
  <div className='flex flex-1 w-full h-full min-h-[6rem] rounded-xl   dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black'></div>
)

const Support = () => {
  return (
    <div className='relative overflow-hidden pt-4 px-4 md:px-0'>
      <div
        className='z-10 text-slate-12 relative flex min-w-[80%] max-w-[70%] mx-auto flex-col items-center justify-center gap-2 overflow-hidden text-balance rounded-xl border border-zinc-200/50 dark:border-white/10 dark:bg-[rgba(255,255,255,.024)] bg-[rgba(0,0,0,.024)] px-4 pb-6 pt-8 text-center backdrop-blur-2xl backdrop-filter [box-shadow:0_0_4rem_.5rem_rgba(255,255,255,0.042),0_0_1rem_.375rem_rgba(255,255,255,0.012)] md:gap-0 md:px-11 md:pb-20 md:pt-14'
        style={{ opacity: 1, transform: "none" }}
      >
        <div className='pointer-events-none absolute inset-0 bg-gradient-to-b from-white/5 mix-blend-soft-light'></div>
        <svg
          className='absolute inset-0 z-[1] -mt-16 -translate-x-2 mix-blend-soft-light opacity-40'
          fill='none'
          height='240'
          viewBox='0 0 421 240'
          width='460'
          aria-hidden='true'
          style={{ opacity: 1 }}
        >
          <g filter='url(#filter0_f_664_1362)'>
            <circle cx='202.5' cy='21.5' fill='#404040' fillOpacity='0.42' r='84.5'></circle>
            <circle cx='202.5' cy='21.5' r='81.5' stroke='#404040' strokeWidth='6'></circle>
          </g>
          <defs>
            <filter
              colorInterpolationFilters='sRGB'
              filterUnits='userSpaceOnUse'
              height='437'
              id='filter0_f_664_1362'
              width='437'
              x='-16'
              y='-197'
            >
              <feFlood floodOpacity='0' result='BackgroundImageFix'></feFlood>
              <feBlend
                in='SourceGraphic'
                in2='BackgroundImageFix'
                mode='normal'
                result='shape'
              ></feBlend>
              <feGaussianBlur
                result='effect1_foregroundBlur_664_1362'
                stdDeviation='67'
              ></feGaussianBlur>
            </filter>
          </defs>
        </svg>
        <span className='relative z-[2] text-lg font-medium'>Your support is our priority</span>
        <span className='relative z-[3] text-sm opacity-70'>
          We will get back to you as soon as possible
        </span>
      </div>
      <div
        className='z-10 relative flex w-full min-w-[90%] max-w-full mx-auto flex-col items-center justify-between gap-2 overflow-hidden rounded-xl border border-zinc-200/50 dark:border-white/10 bg-[rgba(255,255,255,.03)] px-4 pb-4 pt-3.5 backdrop-blur-[1.875rem] backdrop-filter md:-mt-12 md:w-fit md:flex-row md:px-8 md:py-4'
        style={{ opacity: 1, transform: "translateY(-8px)" }}
      >
        <div className='pointer-events-none absolute inset-0 bg-gradient-to-b from-white/5 mix-blend-soft-light'></div>
        <div className='flex relative w-full justify-start md:w-fit items-center gap-4'>
          <div className='h-8 w-8 shrink-0 rounded-full bg-gradient-to-b from-zinc-200/50 to-white/50 dark:from-white/10 dark:to-zinc-200/10 border border-zinc-200/50 dark:border-white/10 md:h-9 md:w-9'></div>
          <span className='text-sm font-medium'>support@kivon.io</span>
        </div>
        <div className='relative -mt-1 flex w-full items-center justify-start gap-2.5 pl-11 md:mt-0 md:w-[unset] md:shrink-1 md:grow md:basis-0 md:justify-end md:p-0'>
          <span className='rounded-[.2813rem] bg-zinc-300 dark:bg-zinc-800 px-2 py-1.5 text-xs font-medium leading-none dark:text-[#FF7C62] text-[#2B0000]'>
            Support
          </span>
          <span className='text-slate-8 text-xs'>19 minutes ago</span>
        </div>
      </div>
      <Grid size={20} className='absolute -top-5 left-0' />
    </div>
  )
}

const Market = () => {
  const numbers = [124.23, 41.75, 2125.95]
  const diffs = [0.0564, -0.114, 0.0029]

  const [currentIndex, setCurrentIndex] = useState(0)

  const handleCustomClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % numbers.length)
  }

  return (
    <div className='relative overflow-hidden pt-4'>
      <div className='flex flex-col items-center justify-center gap-3 relative z-10'>
        <Badge
          variant='outline'
          className='bg-white dark:bg-black rounded-[14px] border border-black/10 text-xs text-neutral-800 dark:text-neutral-200 md:left-6'
        >
          <ChartAreaIcon className='fill-secondary-custom stroke-1 text-neutral-800' />
          Market rates
        </Badge>
        <AnimatedNumberRandom value={numbers[currentIndex]} diff={diffs[currentIndex]} />
        <button
          onClick={handleCustomClick}
          className='duration-[.16s] ease-[cubic-bezier(.4,0,.2,1)] active:duration-[25ms] mx-auto mt-4 flex h-11 w-fit items-center gap-2 rounded-full bg-zinc-900 px-5 text-sm font-medium text-zinc-50 transition hover:brightness-125 active:scale-[98%] active:brightness-[98%]'
        >
          <RefreshCcw className='size-5' />
          Best rates
        </button>
      </div>
      <Grid size={20} className='absolute -top-5 left-0' />
    </div>
  )
}

const Fast = () => {
  return (
    <div className='relative flex w-full h-32 md:h-full overflow-hidden select-none'>
      <FastService />
      <Grid size={20} className='absolute -top-5 left-0' />
    </div>
  )
}

const SecureComponent = () => {
  return (
    <div className='relative  flex overflow-hidden'>
      <Secure />
    </div>
  )
}
