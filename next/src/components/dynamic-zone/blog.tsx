"use client"

import articlesData from "@/data/articles.json"
import { strapiImage } from "@/lib/strapi/strapiImage"
import { motion } from "motion/react"
import { BlurImage } from "../blur-image"
import Lines from "../decorations/lines"
import { Heading } from "../elements/heading"
import { Subheading } from "../elements/sub_heading"
import Section from "../section"

interface Article {
  id: number
  title: string
  description: string
  image: ImageType
  createdAt: string
}

const Blog = ({ data }: { data: Article[] }) => {
  const { heading, description } = articlesData
  return (
    <Section className='rounded-none md:rounded-2xl max-w-7xl bg-white dark:bg-black mt-20 py-0 md:py-0'>
      <div className='relative overflow-hidden md:overflow-visible py-10 px-5'>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className='relative max-w-7xl mx-auto px-4 md:px-0'
        >
          <Heading as='h2' className='text-xl md:text-2xl font-medium text-left w-full max-w-full'>
            {heading}
          </Heading>
          <Subheading className='text-sm text-neutral-500 dark:text-neutral-400 text-left w-full max-w-full'>
            {description}
          </Subheading>
        </motion.div>
        <div className='flex md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 overflow-x-scroll md:overflow-x-hidden scrollbar-hide'>
          {data?.map((article) => (
            <Article key={article.id} article={article} />
          ))}
        </div>
        <Lines />
      </div>
    </Section>
  )
}

export default Blog

const Article = ({ article }: { article: Article }) => {
  return (
    <div className='relative flex-shrink-0 w-5/6 md:w-full'>
      <div className='h-40 w-full relative rounded-2xl'>
        {article.image.url && (
          <BlurImage
            src={strapiImage(article.image.url)}
            alt={article.title}
            fill
            className='object-cover rounded-2xl'
          />
        )}
      </div>
      <div className='flex flex-col gap-3 mt-2'>
        <p className='text-xs font-medium text-neutral-500 dark:text-neutral-400'>
          {new Date(article.createdAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
        <div className='flex flex-col gap-1'>
          <h3 className='text-base font-bold text-black dark:text-white'>{article.title}</h3>
          <p className='text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2'>
            {article.description}
          </p>
        </div>
      </div>
    </div>
  )
}
