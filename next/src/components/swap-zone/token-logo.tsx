import { cn } from "@/lib/utils"
import Image from "next/image"
import { useState } from "react"

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  width?: number
  height?: number
  alt?: string
  layout?: "fill" | "fixed" | "intrinsic" | "responsive" | "raw"
  className?: string
}

const TokenLogo = (props: ImageProps) => {
  const [isLoading, setIsLoading] = useState(true)

  const { src, width, height, alt, layout, ...rest } = props
  return (
    <Image
      className={cn("transition duration-300", isLoading ? "blur-sm" : "blur-0", props.className)}
      onLoad={() => setIsLoading(false)}
      src={src}
      width={width || 32}
      height={height || 32}
      loading='lazy'
      decoding='async'
      blurDataURL={src as string}
      layout={layout}
      alt={alt ? alt : "logo"}
      {...rest}
    />
  )
}

export default TokenLogo
