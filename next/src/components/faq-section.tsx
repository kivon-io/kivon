import { cn } from "@/lib/utils"
import Faq from "./dynamic-zone/faq"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"

const FaqSection = ({
  heading,
  sub_heading,
  faqs,
  className,
}: {
  heading: string
  sub_heading: string
  faqs: Faq[]
  className?: string
}) => {
  return (
    <div className={cn("w-full", className)}>
      <div className='relative overflow-hidden md:overflow-visible p-5'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
          <div>
            <h2 className='text-lg font-medium'>{heading}</h2>
            <p className='text-gray-500'>{sub_heading}</p>
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
      </div>
    </div>
  )
}

export default FaqSection
