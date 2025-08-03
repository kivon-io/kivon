import { BlurImage } from "@/components/blur-image"
import { cn } from "@/lib/utils"

const ChainImage = ({ chain, className }: { chain: Chain; className?: string }) => {
  if (!chain) return null
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

export default ChainImage

const BridgeImageAsset = ({
  chainName,
  chainImage,
  currencyName,
  currencyImage,
}: {
  chainName: string
  chainImage: string
  currencyName: string
  currencyImage: string
}) => {
  return (
    <div className='relative'>
      {currencyImage && (
        <BlurImage
          src={currencyImage}
          alt={currencyName}
          className='object-contain object-center w-8 h-8 rounded-full shrink-0'
          width={32}
          height={32}
        />
      )}
      {chainImage && (
        <div className='absolute -bottom-1 -right-1 bg-white dark:bg-neutral-950 border border-zinc-200 dark:border-zinc-700 rounded-full'>
          <BlurImage
            src={chainImage}
            alt={chainName}
            className='object-cover object-center w-4 h-4 rounded-full'
            width={16}
            height={16}
          />
        </div>
      )}
    </div>
  )
}

export { BridgeImageAsset }
