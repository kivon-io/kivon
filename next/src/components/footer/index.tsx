import { cn } from "@/lib/utils"
import Logo from "../logo"
import FooterItem from "./footer-item"
import SocialLinks from "./social-links"

interface FooterProps {
  logo: {
    company: string
    image: ImageType
  }
  copyright: string
  columns: {
    id: number
    title: string
    key: string
    items: LinkItem[]
  }[]
  social_media_links: {
    id: number
    text: string
    URL: string
    target: string
  }[]
  className?: string
}

const Footer = ({ logo, columns, copyright, social_media_links, className }: FooterProps) => {
  const businessLinks = columns.filter((column) => column.key === "business")
  const serviceLinks = columns.filter((column) => column.key === "services")

  return (
    <div
      className={cn("w-full bg-white dark:bg-neutral-900 h-full mt-20 relative z-20", className)}
    >
      <div className='max-w-6xl mx-auto px-4 md:px-10 pt-10 pb-32'>
        <div className='flex flex-col md:flex-row gap-5 md:gap-0 md:justify-between md:items-center border-b border-zinc-200 dark:border-zinc-800 pb-5'>
          <Logo logo={logo.image} />
          <div className='flex gap-2 items-center'>
            <SocialLinks links={social_media_links} />
          </div>
        </div>
        <div className='flex flex-col gap-5 mt-10'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-5'>
            {businessLinks.map((column) => (
              <LinksSection key={column.id} title={column.title} items={column.items} />
            ))}
          </div>
          <div className='relative grid grid-cols-2 md:grid-cols-4 gap-4'>
            {serviceLinks.map((column) => (
              <LinksSection key={column.id} title={column.title} items={column.items} />
            ))}
          </div>
        </div>
        <div className='border-t border-zinc-200 dark:border-zinc-800 pt-5 mt-5'>
          <p className='text-sm text-zinc-500 dark:text-zinc-400'>{copyright}</p>
        </div>
      </div>
    </div>
  )
}

export default Footer

const LinksSection = ({
  title,
  items,
  className,
}: {
  title: string
  items: LinkItem[]
  className?: string
}) => {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <h3 className='text-md font-semibold text-zinc-900 dark:text-zinc-100'>{title}</h3>
      <div className='flex flex-col gap-4'>
        {items.map((item) => (
          <FooterItem key={item.id} item={item} className='text-sm' />
        ))}
      </div>
    </div>
  )
}

// const SwapPairsSection = ({
//   title,
//   items,
//   className,
// }: {
//   title: string
//   items: FooterItem[]
//   className?: string
// }) => {
//   return (
//     <div className={cn("flex flex-col gap-2", className)}>
//       <h3 className='text-md font-semibold text-zinc-900 dark:text-zinc-100'>{title}</h3>
//       <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
//         {items.map((item) => (
//           <FooterItem key={item.id} item={item} className='text-sm' />
//         ))}
//       </div>
//     </div>
//   )
// }

// const PersonalLinks = {
//   title: "Personal",
//   items: [
//     {
//       id: 1,
//       text: "Swap",
//       URL: "/swap",
//     },
//     {
//       id: 2,
//       text: "Buy",
//       URL: "/buy",
//     },
//     {
//       id: 3,
//       text: "Sell",
//       URL: "/sell",
//     },
//     {
//       id: 4,
//       text: "Bridge",
//       URL: "/bridge",
//     },
//   ],
// }

// const CompanyLinks = {
//   title: "Company",
//   items: [
//     {
//       id: 1,
//       text: "About",
//       URL: "/about",
//     },
//     {
//       id: 2,
//       text: "Reviews",
//       URL: "/reviews",
//     },
//   ],
// }

// const SupportLinks = {
//   title: "Support",
//   items: [
//     {
//       id: 1,
//       text: "FAQ",
//       URL: "/faq",
//     },
//     {
//       id: 2,
//       text: "Contact Us",
//       URL: "/contact",
//     },
//     {
//       id: 3,
//       text: "How it works",
//       URL: "/how-it-works",
//     },
//   ],
// }

// const LegalLinks = {
//   title: "Legal",
//   items: [
//     {
//       id: 1,
//       text: "Terms of Service",
//       URL: "/terms-of-service",
//     },
//     {
//       id: 2,
//       text: "Privacy Policy",
//       URL: "/privacy-policy",
//     },
//   ],
// }

// const FiatOptions = {
//   title: "Fiat Options",
//   items: [
//     {
//       id: 1,
//       text: "Bitcoin (BTC)",
//       URL: "/buy/bitcoin",
//     },
//     {
//       id: 2,
//       text: "Ethereum (ETH)",
//       URL: "/buy/ethereum",
//     },
//     {
//       id: 3,
//       text: "Tether (USDT)",
//       URL: "/buy/tether",
//     },
//     {
//       id: 4,
//       text: "USDC",
//       URL: "/buy/usdc",
//     },
//   ],
// }

// const SwapOptions = {
//   title: "Swap Options",
//   items: [
//     {
//       id: 1,
//       text: "Bitcoin (BTC)",
//       URL: "/swap/btc",
//     },
//     {
//       id: 2,
//       text: "Ethereum (ETH)",
//       URL: "/swap/eth",
//     },
//     {
//       id: 3,
//       text: "Tether (USDT)",
//       URL: "/swap/usdterc20",
//     },
//     {
//       id: 4,
//       text: "USDC",
//       URL: "/swap/usdc",
//     },
//   ],
// }

// const SwapPairs = {
//   title: "Swap Pairs",
//   items: [
//     {
//       id: 1,
//       text: "BTC to USDT",
//       URL: "/swap/btc/usdterc20",
//     },
//     {
//       id: 2,
//       text: "ETH to USDT",
//       URL: "/swap/eth/usdterc20",
//     },
//     {
//       id: 3,
//       text: "USDT to BTC",
//       URL: "/swap/usdterc20/btc",
//     },
//     {
//       id: 4,
//       text: "ETH to USDC",
//       URL: "/swap/eth/usdc",
//     },
//     {
//       id: 5,
//       text: "USDC to BTC",
//       URL: "/swap/usdc/btc",
//     },
//     {
//       id: 6,
//       text: "USDC to ETH",
//       URL: "/swap/usdc/eth",
//     },
//   ],
// }

// const Socials = [
//   {
//     id: 1,
//     text: "Telegram",
//     URL: "https://www.telegram.com",
//     key: "telegram",
//     target: "_blank",
//     icon: "RiTelegram2Fill",
//   },
//   {
//     id: 2,
//     text: "X",
//     URL: "https://www.x.com",
//     key: "x",
//     target: "_blank",
//     icon: "RiTwitterXFill",
//   },
// ]
