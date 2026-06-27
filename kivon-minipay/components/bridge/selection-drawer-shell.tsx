"use client"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from "@/components/ui/drawer"
import { cn } from "@/lib/utils"
import { HiOutlineSearch } from "react-icons/hi"
import { HiChevronLeft } from "react-icons/hi2"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"

type SelectionDrawerShellProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  showSearch?: boolean
  searchValue?: string
  onSearchChange?: (value: string) => void
  searchPlaceholder?: string
  onBack?: () => void
  children: React.ReactNode
  className?: string
}

export function SelectionDrawerShell({
  open,
  onOpenChange,
  title,
  description,
  showSearch = false,
  searchValue = "",
  onSearchChange,
  searchPlaceholder = "Search",
  onBack,
  children,
  className,
}: SelectionDrawerShellProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent
        className={cn(
          "flex max-h-[min(85dvh,100%)] flex-col overflow-hidden bg-background data-[vaul-drawer-direction=bottom]:max-h-[min(85dvh,100%)]",
          className
        )}
      >
        <div className="flex shrink-0 flex-col gap-4 px-4 pt-2">
          <div className="flex items-center justify-between gap-3">
            {onBack ? (
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="size-10 rounded-full"
                onClick={onBack}
              >
                <HiChevronLeft className="size-5" />
              </Button>
            ) : (
              <div className="size-10" />
            )}

            <DrawerTitle className="text-center text-base font-semibold">
              {title}
            </DrawerTitle>

            <div className="size-10" />
          </div>

          {description ? (
            <DrawerDescription className="sr-only">
              {description}
            </DrawerDescription>
          ) : null}

          {showSearch && onSearchChange ? (
            <InputGroup className="h-11">
              <InputGroupAddon>
                <HiOutlineSearch className="size-5" />
              </InputGroupAddon>
              <InputGroupInput
                value={searchValue.trim()}
                onChange={(event) => onSearchChange(event.target.value)}
                placeholder={searchPlaceholder}
              />
            </InputGroup>
          ) : null}
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pt-2 pb-[max(1.5rem,env(safe-area-inset-bottom))] [-webkit-overflow-scrolling:touch]">
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  )
}
