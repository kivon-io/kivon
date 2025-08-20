"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import StarBackground from "../decorations/stars-background"
import { Heading } from "../elements/heading"
import { Subheading } from "../elements/sub_heading"
import Section from "../section"
import { Button } from "../ui/button"

const JoinNow = () => {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <Section className='relative max-w-7xl mx-auto px-2 md:px-0 2xl:px-0'>
      <div className='relative isolate mt-40 pt-11 sm:pt-20 md:mt-40'>
        <div className='absolute left-1/2 top-0 -z-10 ml-[-38rem] aspect-[1216/708] w-[76rem]'>
          <div
            className='absolute inset-0 -mt-10 rounded-[50%] blur-[78px]'
            style={{
              backgroundImage:
                "radial-gradient(99.29% 99.29% at 50% 0.71%, #f7acbd29 7.97%, #f5acbd 23.47%, rgb(124 98 248 / 0) 30%);",
            }}
          ></div>
          <div
            className='absolute inset-0 -mt-0.5 rounded-[50%]'
            style={{
              backgroundImage:
                "linear-gradient(rgb(255 255 255 / 0.1), rgb(255 255 255 / 0) 5.875rem)",
            }}
          ></div>
          <StarBackground className='absolute -top-[20rem] z-10' />
          {mounted && theme === "dark" ? (
            <div
              className='absolute inset-0 rounded-[50%] z-10'
              style={{
                backgroundImage:
                  "radial-gradient(99.29% 99.29% at 50% 0.71%, #0A0A0B 18.35%, rgb(10 10 11 / 0.04) 83.5%)",
              }}
            ></div>
          ) : (
            <div
              className='absolute inset-0 rounded-[50%] z-10'
              style={{
                backgroundImage:
                  "radial-gradient(99.29% 99.29% at 50% 0.71%, #ffffff 18.35%, rgb(10 10 11 / 0.04) 83.5%)",
              }}
            ></div>
          )}
        </div>
        <div className='relative flex flex-col items-center justify-center'>
          <Heading as='h1' className='text-center md:text-center w-fit max-w-lg mx-auto font-bold'>
            All the tools you need to build your index, simplified
          </Heading>
          <Subheading className='text-base md:text-lg text-center'>
            The most versatile and comprehensive platform.
          </Subheading>
          <div className='flex flex-col items-center justify-center'>
            <Button>Join waitlist</Button>
          </div>
        </div>
      </div>
    </Section>
  )
}

export default JoinNow
