import Badge from "@/components/decorations/badge"
import { Heading } from "@/components/elements/heading"
import { Subheading } from "@/components/elements/sub_heading"
import Section from "@/components/section"
import { APP_NAME } from "@/lib/shared/constants"

const HowItWorks = () => {
  return (
    <div className='relative'>
      <Section>
        <div className='flex justify-center w-fit mx-auto'>
          <Badge>Updating page content</Badge>
        </div>
        <Heading>How it works</Heading>
        <Subheading>How does {APP_NAME} work</Subheading>
      </Section>
    </div>
  )
}

export default HowItWorks
