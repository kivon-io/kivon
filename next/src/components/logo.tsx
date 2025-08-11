"use client"

import { useIsReviews } from "@/hooks/use-is-reviews"
import { APP_NAME } from "@/lib/shared/constants"
import { strapiImage } from "@/lib/strapi/strapiImage"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { BlurImage } from "./blur-image"

const Logo = ({ logo, showBackground }: { logo?: ImageType; showBackground?: boolean }) => {
  const isReviews = useIsReviews()

  return (
    <Link href={`/`} className='font-normal flex space-x-2 items-center text-sm mr-4 relative z-20'>
      <div className='relative h-8 w-8'>
        <BlurImage
          src={logo ? strapiImage(logo.url) : "/images/logos/logo-icon.png"}
          alt={"logo"}
          width={400}
          height={400}
          className='h-full w-full object-contain object-center rounded-sm'
        />
      </div>
      <p
        className={cn(
          "text-base font-medium text-zinc-900 dark:text-white",
          isReviews && !showBackground && "text-white dark:text-white"
        )}
      >
        {APP_NAME}
      </p>
    </Link>
  )
}

export default Logo
