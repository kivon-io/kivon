"use client"

import { CheckIcon, CopyIcon } from "lucide-react"
import { useState } from "react"
import { isAddress } from "viem"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from "@/components/ui/drawer"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { useBridge } from "@/context/bridge-context"
import { useHasMounted } from "@/hooks/use-has-mounted"
import { useWallet } from "@/hooks/use-wallet"
import { truncateAddress } from "@/lib/bridge/format"

export function RecipientSelector() {
  const { destination, recipient, setRecipient } = useBridge()
  const { address } = useWallet()
  const mounted = useHasMounted()
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const hasRecipient = Boolean(recipient)
  const isOwnWallet =
    mounted &&
    Boolean(address) &&
    Boolean(recipient) &&
    recipient!.toLowerCase() === address!.toLowerCase()

  const walletLabel = !hasRecipient
    ? "Recipient required"
    : isOwnWallet
      ? "My wallet"
      : "Custom wallet"

  const addressLabel = !mounted
    ? "Add recipient address"
    : hasRecipient
      ? truncateAddress(recipient!)
      : "Add recipient address"

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      setDraft(recipient ?? "")
      setError(null)
      setCopied(false)
    }
    setOpen(nextOpen)
  }

  if (!destination) return null

  const handleSave = () => {
    const trimmed = draft.trim()
    if (!isAddress(trimmed)) {
      setError("Enter a valid wallet address")
      return
    }

    setRecipient(trimmed)
    setOpen(false)
  }

  const handleUseInternalAddress = () => {
    if (!address) return
    setDraft(address)
    setError(null)
  }

  const handleCopy = async () => {
    const value = draft.trim()
    if (!value) return

    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setError("Could not copy address")
    }
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          Recipient on {destination.chainDisplayName}
        </p>

        <button
          type="button"
          onClick={() => handleOpenChange(true)}
          className="flex w-full items-center gap-3 rounded-2xl border border-border bg-card px-2 py-1.5 text-left transition-colors hover:bg-muted/40"
        >
          <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-kivon-600 text-xs font-semibold text-white">
            0x
          </div>

          <div className="min-w-0 flex-1">
            <p
              className={
                hasRecipient
                  ? "text-xs font-semibold text-foreground"
                  : "text-xs font-semibold text-muted-foreground"
              }
            >
              {walletLabel}
            </p>
            <p
              className={
                hasRecipient
                  ? "truncate text-xs text-muted-foreground"
                  : "truncate text-xs text-muted-foreground/80"
              }
            >
              {addressLabel}
            </p>
          </div>

          <span className="shrink-0 text-xs font-medium text-kivon-600">
            {hasRecipient ? "Edit" : "Add"}
          </span>
        </button>
      </div>

      <Drawer open={open} onOpenChange={handleOpenChange}>
        <DrawerContent className="flex flex-col overflow-hidden bg-background">
          <div className="flex flex-col gap-4 px-4 pt-2 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
            <DrawerTitle className="text-center text-base font-semibold">
              Recipient address
            </DrawerTitle>
            <DrawerDescription className="sr-only">
              Edit the destination wallet address for this bridge
            </DrawerDescription>

            <p className="text-center text-sm text-muted-foreground">
              Funds will be sent to this address on{" "}
              {destination.chainDisplayName}.
            </p>

            <div className="flex flex-col gap-2">
              {address ? (
                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 text-xs text-muted-foreground"
                    onClick={handleUseInternalAddress}
                  >
                    Use internal address
                  </Button>
                </div>
              ) : null}

              <InputGroup className="h-11 rounded-xl">
                <InputGroupInput
                  value={draft}
                  onChange={(event) => {
                    setDraft(event.target.value)
                    setError(null)
                    setCopied(false)
                  }}
                  placeholder="0x..."
                  className="font-mono"
                  autoComplete="off"
                  spellCheck={false}
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton
                    size="icon-xs"
                    aria-label={copied ? "Copied" : "Copy address"}
                    disabled={!draft.trim()}
                    onClick={handleCopy}
                  >
                    {copied ? (
                      <CheckIcon className="size-3.5 text-emerald-500" />
                    ) : (
                      <CopyIcon className="size-3.5" />
                    )}
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </div>

            {error ? (
              <p className="text-center text-sm text-destructive">{error}</p>
            ) : null}

            <Button
              type="button"
              className="h-11 w-full rounded-full"
              onClick={handleSave}
              disabled={!draft.trim()}
            >
              Save
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  )
}
