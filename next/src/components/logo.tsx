import { APP_NAME } from "@/lib/shared/constants"
import Link from "next/link"
import { BlurImage } from "./blur-image"

const Logo = () => {
  return (
    <Link href={`/`} className='font-normal flex space-x-2 items-center text-sm mr-4 relative z-20'>
      <div className='relative h-8 w-8'>
        <BlurImage
          src={"/images/logos/logo-icon.png"}
          alt={"logo"}
          width={400}
          height={400}
          className='h-full w-full object-contain object-center rounded-sm'
        />
      </div>
      <p className='text-base font-medium text-zinc-900'>{APP_NAME}</p>
    </Link>
  )
}

export default Logo
