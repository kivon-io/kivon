import { AboutHero, AboutPrinciples, Community, Integrations } from "@/components/about-ui"
import Section from "@/components/section"

export default function AboutUs() {
  return (
    <Section className='max-w-7xl mx-auto py-16 px-4'>
      <AboutHero />
      <AboutPrinciples />
      <Integrations />
      <Community />
    </Section>
  )
}
