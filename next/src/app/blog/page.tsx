import { ArticleCard } from "@/components/articles/article-components"
import FeaturedArticles from "@/components/articles/featured"
import Lines from "@/components/decorations/lines"
import Section from "@/components/section"
import { APP_NAME } from "@/lib/shared/constants"
import fetchContentType from "@/lib/strapi/fetchContentType"
import Link from "next/link"

export default async function BlogPage() {
  const featuredArticles = await fetchContentType("articles", {
    filters: {
      featured: true,
    },
    populate: {
      image: {
        fields: ["url", "name", "alternativeText"],
      },
      categories: true,
    },
  })

  const articles = await fetchContentType("articles", {
    filters: {
      featured: false,
    },
    populate: {
      image: {
        fields: ["url", "name", "alternativeText"],
      },
      categories: true,
    },
  })

  // fetch categories that have articles and count the number of articles in each category
  const categories = await fetchContentType("categories", {
    filters: {
      articles: {
        id: { $in: articles.data.map((article: Article) => article.id) },
      },
    },
    populate: {
      articles: true,
    },
  })

  return (
    <main className='relative mb-20'>
      <FeaturedArticles data={featuredArticles.data} />

      <Section className='max-w-7xl mx-auto pt-0 md:pt-0'>
        <div className='relative rounded-none md:rounded-2xl bg-white dark:bg-black py-0 md:py-0 mt-10 md:mt-20 overflow-hidden md:overflow-visible'>
          <div className='grid grid-cols-12 gap-4 md:gap-8 py-10 px-5'>
            <div className='col-span-12 md:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-5'>
              {featuredArticles.data.slice(1, 3).map((article: Article, index: number) => (
                <ArticleCard key={index} article={article} />
              ))}
            </div>
            <div className='col-span-12 md:col-span-6'>
              <p className='max-w-[42rem] text-wrap'>
                <span className='text-2xl sm:text-3xl inline'>
                  <span className='text-2xl sm:text-3xl inline text-wrap'>Posts from the </span>
                </span>
                <span className='text-2xl sm:text-3xl inline'>
                  <span className='relative text-nowrap'>
                    <span className='ml-0.5 inline sm:mx-1'>{APP_NAME}</span>
                  </span>
                  <span className='text-2xl sm:text-3xl inline text-wrap'>App Team about</span>
                </span>
                {categories.data.map(
                  (category: Category & { articles: Article[] }, index: number) => (
                    <Link
                      key={index}
                      className='flex w-full transition-colors duration-300 hover:text-zinc-600 dark:hover:text-zinc-400 sm:inline sm:w-auto sm:mt-0'
                      target='_self'
                      href={`/blog/category/${category.name}`}
                    >
                      <span className='text-lg sm:text-3xl w-full sm:w-auto'>
                        <span className='sm:none'> </span>
                        <span className='capitalize'>#{category.name}</span>
                      </span>
                      <span className='text-xs ml-[0.12rem] translate-y-[0.5rem] text-end'>
                        ({category.articles.length})
                      </span>
                    </Link>
                  )
                )}
              </p>
            </div>
          </div>
          <Lines />
        </div>
        <div className='relative rounded-none md:rounded-2xl bg-white dark:bg-black py-0 md:py-0 mt-20 overflow-hidden md:overflow-visible'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-5 py-10 px-5'>
            {articles.data.map((article: Article, index: number) => (
              <ArticleCard key={index} article={article} />
            ))}
          </div>
          <Lines />
        </div>
      </Section>
    </main>
  )
}
