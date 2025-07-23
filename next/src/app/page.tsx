import Hero from "@/components/dynamic-zone/hero"
import SelectSwapType from "@/components/swap-zone/select-action"
import fetchContentType from "@/lib/strapi/fetchContentType"
import { getHeroData } from "@/lib/utils"

export default async function Home() {
  const pageData = await fetchContentType(
    "pages",
    {
      filters: {
        slug: "homepage",
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
    <main className='relative w-full h-full 2xl:h-[calc(100vh-120px)] flex flex-col items-center justify-center px-4 md:px-0'>
      <Hero {...hero} className='mt-32 md:mt-20' />
      <SelectSwapType />
    </main>
  )
}
