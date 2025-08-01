import { BlurImage } from "@/components/blur-image"
import { cn } from "@/lib/utils"

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

export default ChainImage
