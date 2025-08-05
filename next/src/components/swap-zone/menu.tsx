import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

const Menu = ({ children }: { children?: React.ReactNode }) => {
  const pathname = usePathname()
  return (
    <div className={cn("flex items-center justify-center w-full", children && "justify-between")}>
      <NavigationMenu>
        <NavigationMenuList className='bg-white dark:bg-neutral-950 rounded-xl border border-zinc-200 dark:border-zinc-800 p-1'>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                href='/swap'
                className={cn(
                  "text-sm text-zinc-700 dark:text-zinc-100 font-medium min-w-24 text-center rounded-xl",
                  pathname.includes("swap") &&
                    "bg-zinc-100 dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700"
                )}
              >
                Swap
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                href='/bridge'
                className={cn(
                  "text-sm text-zinc-700 dark:text-zinc-100 font-medium min-w-24 text-center rounded-xl",
                  pathname.includes("bridge") &&
                    "bg-zinc-100 dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700"
                )}
              >
                Bridge
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      {children}
    </div>
  )
}

export default Menu

// const LinkItem = ({ url, text }: { url: string; text: string }) => {
//   const pathname = usePathname()
//   return (
//     <Link
//       href={url}
//       className={cn(
//         "text-sm text-zinc-700 dark:text-zinc-100 font-medium min-w-20 text-center",
//         pathname.includes(url) &&
//           "bg-zinc-100 dark:bg-zinc-800 rounded-md border border-zinc-200 dark:border-zinc-800"
//       )}
//     >
//       {text}
//     </Link>
//   )
// }
