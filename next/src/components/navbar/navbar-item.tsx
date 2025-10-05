import { useIsIndex, useIsReviews, useIsTradingCompetition } from "@/hooks/use-is-reviews"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ReactNode } from "react"

type Props = {
  href: never
  children: ReactNode
  active?: boolean
  className?: string
  target?: string
  showBackground?: boolean
}

const NavbarItem = ({ href, children, active, className, target, showBackground }: Props) => {
  const pathname = usePathname()
  const isReviews = useIsReviews()
  const isIndex = useIsIndex()
  const isTradingCompetition = useIsTradingCompetition()

  const isChangeColor = isReviews || isIndex || isTradingCompetition
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center justify-center text-sm leading-[110%] px-2.5 py-2 hover:text-zinc-900 dark:hover:text-zinc-200 font-semibold border border-transparent text-zinc-500 dark:text-white hover:shadow-[0px_1px_0px_0px_var(--neutral-600)_inset] transition duration-200",
        (active || pathname?.includes(href)) && "text-zinc-900 dark:text-white",
        isChangeColor && !showBackground && "text-white dark:text-white",
        className
      )}
      target={target}
    >
      {children}
    </Link>
  )
}

export default NavbarItem
