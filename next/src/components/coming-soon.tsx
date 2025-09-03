"use client"

import { motion } from "motion/react"
import { Grid } from "./decorations/grid"

const ComingSoon = ({ title, description }: { title: string; description: string }) => {
  return (
    <motion.div className='mb-10 h-[500px] rounded-3xl bg-white dark:bg-black flex flex-col items-center justify-center gap-2 relative overflow-hidden mt-20 md:mt-0'>
      <div className='relative z-20 w-full flex flex-col items-center justify-center h-full'>
        <h1 className='text-2xl md:text-4xl font-bold text-center'>{title}</h1>
        <p className='text-sm text-zinc-500 text-center mt-3'>{description}</p>
        <div className='absolute bottom-0 font-source-code-pro text-sm flex  px-4 py-2 mt-2 bg-zinc-200 dark:bg-zinc-900 w-full rounded-b-3xl justify-between items-center'>
          <p className=''>
            [INFO] IN PROGRESS
            <span className='animate-spin inline-block ml-3'>/</span>
          </p>
          <p>Come back later 😊</p>
        </div>
      </div>
      <Grid size={40} className='absolute inset-0' />
    </motion.div>
  )
}

export default ComingSoon
