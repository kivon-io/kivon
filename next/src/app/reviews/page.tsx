import { ReviewHero } from "@/components/reviews-ui"
import PageContent from "@/lib/shared/page-content"
import fetchContentType from "@/lib/strapi/fetchContentType"

export default async function Reviews() {
  const pageData = await fetchContentType(
    "pages",
    {
      filters: {
        slug: "reviews",
      },
      populate: {
        dynamic_zone: {
          on: {
            "shared.header": {
              populate: "*",
            },
            "dynamic-zone.testimonials": {
              populate: {
                testimonials: {
                  populate: {
                    user: {
                      populate: {
                        image: {
                          fields: ["url", "name", "alternativeText"],
                        },
                      },
                    },
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

  const reviews = pageData?.dynamic_zone.find(
    (item: { __component: string }) => item.__component === "dynamic-zone.testimonials"
  )

  const header = pageData?.dynamic_zone.find(
    (item: { __component: string }) => item.__component === "shared.header"
  )

  return (
    <main className='relative flex flex-col gap-24'>
      <ReviewHero
        reviews={reviews.testimonials}
        heading={header?.heading}
        sub_heading={header?.sub_heading}
      />
      <PageContent pageData={pageData} />
    </main>
  )
}
