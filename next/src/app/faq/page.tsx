import Lines from "@/components/decorations/lines"
import { Heading } from "@/components/elements/heading"
import { Subheading } from "@/components/elements/sub_heading"
import FaqSection from "@/components/faq-section"
import Section from "@/components/section"
import { generateMetadataObject } from "@/lib/shared/metadata"
import fetchContentType from "@/lib/strapi/fetchContentType"
import { Metadata } from "next"

// keep groups as returned by Strapi
type Faq = { id: number; question: string; answer: string }
type FaqGroup = { heading: string; sub_heading?: string; faqs: Faq[] }

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await fetchContentType(
    "pages",
    {
      filters: {
        slug: "faq",
      },
      populate: {
        seo: {
          populate: "*",
        },
      },
    },
    true
  )

  const seo = pageData?.seo as unknown as Seo

  const metadata = generateMetadataObject(seo as Seo)
  return metadata
}

export default async function FAQ() {
  const pageKey = "faq"

  const pageData = await fetchContentType(
    "pages",
    {
      filters: {
        slug: pageKey,
      },
      populate: {
        dynamic_zone: {
          on: {
            "shared.header": {
              populate: "*",
            },
            "dynamic-zone.faq": {
              populate: "*",
            },
          },
        },
      },
    },
    true
  )

  const header = pageData?.dynamic_zone.find(
    (item: { __component: string }) => item.__component === "shared.header"
  )

  const faqGroups: FaqGroup[] = (pageData?.dynamic_zone ?? [])
    .filter((b: { __component: string }) => b.__component === "dynamic-zone.faq")
    .map((b: { heading: string; sub_heading: string; faqs: Faq[] }) => ({
      heading: b.heading,
      sub_heading: b.sub_heading,
      faqs: b.faqs ?? [],
    }))

  return (
    <Section className='mt-10 md:mt-0'>
      <div className='flex flex-col relative z-20'>
        <Heading as='h1' className='font-bold capitalize'>
          {header?.heading}
        </Heading>
        <Subheading as='p' className='text-zinc-500 dark:text-zinc-400'>
          {header?.sub_heading}
        </Subheading>
      </div>

      <Section className='max-w-4xl 2xl:max-w-7xl mx-auto relative z-20 w-full rounded-lg md:rounded-2xl bg-white dark:bg-black py-0 md:py-0 md:px-0'>
        {faqGroups.map((faqGroup, index) => (
          <FaqSection
            key={index}
            heading={faqGroup.heading}
            sub_heading={faqGroup.sub_heading ?? ""}
            faqs={faqGroup.faqs}
            className='mt-10 relative z-20'
          />
        ))}
        <Lines />
      </Section>
    </Section>
  )
}
