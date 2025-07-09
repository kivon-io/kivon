"use client"
import { motion } from "motion/react"
import { Cover } from "../decorations/cover"
import { Grid } from "../decorations/grid"
import { Heading } from "../elements/heading"
import { Subheading } from "../elements/sub_heading"

const heading = "Exchange any Web3 Crypto limitlessly, instantly, securely and easily"

const Hero = () => {
  return (
    <div className='relative max-w-screen-2xl mx-auto py-10'>
      <div className='relative z-20'>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Heading as='h1' className='text-2xl md:text-4xl lg:text-5xl font-bold'>
            {heading.substring(0, heading.lastIndexOf(" "))}{" "}
            <Cover>{heading.split(" ").pop()}</Cover>
          </Heading>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Subheading as='p' className='text-sm md:text-base lg:text-lg'>
            Exchange bitcoin and over 1,400+ crypto currencies with ease. No Wallet. No Tracking. No
            KYC. Swap multichain in seconds.
          </Subheading>
        </motion.div>

        <div className='mx-auto w-lg h-[500px] rounded-2xl bg-zinc-300'></div>
      </div>
      <Grid size={60} className='top-20 left-0 right-0 bottom-0 opacity-60' />
    </div>
  )
}

export default Hero
