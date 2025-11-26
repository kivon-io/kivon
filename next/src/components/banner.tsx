"use client"

import { MoveRight } from "lucide-react"
import { motion } from "motion/react"
import Image from "next/image"
import { FlickeringGrid } from "./decorations/flickering-grid"

const Banner = () => {
  const handleClick = () => {
    window.location.href = process.env.NEXT_PUBLIC_HEDERA_BRIDGE!
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className='max-w-lg rounded-2xl bg-linear-to-r from-black to-neutral-900 p-3 relative overflow-hidden cursor-pointer'
      onClick={handleClick}
    >
      <div className='flex items-center gap-4 relative z-10 justify-evenly'>
        <div className='flex items-center gap-2'>
          <p className='text-white text-lg font-medium'>
            Enjoy <span className='font-mono'>0</span> Fee Bridge
          </p>
          <div className='rounded-full bg-zinc-800 flex items-center justify-center h-8'></div>
        </div>
        <MoveRight className='size-6 text-white' />
        <div className='flex gap-2'>
          <div className='h-8 w-8 rounded-full relative overflow-hidden'>
            <Image
              src='https://assets.coingecko.com/coins/images/3688/standard/hbar.png?1696504364'
              alt='Hedera'
              width={32}
              height={32}
              className='object-cover object-center'
            />
          </div>
          <p className='text-white text-lg'>Hedera</p>
        </div>
      </div>
      <FlickeringGrid
        className='absolute inset-0 h-full w-full'
        squareSize={1}
        gridGap={2}
        color={"#ffffff"}
        maxOpacity={0.5}
        flickerChance={0.1}
      />
    </motion.div>
  )
}

export default Banner
