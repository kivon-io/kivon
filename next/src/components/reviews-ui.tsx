"use client"

import { strapiImage } from "@/lib/strapi/strapiImage"
import { cn } from "@/lib/utils"
import Link from "next/link"
import Balancer from "react-wrap-balancer"
import { BlurImage } from "./blur-image"
import { Heading } from "./elements/heading"
import { Subheading } from "./elements/sub_heading"
import { Marquee } from "./marquee"
import Section from "./section"
import { Button } from "./ui/button"

const ReviewHero = ({
  reviews,
  heading,
  sub_heading,
}: {
  reviews: {
    text: string
    user: { name: string; country: string; image: ImageType }
    index: number
  }[]
  heading: string
  sub_heading: string
}) => {
  const firstRow = reviews?.slice(0, 3)
  const secondRow = reviews?.slice(3)

  return (
    <Section className='pt-0 md:pt-0 px-0 2xl:px-0 rounded-none relative w-full max-w-screen bg-gradient-to-b from-black via-black to-zinc-950'>
      <div className='max-w-7xl mx-auto py-24 md:py-36 '>
        <div className='grid grid-cols-12 gap-5'>
          <div className='col-span-12 md:col-span-5 flex flex-col gap-2'>
            <div className='flex flex-col gap-2'>
              <Heading
                as={"h1"}
                className='text-left mx-0 font-bold from-zinc-100 via-zinc-300 to-zinc-300 dark:from-zinc-100 dark:via-zinc-300 dark:to-zinc-300 text-4xl md:text-5xl'
              >
                {heading}
              </Heading>
              <Subheading
                as={"p"}
                className='text-left mx-0 sm:max-w-lg text-base md:text-lg text-zinc-300 dark:text-zinc-300'
              >
                {sub_heading}
              </Subheading>
            </div>
            <Link href='https://www.trustpilot.com/review/kivon.io' target='_blank'>
              <Button className='w-fit bg-white hover:bg-white/90 text-black'>
                Leave a Review
              </Button>
            </Link>
          </div>
          <div className='col-span-12 md:col-span-7'>
            <div className='relative flex w-full flex-col items-center justify-center overflow-hidden '>
              <Marquee pauseOnHover className='[--duration:20s] relative'>
                {firstRow.map((review, index) => (
                  <ReviewCard key={index} {...review} />
                ))}
              </Marquee>
              <Marquee reverse pauseOnHover className='[--duration:20s]'>
                {secondRow.map((review, index) => (
                  <ReviewCard key={index} {...review} />
                ))}
              </Marquee>
              <div className='pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-black'></div>
              <div className='pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-black'></div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

export { ReviewHero }

const ReviewCard = ({
  text,
  user,
}: {
  text: string
  user: { name: string; country: string; image: ImageType }
  index: number
}) => {
  return (
    <div className={cn("border border-zinc-700 rounded-xl p-5 shrink-0 w-64 md:w-96 relative")}>
      <div className='flex flex-col gap-10'>
        <p className={cn("text-xs md:text-sm text-zinc-300 dark:text-zinc-300")}>
          <Balancer>{text}</Balancer>
        </p>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col'>
            <p className='text-sm font-medium text-zinc-300 dark:text-zinc-300'>{user.name}</p>
            <small className='text-xs text-zinc-500 dark:text-zinc-400'>{user.country}</small>
          </div>
          {user.image && user.image.url && (
            <BlurImage
              src={strapiImage(user.image.url)}
              alt={user.name}
              width={40}
              height={40}
              className='rounded-full shrink-0 object-cover object-center w-10 h-10'
            />
          )}
        </div>
      </div>
    </div>
  )
}
