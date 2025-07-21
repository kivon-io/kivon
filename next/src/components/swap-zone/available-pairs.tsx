"use client"
import { useUrlRoute } from "@/lib/shared/urlParams"
import { cn } from "@/lib/utils"
import { trpc } from "@/trpc/client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { HiOutlineExternalLink } from "react-icons/hi"
import { PiArrowsLeftRightFill } from "react-icons/pi"
import { TbLockCheck, TbLockX } from "react-icons/tb"
import { DotButton } from "../dot-button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "../ui/carousel"
import TokenLogo from "./token-logo"

const AvailablePairs = () => {
  const { from } = useUrlRoute()
  const router = useRouter()
  const [showMore, setShowMore] = useState(false)

  const { data: availablePairs } = trpc.getAvailablePairs.useQuery(
    { from },
    { enabled: !!from, retry: false }
  )

  const pairsToShow = availablePairs?.slice(0, 10)

  const { data: tokenInfosForTo } = trpc.getTokenInfos.useQuery(
    { tickers: pairsToShow?.map((pair) => pair.toCurrency) || [] },
    { enabled: !!pairsToShow, retry: false }
  )

  const { data: tokenInfoFrom } = trpc.getTokenInfo.useQuery(
    { ticker: from },
    { enabled: !!from, retry: false }
  )

  // match the tokenInfosForto with their toCurrency ticker and add the tokenInfoFrom to the object
  // that way I can a token info and its available pair details in the same object

  const tokenInfosWithPairDetails = tokenInfosForTo?.map((tokenInfo) => {
    const matchingPair = pairsToShow?.find((pair) => pair.toCurrency === tokenInfo.ticker)
    return { ...tokenInfo, pair: matchingPair, tokenInfoFrom }
  })

  const handleSwap = (from: string, to: string) => {
    router.push(`/swap/${from}/${to}?step=transaction-details`)
  }

  const handleShowMore = () => {
    setShowMore(!showMore)
  }

  if (!from) return null

  return (
    <div className='relative mt-10 px-2 md:px-5 max-w-2xl mx-auto'>
      {tokenInfosWithPairDetails
        ?.slice(0, showMore ? tokenInfosWithPairDetails.length : 5)
        .map((tokenInfo, index) => (
          <Accordion
            type='single'
            collapsible
            key={index}
            className='mb-2 border border-zinc-200 dark:border-zinc-800 bg-gradient-to-r from-zinc-50 to-zinc-100 dark:from-neutral-950 dark:to-neutral-900 rounded-lg p-2'
          >
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger className='hover:no-underline group'>
                <div className='w-full flex flex-col gap-2 md:flex-row md:gap-4 md:items-center  md:justify-between'>
                  <div className='flex items-center gap-2 shrink-0'>
                    <div className='flex -space-x-2'>
                      <TokenLogo
                        src={tokenInfo.tokenInfoFrom?.image || ""}
                        alt={tokenInfo.tokenInfoFrom?.name || ""}
                        className='w-7 h-7 '
                      />
                      <TokenLogo
                        src={tokenInfo.image || ""}
                        alt={tokenInfo.name || ""}
                        className='w-7 h-7 '
                      />
                    </div>
                    <p className='text-sm font-medium'>
                      {tokenInfo.tokenInfoFrom?.name} - {tokenInfo.name}
                    </p>
                  </div>
                  <div className='flex gap-2 w-full md:justify-end'>
                    <div className='flex flex-col gap-1 md:items-end'>
                      <p className='text-xs text-zinc-500 dark:text-zinc-400 font-medium'>
                        Available for swap
                      </p>
                      <PiArrowsLeftRightFill className='w-4 h-4 text-emerald-500' />
                    </div>
                    <div className='flex flex-col gap-1 md:items-end '>
                      <p className='text-xs text-zinc-500 dark:text-zinc-400 font-medium'>
                        Fixed rate
                      </p>
                      {tokenInfo.pair?.flow["fixed-rate"] ? (
                        <TbLockCheck className='w-4 h-4 text-emerald-500' />
                      ) : (
                        <TbLockX className='w-4 h-4 text-zinc-500' />
                      )}
                    </div>
                    <Button
                      className='w-fit ml-auto md:ml-0 flex md:hidden md:group-hover:block transition-all duration-300'
                      size='sm'
                      onClick={(e) => {
                        e.stopPropagation()
                        handleSwap(tokenInfo.tokenInfoFrom?.ticker || "", tokenInfo.ticker)
                      }}
                    >
                      Swap
                    </Button>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className='grid grid-cols-1 md:grid-cols-1 gap-2'>
                <div className='border border-zinc-200 dark:border-zinc-700 p-4 rounded-lg bg-white dark:bg-neutral-900'>
                  <div className='flex gap-2 items-center'>
                    <TokenLogo
                      src={tokenInfo.tokenInfoFrom?.image || ""}
                      alt={tokenInfo.tokenInfoFrom?.name || ""}
                      className='w-7 h-7'
                    />
                    <p className='text-sm font-medium'>
                      {tokenInfo.tokenInfoFrom?.name}
                      <span className='text-zinc-500 uppercase text-xs ml-1'>
                        ({tokenInfo.tokenInfoFrom?.ticker})
                      </span>
                    </p>
                  </div>
                  <WalletCarousel
                    wallets={[
                      ...(tokenInfoFrom?.wallets.primary || []),
                      ...(tokenInfoFrom?.wallets.secondary || []),
                    ]}
                  />
                </div>
                <div className='border border-zinc-200 dark:border-zinc-700 p-4 rounded-lg bg-white dark:bg-zinc-900'>
                  <div className='flex gap-2 items-center'>
                    <TokenLogo
                      src={tokenInfo.image || ""}
                      alt={tokenInfo.name || ""}
                      className='w-7 h-7'
                    />
                    <p className='text-sm font-medium'>
                      {tokenInfo.name}
                      <span className='text-zinc-500 uppercase text-xs ml-1'>
                        ({tokenInfo.ticker})
                      </span>
                    </p>
                  </div>
                  <WalletCarousel
                    wallets={[
                      ...(tokenInfo?.wallets.primary || []),
                      ...(tokenInfo?.wallets.secondary || []),
                    ]}
                  />
                </div>
                {/* <Button
                className='w-fit flex md:hidden'
                onClick={() => handleSwap(tokenInfo.tokenInfoFrom?.ticker || "", tokenInfo.ticker)}
              >
                Swap {tokenInfo.tokenInfoFrom?.name} - {tokenInfo.name}
              </Button> */}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      {tokenInfosWithPairDetails && (
        <div className='flex justify-center'>
          <Button className='w-fit mx-auto font-medium' variant='ghost' onClick={handleShowMore}>
            {showMore ? "View less" : "View more"}
          </Button>
        </div>
      )}
    </div>
  )
}

export default AvailablePairs

const WalletCarousel = ({ wallets }: { wallets?: Wallet[] }) => {
  const [api, setApi] = useState<CarouselApi>()
  const [selectedIndex, setSelectedIndex] = useState(0)
  // const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) return

    const onSelect = () => setSelectedIndex(api.selectedScrollSnap())
    const onReInit = () => {
      // setCount(api.scrollSnapList().length)
      setSelectedIndex(api.selectedScrollSnap())
    }

    api.on("select", onSelect)
    api.on("reInit", onReInit)

    // Set initial state
    // setCount(api.scrollSnapList().length)
    setSelectedIndex(api.selectedScrollSnap())

    return () => {
      api.off("select", onSelect)
      api.off("reInit", onReInit)
    }
  }, [api])

  return (
    <>
      <Carousel opts={{ align: "start" }} setApi={setApi}>
        <CarouselContent>
          {wallets?.map((wallet, index) => (
            <CarouselItem
              key={index}
              className={cn(wallets.length > 1 ? "basis-5/6" : "basis-full", "relative")}
            >
              <WalletCard wallet={wallet} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className='mt-2 flex gap-2 justify-end'>
        {wallets &&
          wallets.length > 1 &&
          wallets.map((_, index) => {
            return (
              <DotButton
                key={index}
                onClick={() => api && api.scrollTo(index)}
                className={cn(
                  selectedIndex === index && "bg-black dark:bg-white",
                  "w-2 h-2 rounded-full bg-zinc-200 dark:bg-zinc-700 border border-zinc-300 dark:border-zinc-700"
                )}
              />
            )
          })}
      </div>
    </>
  )
}

const WalletCard = ({ className, wallet }: { className?: string; wallet: Wallet }) => {
  return (
    <div
      className={cn(
        "bg-zinc-50 dark:bg-neutral-950 flex gap-2 mt-2 border border-zinc-200 dark:border-zinc-700 rounded-lg p-2",
        className
      )}
    >
      <div className='flex flex-col'>
        <div className='flex gap-2'>
          <TokenLogo
            src={wallet.imageUrl || ""}
            alt={wallet.name || ""}
            className='w-7 h-7 rounded-full'
          />
          <div className='flex flex-col'>
            <div className='flex gap-2 items-center'>
              <p className='text-sm font-medium'>{wallet.name}</p>
              <a href={wallet.url} target='_blank' rel='noopener noreferrer'>
                <HiOutlineExternalLink className='w-4 h-4 text-zinc-500' />
              </a>
            </div>
            <p className='text-zinc-500 text-xs font-medium capitalize'>
              {Object.keys(wallet.platforms)
                .filter((key) => wallet.platforms[key as keyof typeof wallet.platforms])
                .join(", ")}
            </p>
          </div>
        </div>
        <div className='flex gap-2'>
          {Object.keys(wallet.properties).map((key) => {
            const value = wallet.properties[key as keyof typeof wallet.properties]
            if (!value) return null
            return (
              <div className='flex flex-col gap-1' key={key}>
                <p className='text-zinc-500 text-xs font-medium capitalize'>{key}</p>
                <Badge className='rounded-sm bg-secondary-custom/20 border border-secondary-custom text-secondary-custom'>
                  {value}
                </Badge>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
