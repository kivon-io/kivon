import LegalPageHeader from "@/components/dynamic-zone/legal/header"
import LegalPageContent from "@/components/dynamic-zone/legal/page-content"
import fetchContentType from "@/lib/strapi/fetchContentType"

export default async function SwapPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params

  const pageKey = slug[0] || ""

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
            "dynamic-zone.content": {
              populate: {
                image: {
                  populate: {
                    fields: ["url", "name", "alternativeText"],
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
  const content = pageData?.dynamic_zone.find(
    (item: { __component: string }) => item.__component === "dynamic-zone.content"
  )

  return (
    <div className='relative'>
      <LegalPageHeader
        heading={header?.heading}
        sub_heading={header?.sub_heading}
        image={content?.image || { alternativeText: "", url: "", id: 0, name: "" }}
      />
      <LegalPageContent content={content?.content || ""} />
    </div>
  )
}
