"use client"

import { useRegisterUserOnConnect } from "@/hooks/use-register-user-on-connect"

export function ClientRegisterUser() {
  useRegisterUserOnConnect()
  return null
}
