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
}

const NavbarItem = ({ href, children, active, className, target }: Props) => {
  const pathname = usePathname()
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center justify-center text-sm leading-[110%] px-2.5 py-2 hover:text-zinc-900 font-semibold border border-transparent text-zinc-500 hover:shadow-[0px_1px_0px_0px_var(--neutral-600)_inset] transition duration-200",
        (active || pathname?.includes(href)) && "text-zinc-900",
        className
      )}
      target={target}
    >
      {children}
    </Link>
  )
}

export default NavbarItem
