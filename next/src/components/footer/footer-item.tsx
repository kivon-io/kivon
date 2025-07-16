import { cn } from "@/lib/utils"
import Link from "next/link"

const FooterItem = ({ item, className }: { item: FooterItem; className?: string }) => {
  return (
    <Link
      href={item.URL}
      target={item.target}
      className={cn(
        "text-zinc-700 dark:text-zinc-100 hover:text-zinc-900 dark:hover:text-zinc-50 font-medium",
        className
      )}
    >
      {item.text}
    </Link>
  )
}

export default FooterItem
