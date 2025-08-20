import Features from "@/components/index/features"
import IndexHero from "@/components/index/hero"
import JoinNow from "@/components/index/join-now"
import MoreInfo from "@/components/index/more-info"
import WhyKivon from "@/components/index/why-kivon"

const KivonIndex = () => {
  return (
    <main className='relative'>
      <IndexHero />
      <WhyKivon />
      <Features />
      <MoreInfo />
      <JoinNow />
    </main>
  )
}

export default KivonIndex
