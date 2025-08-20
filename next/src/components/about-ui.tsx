"use client"

import { integrations } from "@/lib/integrations"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { FlickeringGrid } from "./decorations/flickering-grid"
import { Grid } from "./decorations/grid"
import { Heading } from "./elements/heading"
import { Subheading } from "./elements/sub_heading"
import { Marquee } from "./marquee"
import { Button } from "./ui/button"

const AboutHero = () => {
  return (
    <div className='relative flex h-[30rem] md:h-[40rem] w-full overflow-hidden antialiased md:items-center md:justify-center'>
      <div
        className={cn(
          "pointer-events-none absolute inset-0 [background-size:40px_40px] select-none"
          //   "[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]"
        )}
      />

      <div className='relative z-10 mx-auto w-full max-w-7xl p-4 pt-20 md:pt-0'>
        <Heading as='h1' size='xl' className='text-center font-bold '>
          At the heart of Kivon it&apos;s all about the user
        </Heading>
        <Subheading
          as={"p"}
          className='text-center mx-auto sm:max-w-2xl text-base md:text-lg text-zinc-800 dark:text-zinc-100'
        >
          We are on a mission to solve cross-chain complexity once and for all. We are a globally
          distributed team dedicated to providing the best user experience with obsessive attention
          to every detail.
        </Subheading>
      </div>
      <Grid size={60} className='absolute inset-0' />
    </div>
  )
}

const AboutPrinciples = () => {
  const principles = [
    {
      title: "Simplicity",
      description:
        "We believe complex technology should feel effortless. We design intuitive interfaces that make cross-chain transactions as simple as sending an email, removing barriers between users and DeFi.",
    },
    {
      title: "Security",
      description:
        "Your assets are sacred. We implement battle-tested security protocols and conduct rigorous audits to ensure every transaction is protected by the highest standards of cryptographic security.",
    },
    {
      title: "Interoperability",
      description:
        "The future of finance is multi-chain. Kivon bridges ecosystems by enabling seamless asset movement across blockchains, creating a unified DeFi experience without compromises.",
    },
    {
      title: "Transparency",
      description:
        "Trust through openness. We maintain complete transparency in our operations, fees, and technology, empowering users with the information they need to make confident decisions.",
    },
  ]

  return (
    <div className='relative'>
      <div className='isolate border-t border-secondary-custom'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-2 border-b border-l border-r border-dashed border-zinc-300 dark:border-zinc-800'>
          {principles.map((principle, index) => (
            <div
              key={index}
              className='group border-r border-zinc-300 dark:border-zinc-800 last:border-r-0'
            >
              <div className='p-4 md:p-6'>
                <Heading
                  as='h3'
                  className='text-sm md:text-base text-left font-semibold mb-4 text-zinc-900 dark:text-zinc-100'
                >
                  {principle.title}
                </Heading>
                <Subheading
                  as='p'
                  className='text-left text-sm md:text-sm text-zinc-600 dark:text-zinc-400'
                >
                  {principle.description}
                </Subheading>
              </div>
            </div>
          ))}
        </div>
        <div className='w-full items-center justify-center grid grid-cols-4 gap-2 py-10 md:py-16 border-l border-r border-dashed border-zinc-300 dark:border-zinc-800'>
          <div className='text-left text-lg md:text-xl font-semibold text-zinc-600 dark:text-zinc-400 col-span-4 md:col-span-2 md:col-start-2'>
            Our goal is to make cross-chain transactions as simple as sending an email, removing
            barriers between users and DeFi.
          </div>
        </div>
      </div>
    </div>
  )
}

const Integrations = () => {
  const { theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Ensure component is mounted before accessing theme
  React.useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = theme === "dark"

  // Don't render logos until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className='h-40 flex items-center justify-center relative overflow-hidden bg-zinc-100 dark:bg-zinc-900 w-full border-l border-r border-dashed border-zinc-300 dark:border-zinc-800'>
        <FlickeringGrid
          className='absolute inset-0 my-auto z-0 w-[calc(100%-1rem)] h-[calc(100%-1rem)] mx-auto'
          squareSize={1}
          gridGap={4}
          color={theme === "dark" ? "#f0f0f0" : "#000000"}
          maxOpacity={0.5}
          flickerChance={0.1}
        />
        <div className='pointer-events-none absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-zinc-100 dark:from-zinc-900'></div>
        <div className='pointer-events-none absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-zinc-100 dark:from-zinc-900'></div>
      </div>
    )
  }

  return (
    <div className='h-40 flex items-center justify-center relative overflow-hidden bg-zinc-100 dark:bg-zinc-900 w-full border-l border-r border-dashed border-zinc-300 dark:border-zinc-800'>
      <FlickeringGrid
        className='absolute inset-0 my-auto z-0 w-[calc(100%-1rem)] h-[calc(100%-1rem)] mx-auto'
        squareSize={1}
        gridGap={4}
        color={theme === "dark" ? "#f0f0f0" : "#000000"}
        maxOpacity={0.5}
        flickerChance={0.1}
      />
      <Marquee pauseOnHover className='[--duration:20s] relative md:gap-10'>
        {integrations.map((item) => {
          const logoSrc = isDark
            ? item.logo // Use light logo on dark theme
            : item.dark_logo || item.logo // Use dark logo on light theme, fallback to regular logo

          return (
            <div key={item.name} className='w-28 h-8 md:w-32 sm:h-12 relative'>
              <Image
                src={logoSrc}
                alt={item.name}
                fill
                className={cn("object-contain grayscale")}
              />
            </div>
          )
        })}
      </Marquee>
      <div className='pointer-events-none absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-zinc-100 dark:from-zinc-900'></div>
      <div className='pointer-events-none absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-zinc-100 dark:from-zinc-900'></div>
    </div>
  )
}

const Community = () => {
  return (
    <div className='grid cols-1 md:grid-cols-2 gap-4 border border-zinc-300 dark:border-zinc-800  relative'>
      <div className='p-4 md:p-16 relative overflow-hidden md:border-r border-zinc-300 dark:border-zinc-800'>
        <div className='flex flex-col justify-start items-start md:items-center md:justify-center relative z-10'>
          <Heading
            as='h3'
            className='mx-0 text-base md:text-lg text-left md:text-center font-semibold text-zinc-900 dark:text-zinc-100'
          >
            Join our community
          </Heading>
          <Subheading
            as='p'
            className='text-sm md:text-base text-left md:text-center text-zinc-600 dark:text-zinc-400'
          >
            We are a community-driven project and we love to have you on board.
          </Subheading>
          <Link href='https://t.me/kivon_io' target='_blank'>
            <Button className='w-fit'>Join our community</Button>
          </Link>
        </div>
        <Grid size={30} className='absolute -right-20 top-0 select-none' />
      </div>
      <div className='p-4 md:p-16'>
        <Heading
          as='h3'
          className='text-base md:text-lg text-left font-semibold text-zinc-900 dark:text-zinc-100'
        >
          Contact us
        </Heading>
        <Subheading
          as='p'
          className='text-sm md:text-base text-left text-zinc-600 dark:text-zinc-400'
        >
          Let&apos;s build something great together! if you want to collaborate or partner with us
          or have any questions, please reach out to us.
        </Subheading>
        <Link href='/contact-us'>
          <Button className='w-fit'>Contact us</Button>
        </Link>
      </div>
    </div>
  )
}

export { AboutHero, AboutPrinciples, Community, Integrations }
