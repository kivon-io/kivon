import { useEffect, useState } from "react"
import { MdOutlineAccessTime } from "react-icons/md"

export const ValidFixedRate = ({ validUntil }: { validUntil: string }) => {
  const [timeLeft, setTimeLeft] = useState(0)

  useEffect(() => {
    const update = () => {
      const diff = new Date(validUntil).getTime() - Date.now()
      setTimeLeft(diff > 0 ? diff : 0)
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [validUntil])

  const minutes = Math.floor(timeLeft / 1000 / 60)
  const seconds = Math.floor((timeLeft / 1000) % 60)

  return (
    <div className='flex items-center justify-center gap-1'>
      <MdOutlineAccessTime className='text-zinc-600 text-sm' />
      <span className='text-xs text-zinc-600 font-medium'>
        Valid until {minutes}:{seconds}
      </span>
    </div>
  )
}
