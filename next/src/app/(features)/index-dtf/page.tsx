import Features from "@/components/index/features"
import IndexHero from "@/components/index/hero"
import WhyKivon from "@/components/index/why-kivon"

const KivonIndex = () => {
  return (
    <main className='relative'>
      <IndexHero />
      <WhyKivon />
      <Features />
      {/* <MoreInfo /> */}
    </main>
  )
}

export default KivonIndex
