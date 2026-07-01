"use client"

import {
  ArrowRightLeft,
  ChevronRight,
  MenuIcon,
  MonitorIcon,
  MoonIcon,
  SunIcon,
  TrendingUp,
  XIcon,
} from "lucide-react"
import { motion } from "motion/react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

import { useHasMounted } from "@/hooks/use-has-mounted"

import { AppLogo } from "@/components/app-logo"
import { FaqSection } from "@/components/sidebar/faq-section"
import { ThemeDrawer } from "@/components/sidebar/theme-drawer"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  PRIVACY_URL,
  SUPPORT_URL,
  TERMS_URL,
  THEME_OPTIONS,
} from "@/lib/app/config"
import { cn } from "@/lib/utils"

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.22, ease: [0.42, 0, 0.58, 1] as const },
  },
}

const NAV_ITEMS = [
  {
    href: "/bridge",
    label: "Bridge",
    description: "Move tokens across networks",
    icon: ArrowRightLeft,
    isActive: (pathname: string) => pathname.startsWith("/bridge"),
  },
  {
    href: "/earn",
    label: "Earn",
    description: "Deposit USDT and earn yield",
    icon: TrendingUp,
    isActive: (pathname: string) => pathname.startsWith("/earn"),
  },
] as const

function NavRow({
  href,
  label,
  description,
  icon: Icon,
  isActive,
  onNavigate,
}: {
  href: string
  label: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  isActive: boolean
  onNavigate: () => void
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "flex w-full items-center gap-3 py-3.5 text-left transition-colors"
        // isActive && "bg-muted/50"
      )}
    >
      <span
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground",
          isActive && "bg-kivon-500/10 text-kivon-600 dark:text-kivon-400"
        )}
      >
        <Icon className="size-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-medium text-foreground">{label}</span>
        <span className="block text-sm text-muted-foreground">
          {description}
        </span>
      </span>
      <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
    </Link>
  )
}

function SettingsRow({
  icon,
  label,
  value,
  onClick,
}: {
  icon: React.ReactNode
  label: string
  value?: string
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 py-3.5 text-left"
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
        {icon}
      </span>
      <span className="min-w-0 flex-1 font-medium text-foreground">
        {label}
      </span>
      {value ? (
        <span className="shrink-0 text-sm text-muted-foreground">{value}</span>
      ) : null}
      <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
    </button>
  )
}

function SidebarFooter() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-t border-border pt-4 text-xs text-muted-foreground">
      <a
        href={SUPPORT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="transition-colors hover:text-foreground"
      >
        Support
      </a>
      <span aria-hidden className="text-border">
        ·
      </span>
      <a
        href={TERMS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="transition-colors hover:text-foreground"
      >
        Terms
      </a>
      <span aria-hidden className="text-border">
        ·
      </span>
      <a
        href={PRIVACY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="transition-colors hover:text-foreground"
      >
        Privacy
      </a>
    </div>
  )
}

export default function AppSidebar() {
  const [open, setOpen] = useState(false)
  const [themeDrawerOpen, setThemeDrawerOpen] = useState(false)
  const pathname = usePathname()
  const { theme } = useTheme()
  const mounted = useHasMounted()

  const closeSidebar = () => setOpen(false)

  const themeLabel =
    THEME_OPTIONS.find(
      (option) => option.value === (mounted ? theme : "system")
    )?.label ?? "Auto"

  return (
    <>
      <div className="flex h-12 items-center pt-[max(0.5rem,env(safe-area-inset-top))] pl-2">
        <Button
          variant="outline"
          size="icon"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
        >
          <MenuIcon className="size-4" />
        </Button>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="left"
          showCloseButton={false}
          className={cn(
            "flex w-full max-w-full flex-col gap-0 bg-background p-0",
            "data-[side=left]:w-full data-[side=left]:max-w-full data-[side=left]:border-r-0 sm:max-w-full",
            "pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))]"
          )}
        >
          <SheetHeader className="border-b border-border px-4 pt-0 pb-4">
            <SheetTitle className="sr-only">Settings</SheetTitle>
            <div className="flex items-center justify-between">
              <AppLogo size="md" />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(false)}
              >
                <XIcon className="size-4" />
              </Button>
            </div>
          </SheetHeader>

          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-4 py-4">
            <motion.div
              initial="hidden"
              animate={open ? "visible" : "hidden"}
              variants={listVariants}
              className="flex flex-col gap-6"
            >
              <motion.section variants={itemVariants}>
                <p className="mb-1 px-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  Navigate
                </p>
                <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card px-4">
                  {NAV_ITEMS.map((item) => (
                    <NavRow
                      key={item.href}
                      href={item.href}
                      label={item.label}
                      description={item.description}
                      icon={item.icon}
                      isActive={item.isActive(pathname)}
                      onNavigate={closeSidebar}
                    />
                  ))}
                </div>
              </motion.section>

              <motion.section variants={itemVariants}>
                <p className="mb-1 px-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  Preferences
                </p>
                <div className="divide-y divide-border rounded-2xl border border-border bg-card px-4">
                  <SettingsRow
                    icon={
                      themeLabel === "Dark" ? (
                        <MoonIcon className="size-4" />
                      ) : themeLabel === "Light" ? (
                        <SunIcon className="size-4" />
                      ) : (
                        <MonitorIcon className="size-4" />
                      )
                    }
                    label="Theme"
                    value={themeLabel}
                    onClick={() => setThemeDrawerOpen(true)}
                  />
                </div>
              </motion.section>

              <motion.div variants={itemVariants}>
                <FaqSection />
              </motion.div>
            </motion.div>
          </div>

          <div className="shrink-0 px-4 pb-2">
            <SidebarFooter />
          </div>
        </SheetContent>
      </Sheet>

      <ThemeDrawer open={themeDrawerOpen} onOpenChange={setThemeDrawerOpen} />
    </>
  )
}
