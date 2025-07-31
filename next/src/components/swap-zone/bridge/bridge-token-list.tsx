"use client"

import { BlurImage } from "@/components/blur-image"
import Address from "@/components/elements/address"
import Symbol from "@/components/elements/symbol"
import TokenName from "@/components/elements/token-name"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAppContext } from "@/context/app-context"
import { useBridge } from "@/context/bridge-context"
import { cn } from "@/lib/utils"
import { DialogDescription } from "@radix-ui/react-dialog"
import { useState } from "react"
import { POPULAR_CHAINS } from "./constants"

const BridgeTokenList = () => {
  const { state, toggleBridgeTokenList } = useAppContext()

  const open = state.bridgeTokenListOpen

  const onOpenChange = () => {
    toggleBridgeTokenList()
  }

  return (
    <>
      <div className='hidden md:flex'>
        <ListDialog open={open} onOpenChange={onOpenChange} />
      </div>
    </>
  )
}

export default BridgeTokenList

const ListDialog = ({ open, onOpenChange }: { open: boolean; onOpenChange: () => void }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className='
          transition-all duration-300
          opacity-0 scale-95
          data-[state=open]:opacity-100 data-[state=open]:scale-100
          sm:max-w-2xl bg-white dark:bg-neutral-950
        '
      >
        <DialogHeader>
          <DialogTitle className='text-base font-medium'>Select a token</DialogTitle>
          <DialogDescription className='sr-only'>Select a token to swap</DialogDescription>
        </DialogHeader>
        {/* <div className='flex flex-col gap-4'>
            <Input
              placeholder='Search for a token'
              className='h-12 capitalize'
              onChange={handleSearch}
            />

            <ScrollArea className='h-full w-full max-h-[350px] space-y-2'>
              {filteredCurrencies?.map((currency, index) => (
                <div
                  key={index}
                  className='mb-2 w-full border border-zinc-200 dark:border-zinc-900 bg-zinc-100 dark:bg-neutral-950 flex gap-2 items-center px-3 py-2 rounded-xl hover:bg-zinc-200 dark:hover:bg-neutral-900 cursor-pointer transition-all duration-300'
                  onClick={() => handleClick(currency)}
                >
                  {currency.image && <TokenLogo src={currency.image} alt={currency.ticker} />}
                  <div className='flex flex-col gap-1'>
                    <div className='flex gap-2 items-center'>
                      <Symbol symbol={currency.ticker} />
                      <Badge>
                        <span className='text-xs uppercase font-medium'>{currency.network}</span>
                      </Badge>
                    </div>
                    <TokenName name={currency.name} />
                  </div>
                </div>
              ))}
            </ScrollArea>
          </div> */}
        <ListDetails />
      </DialogContent>
    </Dialog>
  )
}

const ListDetails = () => {
  const { chains } = useBridge()
  const [filteredChains, setFilteredChains] = useState<Chain[]>(chains || [])
  const [activeChain, setActiveChain] = useState<Chain | null>(null)

  const handleSearchChains = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const filteredChains = chains?.filter((chain) =>
      chain.name.toLowerCase().includes(value.toLowerCase())
    )
    setFilteredChains(filteredChains)
  }

  const handleSearchTokens = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("search token: ", e.target.value)
  }

  const handleSelectChain = (chain: Chain | null) => {
    setActiveChain(chain)
  }

  const handleSelectToken = (token: Token) => {
    console.log("select token: ", token)
  }

  const popularChains =
    chains?.filter((chain) => POPULAR_CHAINS.includes(chain.name.toLowerCase())) || []

  // Get featured tokens from popular chains first
  const popularTokens = popularChains.map((chain) => chain.featuredTokens.slice(0, 1)).flat()

  // Get tokens from non-popular chains (exclude popular chains)
  const nonPopularChains =
    chains?.filter((chain) => !POPULAR_CHAINS.includes(chain.name.toLowerCase())) || []
  const nonPopularTokens = nonPopularChains.map((chain) => chain.featuredTokens.slice(0, 1)).flat()

  // Combine popular tokens first, then non-popular tokens
  const allTokens = [...popularTokens, ...nonPopularTokens]

  return (
    <div className='grid grid-cols-12 gap-2'>
      <div className='col-span-12 md:col-span-4 bg-neutral-100 dark:bg-neutral-900 rounded-lg p-4 flex flex-col gap-2'>
        <Input
          placeholder='Search chains'
          className='capitalize bg-white focus-visible:ring-0'
          onChange={handleSearchChains}
        />
        <ScrollArea className='md:max-h-[400px] h-full'>
          <div className='flex flex-col gap-3'>
            <div
              className={cn(
                "text-sm font-medium text-black dark:text-white cursor-pointer h-10 flex gap-2 items-center hover:bg-zinc-200/50 dark:hover:bg-neutral-950 rounded-md p-2 transition-all duration-300",
                !activeChain && "bg-zinc-200 dark:bg-neutral-950 rounded-md p-2"
              )}
              onClick={() => handleSelectChain(null)}
            >
              <div className='h-6 w-6 bg-gradient-to-br from-secondary-custom via-emerald-400 to-blue-600 rounded-sm' />
              All chains
            </div>
            <div className='flex flex-col gap-2 mt-2'>
              <small className='text-xs text-zinc-700 dark:text-zinc-300'>Popular chains</small>
              <div className='flex flex-col gap-1'>
                {popularChains.map((chain) => (
                  <div
                    key={chain.id}
                    className={cn(
                      "flex gap-2 items-center cursor-pointer hover:bg-zinc-200/50 dark:hover:bg-neutral-950 rounded-md p-2 transition-all duration-300",
                      activeChain?.id === chain.id && "bg-zinc-200 dark:bg-neutral-950"
                    )}
                    onClick={() => handleSelectChain(chain)}
                  >
                    <ChainImage chain={chain} />
                    <p className='text-sm font-medium capitalize text-black dark:text-white'>
                      {chain.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className='flex flex-col gap-2 mt-2'>
              <small className='text-xs text-zinc-700 dark:text-zinc-300'>Chains A-Z</small>
              <div className='flex flex-col gap-1'>
                {filteredChains
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((chain) => (
                    <div
                      key={chain.id}
                      className={cn(
                        "flex gap-2 items-center cursor-pointer hover:bg-zinc-200/50 dark:hover:bg-neutral-950 rounded-md p-2 transition-all duration-300",
                        activeChain?.id === chain.id && "bg-zinc-200 dark:bg-neutral-950"
                      )}
                      onClick={() => handleSelectChain(chain)}
                    >
                      <ChainImage chain={chain} />
                      <p className='text-sm font-medium capitalize text-black dark:text-white'>
                        {chain.name}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
      <div className='col-span-12 md:col-span-8 flex flex-col gap-2'>
        <Input
          placeholder='Search tokens or paste address'
          className='capitalize focus-visible:ring-0'
          onChange={handleSearchTokens}
        />
        <ScrollArea className='md:max-h-[400px] h-full'>
          <div className='flex flex-col gap-2'>
            {activeChain ? (
              <FeaturedTokens
                tokens={activeChain.featuredTokens}
                chain={activeChain}
                handleSelectToken={handleSelectToken}
              />
            ) : (
              <div className='flex flex-col gap-2'>
                {allTokens.map((tokens, index) => (
                  <TokenComponent
                    token={tokens}
                    chain={chains.find((chain) => chain.featuredTokens.includes(tokens))!}
                    handleClick={() => handleSelectToken(tokens)}
                    key={index}
                  />
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

const ChainImage = ({ chain, className }: { chain: Chain; className?: string }) => {
  return chain.iconUrl ? (
    <BlurImage
      src={chain.iconUrl}
      alt={chain.name}
      width={20}
      height={20}
      className={cn("rounded-md w-6 h-6", className)}
    />
  ) : (
    <div
      className={cn(
        "w-6 h-6 rounded-md bg-zinc-100 dark:bg-neutral-950 flex items-center justify-center",
        className
      )}
    >
      <p className='text-sm font-medium uppercase'>{chain.name.charAt(0)}</p>
    </div>
  )
}

const TokenImage = ({
  name,
  image,
  className,
}: {
  name: string
  image: string
  className?: string
}) => {
  return image ? (
    <BlurImage
      src={image}
      alt={name}
      width={20}
      height={20}
      className={cn("rounded-md w-6 h-6", className)}
    />
  ) : (
    <div
      className={cn(
        "w-6 h-6 rounded-md bg-zinc-100 dark:bg-neutral-950 flex items-center justify-center",
        className
      )}
    >
      <p className='text-sm font-medium uppercase'>{name.charAt(0)}</p>
    </div>
  )
}

const TokenComponent = ({
  token,
  chain,
  handleClick,
}: {
  token: Token
  chain: Chain
  handleClick: () => void
}) => {
  return (
    <div
      className='w-full border border-zinc-200 dark:border-zinc-900 bg-zinc-100 dark:bg-neutral-950 flex gap-2 items-center px-3 py-2 rounded-xl hover:bg-zinc-200 dark:hover:bg-neutral-900 cursor-pointer transition-all duration-300'
      onClick={handleClick}
    >
      <div className='relative'>
        <TokenImage name={token.name} image={token.metadata.logoURI} className='w-10 h-10' />
        <div className='absolute bottom-0 -right-1 bg-white dark:bg-neutral-950 rounded-lg'>
          <ChainImage chain={chain} className='w-4 h-4 rounded-lg ' />
        </div>
      </div>
      <div className='flex flex-col'>
        <div className='flex gap-2 items-center'>
          <Symbol className='text-lg text-black dark:text-white' symbol={token.symbol} />
          {/* <Badge>
            <span className='text-xs uppercase font-medium'>{network}</span>
          </Badge> */}
        </div>
        <div className='flex gap-1'>
          <TokenName className='text-black dark:text-white text-xs' name={token.name} />
          <Address address={token.address} className='text-xs text-zinc-500 dark:text-zinc-400' />
        </div>
      </div>
    </div>
  )
}

const FeaturedTokens = ({
  tokens,
  chain,
  handleSelectToken,
}: {
  tokens: Token[]
  chain: Chain
  handleSelectToken: (token: Token) => void
}) => {
  return (
    <div className='flex flex-wrap gap-2'>
      {tokens.map((token) => (
        <div
          className='relative cursor-pointer flex gap-2 items-center border border-zinc-200 dark:border-zinc-700 rounded-full p-2 hover:bg-zinc-100 dark:hover:bg-neutral-950 transition-all duration-300'
          key={token.id}
          onClick={() => handleSelectToken(token)}
        >
          <div className='relative'>
            <TokenImage name={token.name} image={token.metadata.logoURI} className='w-6 h-6' />
            <div className='absolute bottom-0 -right-1 bg-white dark:bg-neutral-950 rounded-lg'>
              <ChainImage chain={chain} className='w-3 h-3 rounded-lg ' />
            </div>
          </div>
          <Symbol symbol={token.symbol} />
        </div>
      ))}
    </div>
  )
}
