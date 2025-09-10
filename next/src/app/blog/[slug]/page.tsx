import { ArticleHeader } from "@/components/articles/article-components"
import Section from "@/components/section"
import fetchContentType from "@/lib/strapi/fetchContentType"
import { strapiImage } from "@/lib/strapi/strapiImage"
import { Metadata } from "next"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const articleData = await fetchContentType("articles", {
    filters: { slug: slug },
    populate: {
      image: {
        fields: ["url", "name", "alternativeText"],
      },
      categories: true,
    },
  })
  const article = articleData?.data[0] as Article
  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      images: [{ url: strapiImage(article.image.url) }],
    },
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const articleData = await fetchContentType("articles", {
    filters: { slug: slug },
    populate: {
      image: {
        fields: ["url", "name", "alternativeText"],
      },
      categories: true,
    },
  })

  const article = articleData?.data[0] as Article

  return (
    <main className='relative mb-20'>
      <Section className='max-w-7xl mx-auto pt-20'>
        <ArticleHeader article={article} />
        <div className='flex flex-col gap-5 mx-auto max-w-4xl mt-20'>
          <p className='text-lg font-medium'>{article.description}</p>
          <div className='container mx-auto px-4 md:px-0'>
            <div className='prose prose-base max-w-none dark:prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-a:hover:text-secondary-custom'>
              <Markdown remarkPlugins={[remarkGfm]} skipHtml={false}>
                {article.content}
              </Markdown>
            </div>
          </div>
        </div>
      </Section>
    </main>
  )
}
