import { BlurImage } from "@/components/blur-image"
import { Grid } from "@/components/decorations/grid"
import { Heading } from "@/components/elements/heading"
import { Subheading } from "@/components/elements/sub_heading"
import { strapiImage } from "@/lib/strapi/strapiImage"

const LegalPageHeader = ({
  heading,
  sub_heading,
  image,
}: {
  heading: string
  sub_heading: string
  image: ImageType
}) => {
  return (
    <div className='relative h-72 md:h-[400px] w-full overflow-hidden'>
      {image.url && (
        <BlurImage
          src={strapiImage(image.url)}
          alt='Legal Page Header'
          width={1000}
          height={1000}
          className='object-cover w-full h-full'
        />
      )}
      <div className='absolute inset-0 bg-gradient-to-b from-black/30 via-black/70 to-black z-10 flex flex-col items-center justify-center'>
        <Heading
          as='h1'
          className='text-2xl md:text-4xl lg:text-4xl font-semibold bg-gradient-to-b from-zinc-200 via-zinc-300 to-zinc-400 text-transparent bg-clip-text'
        >
          {heading}
        </Heading>
        <Subheading
          as='p'
          className='text-sm md:text-sm lg:text-base text-zinc-300 w-full md:max-w-4/5 mx-auto'
        >
          {sub_heading}
        </Subheading>
      </div>
      <Grid size={30} className='top-0 w-full h-full' />
    </div>
  )
}

export default LegalPageHeader
