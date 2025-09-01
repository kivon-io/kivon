"use client"

import { useDynamicWallet } from "@/lib/wallet/use-dynamic-wallet"
import { trpc } from "@/trpc/client"
import { useEffect, useRef } from "react"
import { useSignMessage } from "wagmi"

const SIGNED_KEY_PREFIX = "kivon:signed:v1:"
const SIGN_MESSAGE =
  "Kivon: Verify you own this wallet address.\nThis is a one-time, non-custodial signature."

export function useRegisterUserOnConnect() {
  const { address, isConnected, primaryWallet } = useDynamicWallet()
  const { mutateAsync: createUser } = trpc.createUser.useMutation() as unknown as {
    mutateAsync: (input: { address: string }) => Promise<unknown>
  }
  const { signMessageAsync } = useSignMessage()
  const inFlightRef = useRef(false)

  useEffect(() => {
    if (!isConnected || !address) return
    const key = `${SIGNED_KEY_PREFIX}${address.toLowerCase()}`

    if (typeof window !== "undefined" && localStorage.getItem(key)) return

    if (inFlightRef.current) return
    inFlightRef.current = true
    ;(async () => {
      try {
        let signature: string | undefined
        const dyn = primaryWallet
        if (dyn?.signMessage) {
          signature = await dyn.signMessage(SIGN_MESSAGE)
        } else {
          signature = await signMessageAsync({
            account: address as `0x${string}`,
            message: SIGN_MESSAGE,
          })
        }

        if (!signature) return

        if (typeof window !== "undefined") {
          localStorage.setItem(key, "1")
        }

        await createUser({ address })
      } catch (err) {
        console.error("register user/sign failed:", err)
      } finally {
        inFlightRef.current = false
      }
    })()
  }, [address, isConnected, createUser, signMessageAsync, primaryWallet])
}
