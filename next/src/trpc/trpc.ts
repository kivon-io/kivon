import { initTRPC } from "@trpc/server"
import { cache } from "react"

const t = initTRPC.create()

export const createTRPCContext = cache(async () => {})

export const middleware = t.middleware
export const createCallerFactory = t.createCallerFactory
export const mergeRouters = t.mergeRouters

export const procedure = t.procedure
export const router = t.router
export const createTRPCRouter = t.router
