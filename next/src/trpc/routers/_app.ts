import { mergeRouters } from "../trpc"
import { swapRouter } from "./swap"
import { validateAddressRouter } from "./validate-address"

export const appRouter = mergeRouters(swapRouter, validateAddressRouter)

export type AppRouter = typeof appRouter
