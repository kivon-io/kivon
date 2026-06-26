import { cn } from "@/lib/utils"

const Header = ({
  heading,
  subHeading,
  className,
}: {
  heading: string
  subHeading?: string
  className?: string
}) => {
  return (
    <div
      className={cn(
        "flex h-fit w-full flex-col items-center justify-center",
        className
      )}
    >
      <h1 className="text-lg font-bold">{heading}</h1>
      <p className="text-sm text-foreground">{subHeading}</p>
    </div>
  )
}

export default Header
