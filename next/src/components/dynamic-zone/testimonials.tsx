"use client"

import testimonialsData from "@/data/testimonials.json"
import { cn } from "@/lib/utils"
import { motion } from "motion/react"
import { SiTrustpilot } from "react-icons/si"
import Balancer from "react-wrap-balancer"
import { BlurImage } from "../blur-image"
import { Heading } from "../elements/heading"
import { Subheading } from "../elements/sub_heading"
import Section from "../section"

const Testimonials = () => {
  const { heading, description, testimonials } = testimonialsData
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
          {description}
        </Subheading>
      </motion.div>

      <div className='relative overflow-hidden md:overflow-visible'>
        <div
          className='absolute opacity-30 inset-x-0 h-px -top-px bg-zinc-400/50 dark:bg-zinc-400/50'
          style={{
            backgroundImage:
              "url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 1'%3E%3Crect width='1' height='1' fill='%404040'/%3E%3C/svg%3E')",
            maskImage:
              "linear-gradient(to right, transparent, white 4rem, white calc(100% - 4rem), transparent)",
            marginLeft: "-4rem",
            marginRight: "-4rem",
          }}
        ></div>
        <div
          className='absolute opacity-30 inset-y-0 w-px -right-px bg-zinc-400/50 dark:bg-zinc-400/50'
          style={{
            backgroundImage:
              "url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 4'%3E%3Crect width='1' height='1' fill='%23212126'/%3E%3C/svg%3E')",
            maskImage:
              "linear-gradient(transparent, white 4rem, white calc(100% - 4rem), transparent)",
            marginTop: "-4rem",
            marginBottom: "-4rem",
          }}
        ></div>
        <div
          className='absolute opacity-30 inset-x-0 h-px -bottom-px bg-zinc-400/50 dark:bg-zinc-400/50'
          style={{
            backgroundImage:
              "url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 1'%3E%3Crect width='1' height='1' fill='%23212126'/%3E%3C/svg%3E')",
            maskImage:
              "linear-gradient(to right, transparent, white 4rem, white calc(100% - 4rem), transparent)",
            marginLeft: "-4rem",
            marginRight: "-4rem",
          }}
        ></div>
        <div
          className='absolute opacity-30 inset-y-0 w-px -left-px bg-zinc-400/50 dark:bg-zinc-400/50'
          style={{
            backgroundImage:
              "url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 4'%3E%3Crect width='1' height='1' fill='%23212126'/%3E%3C/svg%3E')",
            maskImage:
              "linear-gradient(transparent, white 4rem, white calc(100% - 4rem), transparent)",
            marginTop: "-4rem",
            marginBottom: "-4rem",
          }}
        ></div>
        <div className='flex overflow-x-auto md:overflow-x-visible md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 scrollbar-hide'>
          {testimonials.map((testimonial, index) => (
            <Testimonial key={testimonial.id} {...testimonial} index={index} />
          ))}
        </div>
      </div>
    </Section>
  )
}

export default Testimonials

const Testimonial = ({
  name,
  country,
  testimonial,
  image,
  index,
}: {
  name: string
  country: string
  testimonial: string
  image: string
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
            <Balancer>{testimonial}</Balancer>
          </p>
          <div className='flex items-center justify-between'>
            <div className='flex flex-col'>
              <p className='text-sm font-medium'>{name}</p>
              <small className='text-xs text-zinc-500 dark:text-zinc-400'>{country}</small>
            </div>
            <BlurImage
              src={image}
              alt={name}
              width={40}
              height={40}
              className='rounded-full shrink-0 object-cover object-center w-10 h-10'
            />
          </div>
        </div>
      </div>
    </div>
  )
}
