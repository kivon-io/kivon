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
          <p className='text-white text-sm md:text-lg font-medium'>
            Enjoy <span className='font-mono'>0</span> Fee Bridge
          </p>
          <div className='flex md:-space-x-4 -space-x-2'>
            <Image
              src='https://coin-images.coingecko.com/coins/images/6319/large/usdc.png?1696506694'
              alt='USDC'
              width={32}
              height={32}
              className='object-cover object-center md:w-8 md:h-8 w-6 h-6'
            />
            <Image
              src='https://coin-images.coingecko.com/coins/images/39963/large/usdt.png?1724952731'
              alt='USDT'
              width={32}
              height={32}
              className='object-cover object-center md:w-8 md:h-8 w-6 h-6'
            />
            <Image
              src='https://coin-images.coingecko.com/coins/images/39810/large/weth.png'
              alt='WETH'
              width={32}
              height={32}
              className='object-cover object-center rounded-full md:w-8 md:h-8 w-6 h-6'
            />
          </div>
        </div>
        <MoveRight className='size-6 text-white' />
        <div className='flex gap-2 items-center'>
          <div className='md:h-8 md:w-8 h-6 w-6 rounded-full relative overflow-hidden'>
            <Image
              src='https://assets.coingecko.com/coins/images/3688/standard/hbar.png?1696504364'
              alt='Hedera'
              width={32}
              height={32}
              className='object-cover object-center'
            />
          </div>
          <p className='text-white text-sm md:text-lg'>Hedera</p>
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
