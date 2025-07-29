"use client"

import { strapiImage } from "@/lib/strapi/strapiImage"
import { cn } from "@/lib/utils"
import { motion } from "motion/react"
import { SiTrustpilot } from "react-icons/si"
import Balancer from "react-wrap-balancer"
import { BlurImage } from "../blur-image"
import Lines from "../decorations/lines"
import { Heading } from "../elements/heading"
import { Subheading } from "../elements/sub_heading"
import Section from "../section"

interface Testimonials {
  heading: string
  sub_heading: string
  testimonials: {
    id: number
    text: string
    user: {
      name: string
      country: string
      image: ImageType
    }
  }[]
}

const Testimonials = ({ heading, sub_heading, testimonials }: Testimonials) => {
  return (
    <Section className='mx-auto max-w-7xl'>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='relative max-w-7xl mx-auto px-4 md:px-0'
      >
        <Heading as='h2' className='text-xl md:text-2xl font-medium w-full max-w-full'>
          {heading}
        </Heading>
        <Subheading className='text-sm text-neutral-500 dark:text-neutral-400 w-full max-w-full'>
          {sub_heading}
        </Subheading>
      </motion.div>

      <div className='relative overflow-hidden md:overflow-visible'>
        <Lines />
        <div className='flex overflow-x-auto md:overflow-x-visible md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 scrollbar-hide'>
          {testimonials?.map((testimonial, index) => (
            <Testimonial key={testimonial.id} {...testimonial} index={index} />
          ))}
        </div>
      </div>
    </Section>
  )
}

export default Testimonials

const Testimonial = ({
  text,
  user,
  index,
}: {
  text: string
  user: {
    name: string
    country: string
    image: ImageType
  }
  index: number
}) => {
  return (
    <div
      className={cn(
        "border border-zinc-300 dark:border-zinc-700 rounded-xl p-5 shrink-0 w-5/6 md:w-full",
        index === 0 && "bg-white dark:bg-black row-span-2",
        index === 4 && "row-span-2 bg-gradient-to-b from-secondary-custom to-secondary-custom/50"
      )}
    >
      <div className='flex flex-col h-full justify-between'>
        {(index === 0 || index === 4) && (
          <div className='flex gap-2 items-center'>
            <SiTrustpilot className='text-2xl text-emerald-500' />
            <p className='text-sm font-medium'>Trustpilot</p>
          </div>
        )}
        <div className='flex flex-col gap-10'>
          <p
            className={cn(
              (index === 0 || index === 4) && "text-sm md:text-2xl mt-5 md:mt-0",
              "text-sm md:text-base"
            )}
          >
            <Balancer>{text}</Balancer>
          </p>
          <div className='flex items-center justify-between'>
            <div className='flex flex-col'>
              <p className='text-sm font-medium'>{user.name}</p>
              <small className='text-xs text-zinc-500 dark:text-zinc-400'>{user.country}</small>
            </div>
            {user.image.url && (
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
    </div>
  )
}
