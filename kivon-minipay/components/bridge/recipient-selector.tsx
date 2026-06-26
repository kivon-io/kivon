"use client"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { useBridge } from "@/context/bridge-context"
import { useEffectiveRecipient } from "@/hooks/use-effective-recipient"
import { useHasMounted } from "@/hooks/use-has-mounted"
import { useWallet } from "@/hooks/use-wallet"
import { truncateAddress } from "@/lib/bridge/format"
import { useEffect, useState } from "react"
import { isAddress } from "viem"

export function RecipientSelector() {
  const { destination, recipient, setRecipient } = useBridge()
  const { address } = useWallet()
  const effectiveRecipient = useEffectiveRecipient()
  const mounted = useHasMounted()
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState("")
  const [error, setError] = useState<string | null>(null)

  const isOwnWallet =
    mounted &&
    Boolean(address) &&
    effectiveRecipient.toLowerCase() === address?.toLowerCase()

  const walletLabel = !mounted
    ? "Custom wallet"
    : isOwnWallet
      ? "My wallet"
      : "Custom wallet"

  const addressLabel = !mounted
    ? "Connect wallet"
    : effectiveRecipient
      ? truncateAddress(effectiveRecipient)
      : "Connect wallet"

  useEffect(() => {
    if (open) {
      setDraft(effectiveRecipient)
      setError(null)
    }
  }, [open, effectiveRecipient])

  if (!destination) return null

  const handleSave = () => {
    const trimmed = draft.trim()
    if (!isAddress(trimmed)) {
      setError("Enter a valid wallet address")
      return
    }

    if (address && trimmed.toLowerCase() === address.toLowerCase()) {
      setRecipient(null)
    } else {
      setRecipient(trimmed)
    }

    setOpen(false)
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          Recipient on {destination.chainDisplayName}
        </p>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex w-full items-center gap-3 rounded-2xl border border-border bg-card px-2 py-1.5 text-left transition-colors hover:bg-muted/40"
        >
          <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-kivon-600 text-xs font-semibold text-white">
            0x
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-foreground">{walletLabel}</p>
            <p className="truncate text-xs text-muted-foreground">
              {addressLabel}
            </p>
          </div>

          <span className="shrink-0 text-xs font-medium text-kivon-600">
            Edit
          </span>
        </button>
      </div>

      <Drawer open={open} onOpenChange={setOpen}>
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

            <Input
              value={draft}
              onChange={(event) => {
                setDraft(event.target.value)
                setError(null)
              }}
              placeholder="0x..."
              className="h-11 rounded-xl font-mono"
              autoComplete="off"
              spellCheck={false}
            />

            {error ? (
              <p className="text-center text-sm text-destructive">{error}</p>
            ) : null}

            <div className="flex flex-col gap-2">
              <Button
                type="button"
                className="h-11 w-full rounded-full"
                onClick={handleSave}
                disabled={!draft.trim()}
              >
                Save
              </Button>
              {address ? (
                <Button
                  type="button"
                  variant="outline"
                  className="h-11 w-full rounded-full"
                  onClick={() => {
                    setRecipient(null)
                    setOpen(false)
                  }}
                >
                  Use my wallet
                </Button>
              ) : null}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  )
}
