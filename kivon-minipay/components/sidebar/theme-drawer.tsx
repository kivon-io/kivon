"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { IoCheckmarkCircle } from "react-icons/io5"

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from "@/components/ui/drawer"
import { THEME_OPTIONS, type ThemeOption } from "@/lib/app/config"
import { cn } from "@/lib/utils"

type ThemeDrawerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ThemeDrawer({ open, onOpenChange }: ThemeDrawerProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const activeTheme = (mounted ? theme : "system") as ThemeOption

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="bg-background pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <div className="px-4 pt-2">
          <DrawerTitle className="text-center text-base font-semibold">
            Theme
          </DrawerTitle>
          <DrawerDescription className="sr-only">
            Choose light, dark, or auto theme
          </DrawerDescription>
        </div>

        <div className="mt-2 px-4">
          {THEME_OPTIONS.map((option) => {
            const isSelected = activeTheme === option.value

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  setTheme(option.value)
                  onOpenChange(false)
                }}
                className="flex w-full items-center justify-between gap-3 border-b border-border py-4 text-left last:border-b-0"
              >
                <div>
                  <p className="font-medium text-foreground">{option.label}</p>
                  <p className="text-sm text-muted-foreground">
                    {option.description}
                  </p>
                </div>
                <IoCheckmarkCircle
                  className={cn(
                    "size-6 shrink-0 text-emerald-500 transition-opacity",
                    isSelected ? "opacity-100" : "opacity-0"
                  )}
                />
              </button>
            )
          })}
        </div>
      </DrawerContent>
    </Drawer>
  )
}
