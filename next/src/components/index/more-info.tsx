import Image from "next/image"
import { StickyScroll } from "../decorations/sticky-scroll-reveal"

const content = [
  {
    title: "+30 Protocols",
    description:
      "Access the most innovative and leading protocols in the industry, Enzyme.Blue is your gateway to decentralized finance.",
    content: (
      <div className='flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] text-white'>
        +30 Protocols
      </div>
    ),
  },
  {
    title: "+200 Cryptocurrencies",
    description:
      "Diversify and innovate with an ever-expanding catalog of over 200 cryptocurrencies, featuring both blue-chips and emerging tokens.",
    content: (
      <div className='flex h-full w-full items-center justify-center text-white'>
        <Image
          src='/images/coins/ethereum.svg'
          width={300}
          height={300}
          className='h-full w-full object-cover'
          alt='linear board demo'
        />
      </div>
    ),
  },
  {
    title: "The best network compatibility",
    description: "Access protocols and trade assets across the leading decentralized networks.",
    content: (
      <div className='flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] text-white'>
        The best network compatibility
      </div>
    ),
  },
  {
    title: "Running out of content",
    description:
      "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
    content: (
      <div className='flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] text-white'>
        Running out of content
      </div>
    ),
  },
]
const MoreInfo = () => {
  //   return <Section className='relative max-w-7xl mx-auto'>MoreInfo</Section>

  return (
    <div className='w-full py-4'>
      <StickyScroll content={content} />
    </div>
  )
}

export default MoreInfo
