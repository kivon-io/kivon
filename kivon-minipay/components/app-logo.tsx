import { APP_NAME, APP_LOGO_URL } from "@/lib/app/config"
import { cn } from "@/lib/utils"

type AppLogoProps = {
  showName?: boolean
  size?: "sm" | "md"
  className?: string
}

const sizeMap = {
  sm: { icon: 28, text: "text-sm" },
  md: { icon: 36, text: "text-base" },
} as const

export function AppLogo({
  showName = true,
  size = "md",
  className,
}: AppLogoProps) {
  const dimensions = sizeMap[size]

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      {APP_LOGO_URL ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={APP_LOGO_URL}
          alt={`${APP_NAME} logo`}
          width={dimensions.icon}
          height={dimensions.icon}
          className="shrink-0 rounded-lg object-contain"
          style={{ width: dimensions.icon, height: dimensions.icon }}
        />
      ) : (
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-kivon-500 font-semibold text-white">
          {APP_NAME.slice(0, 1)}
        </div>
      )}
      {showName ? (
        <span className={cn("font-semibold text-foreground", dimensions.text)}>
          {APP_NAME}
        </span>
      ) : null}
    </div>
  )
}
