import { ContactSection } from "@/components/dynamic-zone/contact-us"
import { Heading } from "@/components/elements/heading"
import { Subheading } from "@/components/elements/sub_heading"
import Section from "@/components/section"
import { generateMetadataObject } from "@/lib/shared/metadata"
import fetchContentType from "@/lib/strapi/fetchContentType"
import { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await fetchContentType(
    "pages",
    {
      filters: {
        slug: "contact-us",
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

export default async function ContactUs() {
  const pageKey = "contact-us"

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
            "dynamic-zone.contact": {
              populate: {
                contacts: {
                  populate: {
                    button: { populate: "*" },
                  },
                },
                community: {
                  populate: {
                    button: { populate: "*" },
                  },
                },
              },
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
  const contact = pageData?.dynamic_zone.find(
    (item: { __component: string }) => item.__component === "dynamic-zone.contact"
  )

  return (
    <Section className='relative flex flex-col max-w-7xl mx-auto gap-10 mt-10 md:mt-0'>
      <div className='relative flex flex-col justify-start '>
        <Heading as={"h1"} className='text-left mx-0 font-bold' size='xl'>
          {header?.heading}
        </Heading>
        <Subheading
          as={"p"}
          className='text-left mx-0 sm:max-w-md text-base md:text-lg text-zinc-800 dark:text-zinc-100'
        >
          {header?.sub_heading}
        </Subheading>
      </div>
      <ContactSection data={contact} />
    </Section>
  )
}
