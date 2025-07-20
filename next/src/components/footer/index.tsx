import { cn } from "@/lib/utils"
import Logo from "../logo"
import FooterItem from "./footer-item"
import SocialLinks from "./social-links"

const Footer = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn("w-full bg-white dark:bg-neutral-900 h-full mt-20 relative z-20", className)}
    >
      <div className='max-w-6xl mx-auto px-4 md:px-10 pt-10 pb-32'>
        <div className='flex justify-between items-center border-b border-zinc-200 dark:border-zinc-800 pb-5'>
          <Logo />
          <div className='flex gap-2 items-center'>
            <SocialLinks links={Socials} />
          </div>
        </div>
        <div className='flex flex-col gap-5 mt-10'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-5'>
            <LinksSection title={PersonalLinks.title} items={PersonalLinks.items} />
            <LinksSection title={CompanyLinks.title} items={CompanyLinks.items} />
            <LinksSection title={SupportLinks.title} items={SupportLinks.items} />
            <LinksSection title={LegalLinks.title} items={LegalLinks.items} />
          </div>
          <div className='relative grid grid-cols-12 gap-4'>
            <LinksSection
              className='col-span-6 md:col-span-3'
              title={FiatOptions.title}
              items={FiatOptions.items}
            />
            <LinksSection
              className='col-span-6 md:col-span-3'
              title={SwapOptions.title}
              items={SwapOptions.items}
            />
            <SwapPairsSection
              className='col-span-12 md:col-span-6'
              title={SwapPairs.title}
              items={SwapPairs.items}
            />
          </div>
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
  items: FooterItem[]
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

const SwapPairsSection = ({
  title,
  items,
  className,
}: {
  title: string
  items: FooterItem[]
  className?: string
}) => {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <h3 className='text-md font-semibold text-zinc-900 dark:text-zinc-100'>{title}</h3>
      <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
        {items.map((item) => (
          <FooterItem key={item.id} item={item} className='text-sm' />
        ))}
      </div>
    </div>
  )
}

const PersonalLinks = {
  title: "Personal",
  items: [
    {
      id: 1,
      text: "Swap",
      URL: "/swap",
    },
    {
      id: 2,
      text: "Buy",
      URL: "/buy",
    },
    {
      id: 3,
      text: "Sell",
      URL: "/sell",
    },
    {
      id: 4,
      text: "Bridge",
      URL: "/bridge",
    },
  ],
}

const CompanyLinks = {
  title: "Company",
  items: [
    {
      id: 1,
      text: "About",
      URL: "/about",
    },
    {
      id: 2,
      text: "Reviews",
      URL: "/reviews",
    },
  ],
}

const SupportLinks = {
  title: "Support",
  items: [
    {
      id: 1,
      text: "FAQ",
      URL: "/faq",
    },
    {
      id: 2,
      text: "Contact Us",
      URL: "/contact",
    },
    {
      id: 3,
      text: "How it works",
      URL: "/how-it-works",
    },
  ],
}

const LegalLinks = {
  title: "Legal",
  items: [
    {
      id: 1,
      text: "Terms of Service",
      URL: "/terms-of-service",
    },
    {
      id: 2,
      text: "Privacy Policy",
      URL: "/privacy-policy",
    },
  ],
}

const FiatOptions = {
  title: "Fiat Options",
  items: [
    {
      id: 1,
      text: "Bitcoin (BTC)",
      URL: "/buy/bitcoin",
    },
    {
      id: 2,
      text: "Ethereum (ETH)",
      URL: "/buy/ethereum",
    },
    {
      id: 3,
      text: "Tether (USDT)",
      URL: "/buy/tether",
    },
    {
      id: 4,
      text: "USDC",
      URL: "/buy/usdc",
    },
  ],
}

const SwapOptions = {
  title: "Swap Options",
  items: [
    {
      id: 1,
      text: "Bitcoin (BTC)",
      URL: "/swap/btc",
    },
    {
      id: 2,
      text: "Ethereum (ETH)",
      URL: "/swap/eth",
    },
    {
      id: 3,
      text: "Tether (USDT)",
      URL: "/swap/usdt",
    },
    {
      id: 4,
      text: "USDC",
      URL: "/swap/usdc",
    },
  ],
}

const SwapPairs = {
  title: "Swap Pairs",
  items: [
    {
      id: 1,
      text: "BTC to USDT",
      URL: "/swap/btc/usdt",
    },
    {
      id: 2,
      text: "ETH to USDT",
      URL: "/swap/eth/usdt",
    },
    {
      id: 3,
      text: "USDT to BTC",
      URL: "/swap/usdt/btc",
    },
    {
      id: 4,
      text: "ETH to USDC",
      URL: "/swap/eth/usdc",
    },
    {
      id: 5,
      text: "USDC to BTC",
      URL: "/swap/usdc/btc",
    },
    {
      id: 6,
      text: "USDC to ETH",
      URL: "/swap/usdc/eth",
    },
  ],
}

const Socials = [
  {
    id: 1,
    text: "Telegram",
    URL: "https://www.telegram.com",
    key: "telegram",
    target: "_blank",
    icon: "RiTelegram2Fill",
  },
  {
    id: 2,
    text: "X",
    URL: "https://www.x.com",
    key: "x",
    target: "_blank",
    icon: "RiTwitterXFill",
  },
]
