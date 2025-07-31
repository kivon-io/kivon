import Hero from "@/components/dynamic-zone/hero"
import fetchContentType from "@/lib/strapi/fetchContentType"
import { getHeroData } from "@/lib/utils"
import { HydrateClient } from "@/trpc/server"

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
            "dynamic-zone.hero": {
              populate: {
                hero: true,
              },
            },
          },
        },
      },
    },
    true
  )

  const hero = getHeroData(pageData)

  return (
    <HydrateClient>
      <div className='relative w-full'>
        <Hero {...hero} className='mt-40' />
        {children}
      </div>
    </HydrateClient>
  )
}
