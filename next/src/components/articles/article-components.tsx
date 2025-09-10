"use client"

import { strapiImage } from "@/lib/strapi/strapiImage"
import { cn, formatDateToLocaleString } from "@/lib/utils"
import Link from "next/link"
import { BlurImage } from "../blur-image"
import { Heading } from "../elements/heading"

export const ArticleHeader = ({ article }: { article: Article }) => {
  return (
    <div className='grid grid-cols-12 gap-5 '>
      <div className='col-span-12 md:col-span-6'>
        <div className='flex flex-col gap-3'>
          <Category category={article.categories.length > 0 ? article.categories[0].name : ""} />
          <Heading as='h2' className='text-4xl md:text-6xl font-bold text-left'>
            {article.title}
          </Heading>
          <p className='text-sm text-zinc-500 dark:text-zinc-400 font-barlow'>
            {formatDateToLocaleString(article.createdAt)}
          </p>
        </div>
      </div>
      <div className='col-span-12 md:col-span-6'>
        <div className='h-96 w-full relative rounded-2xl bg-white dark:bg-zinc-900'>
          <BlurImage
            src={strapiImage(article.image.url)}
            alt={article.title}
            fill
            className='object-cover rounded-2xl'
          />
        </div>
      </div>
    </div>
  )
}

export const ArticleCard = ({ article }: { article: Article }) => {
  return (
    <Link href={`/blog/${article.slug}`}>
      <div className='relative group flex flex-col gap-2'>
        <div className='h-52 w-full relative rounded-2xl overflow-hidden'>
          <BlurImage
            src={strapiImage(article.image.url)}
            alt={article.title}
            fill
            className='object-cover rounded-2xl group-hover:opacity-90 group-hover:scale-105 transition-all duration-300 '
          />
        </div>
        <div className='flex flex-col gap-3'>
          <p className='text-lg md:text-xl font-medium'>{article.title}</p>
          <p className='text-sm text-zinc-500 dark:text-zinc-400'>{article.description}</p>
          <div className='flex justify-between items-center'>
            <p className='text-xs text-zinc-500 dark:text-zinc-400'>
              {formatDateToLocaleString(article.createdAt)}
            </p>
            <Category category={article.categories.length > 0 ? article.categories[0].name : ""} />
          </div>
        </div>
      </div>
    </Link>
  )
}

export const CategoryTag = ({ category, className }: { category: string; className?: string }) => {
  return (
    <Link
      href='#'
      className={cn(
        "transition-colors duration-300 hover:text-zinc-900 dark:hover:text-zinc-100",
        className
      )}
    >
      <span className='w-full sm:w-auto'>
        <span className='ml-1' />
        <span>#{category}</span>
      </span>
      <span className='text-xs font-mono'>(32)</span>
    </Link>
  )
}

export const Category = ({ category, className }: { category: string; className?: string }) => {
  if (category === "") {
    return null
  }
  return <div className={cn("text-xs text-secondary-custom", className)}>#{category}</div>
}
