"use client"

import { useRouter } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type ReviewHeaderProps = {
  title?: string
  backHref?: string
  className?: string
}

export function ReviewHeader({
  title = "Review",
  backHref = "/bridge",
  className,
}: ReviewHeaderProps) {
  const router = useRouter()

  return (
    <div className={cn("relative flex items-center justify-center py-2", className)}>
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="absolute left-0 size-10 rounded-full"
        onClick={() => router.push(backHref)}
        aria-label="Go back"
      >
        <ChevronLeft className="size-5" />
      </Button>
      <h1 className="text-lg font-bold text-foreground">{title}</h1>
    </div>
  )
}
