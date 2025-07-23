import { APP_NAME } from "@/lib/shared/constants"
import { strapiImage } from "@/lib/strapi/strapiImage"
import Link from "next/link"
import { BlurImage } from "./blur-image"

const Logo = ({ logo }: { logo?: ImageType }) => {
  return (
    <Link href={`/`} className='font-normal flex space-x-2 items-center text-sm mr-4 relative z-20'>
      <div className='relative h-8 w-8'>
        <BlurImage
          src={logo ? strapiImage(logo.url) : "/images/logos/logo-icon.png"}
          alt={"logo"}
          width={400}
          height={400}
          sizes='(max-width: 1080px) 100vw, 1080px'
          className='h-full w-full object-contain object-center rounded-sm'
        />
      </div>
      <p className='text-base font-medium text-zinc-900 dark:text-white'>{APP_NAME}</p>
    </Link>
  )
}

export default Logo
