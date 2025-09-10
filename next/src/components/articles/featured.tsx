"use client"

import { strapiImage } from "@/lib/strapi/strapiImage"
import { formatDateToLocaleString } from "@/lib/utils"
import { BlurImage } from "../blur-image"
import { Grid } from "../decorations/grid"
import { Heading } from "../elements/heading"
import { Category } from "./article-components"

const FeaturedArticles = ({ data }: { data: Article[] }) => {
  const featuredArticle = data[0]
  return (
    <div className='bg-white dark:bg-black pt-20 md:pt-36 pb-10 relative px-4 md:px-0'>
      <div className='grid grid-cols-12 gap-5 max-w-7xl mx-auto relative z-10'>
        <div className='col-span-12 md:col-span-6'>
          <div className='flex flex-col gap-3'>
            <Category className='text-sm' category={featuredArticle.categories[0].name} />
            <Heading as='h2' className='text-4xl md:text-6xl font-bold text-left'>
              {featuredArticle.title}
            </Heading>
            <p className='text-sm text-zinc-500 dark:text-zinc-400 font-barlow'>
              {formatDateToLocaleString(featuredArticle.createdAt)}
            </p>
          </div>
        </div>
        <div className='col-span-12 md:col-span-6'>
          <div className='h-96 w-full relative rounded-2xl overflow-hidden'>
            <BlurImage
              src={strapiImage(featuredArticle.image.url)}
              alt={featuredArticle.title}
              fill
              className='object-cover rounded-2xl'
            />
          </div>
        </div>
      </div>
      <Grid className='absolute inset-0' size={60} />
    </div>
  )
}

export default FeaturedArticles
