import { Heading } from "@/components/elements/heading"

const HowItWorks = () => {
  return (
    <div className='relative'>
      <Heading as='h1' className='text-center'>
        How it works
      </Heading>
      <div className='flex flex-col gap-10'>
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className='flex flex-col gap-4 h-[500px] bg-zinc-100 dark:bg-zinc-900 w-full rounded-3xl'
          >
            <div className='flex flex-col gap-2'>
              <Heading as='h2' className='text-center'>
                Step {index + 1}
              </Heading>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HowItWorks
