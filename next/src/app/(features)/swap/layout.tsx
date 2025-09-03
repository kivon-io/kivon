import Blog from "@/components/dynamic-zone/blog"
import PageContent from "@/lib/shared/page-content"
import fetchContentType from "@/lib/strapi/fetchContentType"
import React from "react"

export default async function Layout({ children }: { children: React.ReactNode }) {
  const pageData = await fetchContentType(
    "pages",
    {
      filters: {
        slug: "swap-page",
      },
      populate: {
        dynamic_zone: {
          on: {
            "dynamic-zone.steps": {
              populate: {
                step: {
                  populate: {
                    steps: true,
                  },
                },
              },
            },
            "dynamic-zone.discover-coins": {
              populate: {
                trade_coin: true,
              },
            },
            "dynamic-zone.services": {
              populate: {
                services: {
                  populate: {
                    live_support_card: true,
                    market_rate_card: true,
                    secure_card: true,
                    transaction_card: true,
                  },
                },
              },
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
            "dynamic-zone.faq": {
              populate: {
                faqs: true,
              },
            },
          },
        },
      },
    },
    true
  )

  // featured articles
  const featuredArticles = await fetchContentType("articles", {
    filters: {
      featured: true,
    },
    populate: {
      image: {
        fields: ["url", "name", "alternativeText"],
      },
    },
  })

  return (
    <div className=' relative mb-20'>
      {children}
      <PageContent pageData={pageData} />
      <Blog data={featuredArticles.data} />
    </div>
  )
}
