"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { FAQ_ITEMS } from "@/lib/app/config"

export function FaqSection() {
  return (
    <section className="flex flex-col gap-2">
      <p className="px-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
        FAQ
      </p>
      <Accordion
        type="single"
        collapsible
        className="rounded-2xl border border-border bg-card px-4"
      >
        {FAQ_ITEMS.map((item) => (
          <AccordionItem key={item.id} value={item.id} className="border-border">
            <AccordionTrigger className="py-4 text-left font-semibold hover:no-underline">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
