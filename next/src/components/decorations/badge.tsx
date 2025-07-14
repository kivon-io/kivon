import React from "react"

const Badge = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='group relative px-1.5 text-sm/6 text-secondary-custom dark:text-secondary-custom'>
      <span className='absolute inset-0 border border-dashed border-secondary-custom/60 bg-secondary-custom/10 group-hover:bg-secondary-custom/15 dark:border-secondary-custom/30'></span>
      {children}
      <svg
        width='5'
        height='5'
        viewBox='0 0 5 5'
        className='absolute top-[-2px] left-[-2px] fill-secondary-custom dark:fill-secondary-custom/50'
      >
        <path d='M2 0h1v2h2v1h-2v2h-1v-2h-2v-1h2z'></path>
      </svg>
      <svg
        width='5'
        height='5'
        viewBox='0 0 5 5'
        className='absolute top-[-2px] right-[-2px] fill-secondary-custom dark:fill-secondary-custom/50'
      >
        <path d='M2 0h1v2h2v1h-2v2h-1v-2h-2v-1h2z'></path>
      </svg>
      <svg
        width='5'
        height='5'
        viewBox='0 0 5 5'
        className='absolute bottom-[-2px] left-[-2px] fill-secondary-custom dark:fill-secondary-custom/50'
      >
        <path d='M2 0h1v2h2v1h-2v2h-1v-2h-2v-1h2z'></path>
      </svg>
      <svg
        width='5'
        height='5'
        viewBox='0 0 5 5'
        className='absolute right-[-2px] bottom-[-2px] fill-secondary-custom dark:fill-secondary-custom/50'
      >
        <path d='M2 0h1v2h2v1h-2v2h-1v-2h-2v-1h2z'></path>
      </svg>
    </div>
  )
}

export default Badge
