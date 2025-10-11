"use client"

import { useEffect, useState } from "react"

const Countdown = ({ endDate }: { endDate: string }) => {
  const [timeLeft, setTimeLeft] = useState(0)

  useEffect(() => {
    const update = () => {
      const diff = new Date(endDate).getTime() - Date.now()
      setTimeLeft(diff > 0 ? diff : 0)
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [endDate])

  const days = Math.floor(timeLeft / 1000 / 60 / 60 / 24)
  const hours = Math.floor((timeLeft / 1000 / 60 / 60) % 24)
  const minutes = Math.floor((timeLeft / 1000 / 60) % 60)
  const seconds = Math.floor((timeLeft / 1000) % 60)

  if (endDate < new Date().toISOString()) {
    return (
      <div className='h-11 flex items-center justify-center font-barlow font-semibold border border-zinc-200 dark:border-zinc-700 rounded-lg px-2.5 bg-white dark:bg-zinc-900'>
        Competition ended
      </div>
    )
  }

  return (
    <div className='grid grid-cols-4 items-center gap-1 bg-white dark:bg-zinc-800 rounded-lg px-1 py-1 border border-zinc-200 dark:border-zinc-700 h-11'>
      <CountdownItem label='D' value={days.toString()} />
      <CountdownItem label='H' value={hours.toString()} />
      <CountdownItem label='M' value={minutes.toString()} />
      <CountdownItem label='S' value={seconds.toString()} />
    </div>
  )
}

export default Countdown

const CountdownItem = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className='flex gap-1 font-barlow font-semibold items-center bg-zinc-100 dark:bg-zinc-900 rounded-md py-1 px-2 border border-zinc-200 dark:border-zinc-700'>
      <p>{value}</p>
      <p>{label}</p>
    </div>
  )
}
