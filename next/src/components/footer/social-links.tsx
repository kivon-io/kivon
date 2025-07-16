import Link from "next/link"
import { RiDiscordFill, RiTelegram2Fill, RiTwitterXFill } from "react-icons/ri"

const SocialLinks = ({
  links,
}: {
  links: {
    id: number
    text: string
    URL: string
    key: string
    target: string
    icon: string
  }[]
}) => {
  const iconsMap = {
    telegram: <RiTelegram2Fill />,
    x: <RiTwitterXFill />,
    discord: <RiDiscordFill />,
  }
  return (
    <div className='flex gap-2'>
      {links.map((link) => (
        <Link
          key={link.id}
          href={link.URL}
          target={link.target}
          className='h-8 w-8 text-xl rounded border border-zinc-200 dark:border-zinc-800 flex items-center justify-center hover:bg-secondary-custom hover:text-white transition-colors duration-300'
        >
          {iconsMap[link.key as keyof typeof iconsMap]}
        </Link>
      ))}
    </div>
  )
}

export default SocialLinks
