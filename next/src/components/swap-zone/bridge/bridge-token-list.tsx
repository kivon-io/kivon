"use client"

import { BlurImage } from "@/components/blur-image"
import Address from "@/components/elements/address"
import Symbol from "@/components/elements/symbol"
import TokenName from "@/components/elements/token-name"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAppContext } from "@/context/app-context"
import { useBridge } from "@/context/bridge-context"
import { cn } from "@/lib/utils"
import { DialogDescription } from "@radix-ui/react-dialog"
import { ChevronDownIcon } from "lucide-react"
import { useState } from "react"
import { useMediaQuery } from "usehooks-ts"
import { POPULAR_CHAINS } from "./constants"

const BridgeTokenList = () => {
  const { state, toggleBridgeTokenList } = useAppContext()
  const isMobile = useMediaQuery("(max-width: 768px)")

  const open = state.bridgeTokenListOpen

  const onOpenChange = () => {
    toggleBridgeTokenList()
  }

  return (
    <>
      {isMobile ? (
        <MobileListDialog open={open} onOpenChange={onOpenChange} />
      ) : (
        <DesktopListDialog open={open} onOpenChange={onOpenChange} />
      )}
    </>
  )
}

export default BridgeTokenList

const DesktopListDialog = ({ open, onOpenChange }: { open: boolean; onOpenChange: () => void }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className='
          transition-all duration-300
          opacity-0 scale-95
          data-[state=open]:opacity-100 data-[state=open]:scale-100
          sm:max-w-2xl bg-white dark:bg-neutral-950
          hidden md:block
        '
      >
        <DialogHeader>
          <DialogTitle className='text-base font-medium'>Select a token</DialogTitle>
          <DialogDescription className='sr-only'>Select a token to swap</DialogDescription>
        </DialogHeader>
        <ListDetails />
      </DialogContent>
    </Dialog>
  )
}

const MobileListDialog = ({ open, onOpenChange }: { open: boolean; onOpenChange: () => void }) => {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className='w-full min-h-[92vh] data-[vaul-drawer-direction=bottom]:max-h-[92vh] rounded-t-3xl'>
        <DrawerHeader>
          <DrawerTitle className='text-base font-medium'>Select a token</DrawerTitle>
          <DrawerDescription className='sr-only'>Select a token to swap</DrawerDescription>
        </DrawerHeader>
        <ListDetails />
      </DrawerContent>
    </Drawer>
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
      <div className='col-span-12 md:col-span-4 bg-neutral-100 dark:bg-neutral-900 rounded-lg p-4 relative z-10 md:z-0'>
        <div className='hidden md:flex flex-col gap-2 h-full'>
          <SearchChains handleSearchChains={handleSearchChains} />
          <ScrollArea className='md:max-h-[400px] h-full'>
            <div className='flex flex-col gap-3'>
              <SelectChain
                chain={null}
                activeChain={activeChain}
                handleSelectChain={handleSelectChain}
              />
              <div className='flex flex-col gap-2 mt-2'>
                <small className='text-xs text-zinc-700 dark:text-zinc-300'>Popular chains</small>
                <div className='flex flex-col gap-1'>
                  {popularChains.map((chain) => (
                    <ChainsComponent
                      key={chain.id}
                      chain={chain}
                      activeChain={activeChain}
                      handleSelectChain={handleSelectChain}
                    />
                  ))}
                </div>
              </div>
              <div className='flex flex-col gap-2 mt-2'>
                <small className='text-xs text-zinc-700 dark:text-zinc-300'>Chains A-Z</small>
                <div className='flex flex-col gap-1'>
                  {filteredChains
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((chain) => (
                      <ChainsComponent
                        key={chain.id}
                        chain={chain}
                        activeChain={activeChain}
                        handleSelectChain={handleSelectChain}
                      />
                    ))}
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className='w-full md:hidden group' data-state='closed'>
            {activeChain ? (
              <SelectChain
                chain={activeChain}
                activeChain={activeChain}
                handleSelectChain={handleSelectChain}
              />
            ) : (
              <SelectChain
                chain={null}
                activeChain={activeChain}
                handleSelectChain={handleSelectChain}
              />
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent className='rounded-lg relative min-w-[calc(100vw-2rem)] max-h-[calc(25rem)] w-full bg-white dark:bg-neutral-950 p-0 shadow-none'>
            <div className='rounded-t-lg fixed top-0 left-0 right-0 mx-auto w-[calc(100%-2px)] bg-white dark:bg-neutral-950 p-4 z-10'>
              <SearchChains handleSearchChains={handleSearchChains} />
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className='justify-start w-full focus:bg-transparent rounded-none'
              onClick={() => handleSelectChain(null)}
            >
              <SelectChain
                chain={null}
                activeChain={activeChain}
                handleSelectChain={handleSelectChain}
                className='w-full'
              />
            </DropdownMenuItem>
            <DropdownMenuItem asChild className='w-full p-2 focus:bg-transparent rounded-none'>
              <div className='flex flex-col gap-2 w-full justify-start items-start'>
                <small className='text-xs text-zinc-700 dark:text-zinc-300'>Popular chains</small>
                <div className='flex flex-col gap-1 w-full'>
                  {popularChains.map((chain) => (
                    <ChainsComponent
                      key={chain.id}
                      chain={chain}
                      activeChain={activeChain}
                      handleSelectChain={handleSelectChain}
                      className='w-full'
                    />
                  ))}
                </div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className='w-full p-2 focus:bg-transparent rounded-none'>
              <div className='flex flex-col gap-2 w-full justify-start items-start'>
                <small className='text-xs text-zinc-700 dark:text-zinc-300'>Chains A-Z</small>
                <div className='flex flex-col gap-1 w-full'>
                  {filteredChains
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((chain) => (
                      <ChainsComponent
                        key={chain.id}
                        chain={chain}
                        activeChain={activeChain}
                        handleSelectChain={handleSelectChain}
                        className='w-full'
                      />
                    ))}
                </div>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className='relative col-span-12 md:col-span-8 flex flex-col gap-2 p-4 md:p-0 h-full'>
        <Input
          placeholder='Search tokens or paste address'
          className='capitalize focus-visible:ring-0 h-10 md:h-12 text-base'
          onChange={handleSearchTokens}
        />
        <ScrollArea className=' max-h-[400px] md:max-h-[420px] h-full'>
          <div className='flex flex-col gap-2 h-full'>
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

const ChainsComponent = ({
  chain,
  activeChain,
  handleSelectChain,
  className,
}: {
  chain: Chain
  activeChain: Chain | null
  handleSelectChain: (chain: Chain | null) => void
  className?: string
}) => {
  return (
    <div
      className={cn(
        "flex gap-2 items-center cursor-pointer hover:bg-zinc-200/50 dark:hover:bg-neutral-950 rounded-md p-2 transition-all duration-300",
        activeChain?.id === chain.id && "bg-zinc-200 dark:bg-neutral-950",
        className
      )}
      onClick={() => handleSelectChain(chain)}
    >
      <ChainImage chain={chain} />
      <p className='text-sm font-medium capitalize text-black dark:text-white'>{chain.name}</p>
    </div>
  )
}

const SelectChain = ({
  chain,
  activeChain,
  handleSelectChain,
  className,
}: {
  chain: Chain | null
  activeChain: Chain | null
  handleSelectChain: (chain: Chain | null) => void
  className?: string
}) => {
  return (
    <div
      className={cn(
        "flex justify-between items-center cursor-pointer hover:bg-zinc-200/50 dark:hover:bg-neutral-950 rounded-md p-2 transition-all duration-300",
        activeChain?.id === chain?.id && "bg-zinc-200 dark:bg-neutral-950",
        className
      )}
      onClick={() => handleSelectChain(chain)}
    >
      <div className='flex gap-2 items-center'>
        {chain ? (
          <ChainImage chain={chain} />
        ) : (
          <div className='h-6 w-6 bg-gradient-to-br from-secondary-custom via-emerald-400 to-blue-600 rounded-sm' />
        )}
        <p className='text-sm font-medium capitalize text-black dark:text-white'>
          {chain ? chain.name : "All chains"}
        </p>
      </div>
      <ChevronDownIcon className='md:hidden w-4 h-4 text-zinc-500 dark:text-zinc-400 transition-all duration-300 group-data-[state=open]:rotate-180' />
    </div>
  )
}

const SearchChains = ({
  handleSearchChains,
}: {
  handleSearchChains: (e: React.ChangeEvent<HTMLInputElement>) => void
}) => {
  return (
    <Input
      placeholder='Search chains'
      className='capitalize bg-white focus-visible:ring-0 text-base'
      onChange={handleSearchChains}
    />
  )
}
