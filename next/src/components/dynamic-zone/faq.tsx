import faqData from "@/data/faq-data.json"
import Section from "../section"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"

const Faq = () => {
  const { heading, description, faqs } = faqData
  return (
    <Section className='max-w-7xl'>
      <div className='relative overflow-hidden md:overflow-visible p-5'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
          <div>
            <h2 className='text-2xl font-bold'>{heading}</h2>
            <p className='text-gray-500'>{description}</p>
          </div>
          <Accordion type='single' collapsible>
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id.toString()}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <div
          className='absolute opacity-30 inset-x-0 h-px -top-px bg-zinc-400/50 dark:bg-zinc-400/50'
          style={{
            backgroundImage:
              "url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 1'%3E%3Crect width='1' height='1' fill='%404040'/%3E%3C/svg%3E')",
            maskImage:
              "linear-gradient(to right, transparent, white 4rem, white calc(100% - 4rem), transparent)",
            marginLeft: "-4rem",
            marginRight: "-4rem",
          }}
        ></div>
        <div
          className='absolute opacity-30 inset-y-0 w-px -right-px bg-zinc-400/50 dark:bg-zinc-400/50'
          style={{
            backgroundImage:
              "url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 4'%3E%3Crect width='1' height='1' fill='%23212126'/%3E%3C/svg%3E')",
            maskImage:
              "linear-gradient(transparent, white 4rem, white calc(100% - 4rem), transparent)",
            marginTop: "-4rem",
            marginBottom: "-4rem",
          }}
        ></div>
        <div
          className='absolute opacity-30 inset-x-0 h-px -bottom-px bg-zinc-400/50 dark:bg-zinc-400/50'
          style={{
            backgroundImage:
              "url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 1'%3E%3Crect width='1' height='1' fill='%23212126'/%3E%3C/svg%3E')",
            maskImage:
              "linear-gradient(to right, transparent, white 4rem, white calc(100% - 4rem), transparent)",
            marginLeft: "-4rem",
            marginRight: "-4rem",
          }}
        ></div>
        <div
          className='absolute opacity-30 inset-y-0 w-px -left-px bg-zinc-400/50 dark:bg-zinc-400/50'
          style={{
            backgroundImage:
              "url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 4'%3E%3Crect width='1' height='1' fill='%23212126'/%3E%3C/svg%3E')",
            maskImage:
              "linear-gradient(transparent, white 4rem, white calc(100% - 4rem), transparent)",
            marginTop: "-4rem",
            marginBottom: "-4rem",
          }}
        ></div>
      </div>
    </Section>
  )
}

export default Faq
