"use client"

import Link from "next/link"
import { MdArrowRight } from "react-icons/md"
import Lines from "../decorations/lines"
import StarBackground from "../decorations/stars-background"
import Section from "../section"
import { Button } from "../ui/button"

// Lightweight shape from CMS
type ContactEntry = {
  id?: number
  title: string
  description: string
  button?: LinkItem
}

const ContactSection = ({
  data,
}: {
  data?: {
    contacts?: ContactEntry[]
    community?: ContactEntry[]
  }
}) => {
  const contacts = data?.contacts ?? []
  const community = data?.community ?? []

  return (
    <Section className='w-full rounded-lg md:rounded-2xl bg-white dark:bg-black py-0 md:py-0 md:px-0'>
      <div className='relative overflow-hidden md:overflow-visible py-10 px-5 flex flex-col gap-16 z-10'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-0'>
          {contacts.length > 0 &&
            contacts.map((item, index) => (
              <ContactCard
                key={item?.id ?? index}
                title={item?.title ?? "Contact Us"}
                description={item?.description ?? "Contact us for any questions or support"}
                link={
                  item?.button ?? {
                    id: index,
                    text: "Contact Us",
                    URL: "/contact",
                    target: "_self",
                  }
                }
              />
            ))}
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8 md:px-10'>
          {community.length > 0 &&
            community.map((item, index) => (
              <MoreInfo
                key={item?.id ?? index}
                title={item?.title ?? "Join community"}
                description={
                  item?.description ??
                  "Chat with us directly and become a part of the Kivon community"
                }
                link={item?.button}
              />
            ))}
        </div>
        <Lines />
      </div>
      <StarBackground />
    </Section>
  )
}

const ContactCard = ({
  title,
  description,
  link,
}: {
  title: string
  description: string
  link: LinkItem
}) => {
  return (
    <div className='relative flex flex-col gap-2 items-center justify-center'>
      <h1 className='text-base md:text-lg font-semibold text-zinc-800 dark:text-zinc-100'>
        {title}
      </h1>
      <p className='text-center text-sm text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto'>
        {description}
      </p>
      {link && (
        <Link href={link.URL} target={link.target}>
          <Button size='sm'>{link.text}</Button>
        </Link>
      )}
    </div>
  )
}

const MoreInfo = ({
  title,
  description,
  link,
}: {
  title: string
  description: string
  link?: LinkItem
}) => {
  return (
    <div className='relative p-4 flex flex-col gap-4 bg-gradient-to-b from-zinc-100 to-white dark:from-zinc-900 dark:to-black rounded-lg'>
      <div className='flex flex-col gap-2'>
        <div className='flex gap-2 text-sm'>{title}</div>
        <p className='text-xs text-zinc-500 dark:text-zinc-400'>{description}</p>
      </div>
      {link ? (
        <Link href={link.URL} target={link.target}>
          <Button variant='outline' size='sm' className=' w-fit justify-start group'>
            {link.text}
            <MdArrowRight className='size-5 group-hover:translate-x-1 transition-all duration-300' />
          </Button>
        </Link>
      ) : (
        <Button variant='outline' size='sm' className=' w-fit justify-start group'>
          Learn more
          <MdArrowRight className='size-5 group-hover:translate-x-1 transition-all duration-300' />
        </Button>
      )}
    </div>
  )
}

export { ContactCard, ContactSection, MoreInfo }
