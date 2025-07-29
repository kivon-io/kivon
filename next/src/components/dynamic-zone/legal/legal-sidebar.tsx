"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

const LegalSidebar = ({ items }: { items: LinkItem[] }) => {
  const pathname = usePathname()
  return (
    <>
      <div className='hidden md:flex flex-col gap-4 w-full md:max-w-2xs'>
        {items.map((link) => (
          <Link
            href={link.URL}
            target={link.target}
            key={link.id}
            className={cn(
              "flex items-center gap-2 text-sm text-zinc-900 hover:bg-zinc-50/50 dark:text-zinc-400 dark:hover:bg-zinc-800/50 px-2 py-2 rounded-md transition-all duration-300 font-medium",
              pathname.includes(link.URL) && "bg-zinc-50 dark:bg-zinc-800"
            )}
          >
            {/* <div className='h-8 w-8 rounded-sm bg-zinc-200 dark:bg-zinc-700'></div> */}
            {link.text}
          </Link>
        ))}
      </div>

      <Accordion
        type='single'
        collapsible
        className='md:hidden bg-white dark:bg-neutral-900 px-4 mt-4 border-b border-zinc-200 dark:border-zinc-800'
      >
        <AccordionItem value='legal'>
          <AccordionTrigger>Legal</AccordionTrigger>
          <AccordionContent className='flex flex-col gap-2'>
            {items.map((link) => (
              <Link
                href={link.URL}
                target={link.target}
                key={link.id}
                className={cn(
                  "flex items-center gap-2 text-sm text-zinc-900 hover:bg-zinc-50/50 dark:text-zinc-400 dark:hover:bg-zinc-800/50 px-2 py-1.5 rounded-md transition-all duration-300 font-medium",
                  pathname.includes(link.URL) && "bg-zinc-50 dark:bg-zinc-800"
                )}
              >
                {/* <div className='h-8 w-8 rounded-sm bg-zinc-200 dark:bg-zinc-700'></div> */}
                {link.text}
              </Link>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  )
}

export default LegalSidebar
