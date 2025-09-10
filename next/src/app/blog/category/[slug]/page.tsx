import { ArticleCard } from "@/components/articles/article-components"
import Lines from "@/components/decorations/lines"
import Section from "@/components/section"
import fetchContentType from "@/lib/strapi/fetchContentType"

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const articles = await fetchContentType("articles", {
    filters: {
      categories: {
        name: slug,
      },
    },
    populate: {
      image: {
        fields: ["url", "name", "alternativeText"],
      },
      categories: true,
    },
  })

  const categories = await fetchContentType("categories", {
    filters: {
      name: slug,
    },
  })

  const category = categories.data[0]

  return (
    <main className='relative mb-20'>
      <Section className='max-w-7xl mx-auto'>
        <div className='grid grid-cols-12 gap-4 md:gap-8 py-10 px-5'>
          <div className='col-span-12 md:col-span-6'>
            <p className='flex w-full transition-colors duration-300 hover:text-zinc-600 dark:hover:text-zinc-400 sm:inline sm:w-auto sm:mt-0'>
              <span className='text-4xl sm:text-6xl font-semibold w-full sm:w-auto'>
                <span className='sm:none'> </span>
                <span className='capitalize'>#{category.name}</span>
              </span>
              <span className='text-sm ml-[0.12rem] translate-y-[0.5rem] text-end font-mono'>
                ({articles.data.length})
              </span>
            </p>
          </div>
          <div className='col-span-12 md:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-5'>
            {articles.data.slice(0, 2).map((article: Article, index: number) => (
              <ArticleCard key={index} article={article} />
            ))}
          </div>
        </div>
        <div className='relative rounded-none md:rounded-2xl bg-white dark:bg-black py-0 md:py-0 mt-20 overflow-hidden md:overflow-visible'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-5 py-10 px-5'>
            {articles.data.slice(2).map((article: Article, index: number) => (
              <ArticleCard key={index} article={article} />
            ))}
          </div>
          <Lines />
        </div>
      </Section>
    </main>
  )
}
