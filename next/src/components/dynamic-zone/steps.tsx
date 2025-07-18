"use client"

import stepsData from "@/data/steps.json"
import { motion } from "motion/react"
import { Heading } from "../elements/heading"
import StepsCard from "../elements/steps-card"
import { Subheading } from "../elements/sub_heading"
import Section from "../section"

const Steps = () => {
  const { steps } = stepsData
  return (
    <Section className='bg-white dark:bg-neutral-900 max-w-screen w-full mt-20'>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='relative max-w-7xl mx-auto px-4 md:px-0'
      >
        <Heading as='h2' className='text-xl md:text-2xl font-medium text-left w-full max-w-full'>
          {stepsData.title}
        </Heading>
        <Subheading className='text-sm text-neutral-500 dark:text-neutral-400 text-left w-full max-w-full'>
          {stepsData.description}
        </Subheading>
      </motion.div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 md:py-10 max-w-7xl mx-auto'>
        {steps.map((step, index) => (
          <StepsCard key={step.title} {...step} index={index} />
        ))}
      </div>
    </Section>
  )
}

export default Steps
