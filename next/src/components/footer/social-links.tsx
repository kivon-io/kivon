import Link from "next/link"
import { BiBook } from "react-icons/bi"
import { FaMedium } from "react-icons/fa"
import { IoLogoYoutube } from "react-icons/io5"
import { RiDiscordFill, RiTelegram2Fill, RiTwitterXFill } from "react-icons/ri"
import { SiCoinmarketcap } from "react-icons/si"

const SocialLinks = ({
  links,
}: {
  links: {
    id: number
    text: string
    URL: string
    target: string
  }[]
}) => {
  //  iconsMap if text is telegram or twitter or discord match the icon

  // Map normalized social names to icons
  const iconsMap: Record<string, React.ReactNode> = {
    telegram: <RiTelegram2Fill />,
    twitter: <RiTwitterXFill />, // If you want to use the X icon for "twitter"
    x: <RiTwitterXFill />,
    discord: <RiDiscordFill />,
    medium: <FaMedium />,
    docs: <BiBook />,
    coinmarketcap: <SiCoinmarketcap />,
    youtube: <IoLogoYoutube />,
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
          {iconsMap[link.text.toLowerCase()] ?? null}
        </Link>
      ))}
    </div>
  )
}

export default SocialLinks
