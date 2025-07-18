import Hero from "@/components/dynamic-zone/hero"
import SelectSwapType from "@/components/swap-zone/select-action"

export default function Home() {
  return (
    <main className='relative w-full h-full 2xl:h-[calc(100vh-120px)] flex flex-col items-center justify-center px-4 md:px-0'>
      <Hero className='mt-20' />
      <SelectSwapType />
    </main>
  )
}
