import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"

const LegalPageContent = ({ content }: { content: string }) => {
  return (
    <div className='container mx-auto px-4 md:px-0 py-12'>
      <div className='prose prose-base max-w-none dark:prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-a:hover:text-secondary-custom'>
        <Markdown remarkPlugins={[remarkGfm]} skipHtml={false}>
          {content}
        </Markdown>
      </div>
    </div>
  )
}

export default LegalPageContent
