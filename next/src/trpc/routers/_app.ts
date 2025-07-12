import publicProcedure from "../procedures/public"
import { createTRPCRouter, mergeRouters } from "../trpc"

export const helloRouter = createTRPCRouter({
  sayHello: publicProcedure.query(() => {
    return { greeting: `Hello World!` }
  }),
})

export const appRouter = mergeRouters(helloRouter)

export type AppRouter = typeof appRouter
