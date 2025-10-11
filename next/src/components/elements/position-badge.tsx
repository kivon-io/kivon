import { cn } from "@/lib/utils"

const Rank = ({ rank, className }: { rank: number; className?: string }) => {
  return rank === 1 ? (
    <RankOne className={className} />
  ) : rank === 2 ? (
    <RankTwo className={className} />
  ) : rank === 3 ? (
    <RankThree className={className} />
  ) : (
    <RankDefault rank={rank} className={className} />
  )
}

export default Rank

const RankOne = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "relative h-10 w-10 bg-gradient-to-b from-emerald-500 to-emerald-700 p-0.5 shadow-md clip-hex-pointed",
        className
      )}
    >
      <div className='overflow-hidden relative clip-hex-pointed h-full w-full bg-emerald-600 flex flex-col items-center justify-center text-white font-bold'>
        <span className='bg-gradient-to-b from-transparent via-white/50 to-white h-full w-5'></span>
        <span className='clip-hex-pointed h-4 w-6 bg-emerald-600 absolute bottom-0'></span>
        <p className='absolute inset-0 flex items-center justify-center z-20'>1</p>
      </div>
    </div>
  )
}

const RankTwo = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "relative h-10 w-10 bg-gradient-to-b from-blue-500 to-blue-700 p-0.5 shadow-md clip-hex-pointed",
        className
      )}
    >
      <div className='overflow-hidden relative clip-hex-pointed h-full w-full bg-gradient-to-b from-blue-500 to-blue-600 flex flex-col items-center justify-center text-white font-bold'>
        <div className='rounded-full bg-blue-500 w-6 h-6'>
          <p className='absolute inset-0 flex items-center justify-center z-20'>2</p>
        </div>
      </div>
    </div>
  )
}

const RankThree = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "relative h-10 w-10 bg-gradient-to-b from-yellow-500 to-yellow-700 p-0.5 shadow-md clip-hex-pointed",
        className
      )}
    >
      <div className='overflow-hidden relative clip-hex-pointed h-full w-full bg-gradient-to-b from-yellow-500 to-yellow-600 flex flex-col items-center justify-center text-white font-bold'>
        <div className='h-full bg-yellow-500 w-6'>
          <p className='absolute inset-0 flex items-center justify-center z-20'>3</p>
        </div>
      </div>
    </div>
  )
}

const RankDefault = ({ rank, className }: { rank: number; className?: string }) => {
  return (
    <div
      className={cn(
        "relative h-10 w-10 bg-gradient-to-b from-zinc-500 to-zinc-700 p-0.5 shadow-md clip-hex-pointed",
        className
      )}
    >
      <div className='overflow-hidden relative clip-hex-pointed h-full w-full bg-gradient-to-b from-zinc-500 to-zinc-600 flex flex-col items-center justify-center text-white font-bold'>
        <div className='h-full bg-zinc-500 w-6'>
          <p className='absolute inset-0 flex items-center justify-center z-20'>{rank}</p>
        </div>
      </div>
    </div>
  )
}
