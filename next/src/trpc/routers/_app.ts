import publicProcedure from "../procedures/public"
import { createTRPCRouter, mergeRouters } from "../trpc"
import { swapRouter } from "./swap"

export const helloRouter = createTRPCRouter({
  sayHello: publicProcedure.query(() => {
    return { greeting: `Hello World!` }
  }),
})

export const appRouter = mergeRouters(helloRouter, swapRouter)

export type AppRouter = typeof appRouter
