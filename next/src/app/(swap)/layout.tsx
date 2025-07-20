import Blog from "@/components/dynamic-zone/blog"
import Coins from "@/components/dynamic-zone/coins"
import Faq from "@/components/dynamic-zone/faq"
import Hero from "@/components/dynamic-zone/hero"
import Services from "@/components/dynamic-zone/services"
import Steps from "@/components/dynamic-zone/steps"
import Testimonials from "@/components/dynamic-zone/testimonials"
import { HydrateClient } from "@/trpc/server"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <HydrateClient>
      <div className='relative w-full'>
        <Hero className='mt-40' />
        {children}
        <Steps />
        <Coins />
        <Services />
        <Testimonials />
        <Faq />
        <Blog />
      </div>
    </HydrateClient>
  )
}

export default Layout
