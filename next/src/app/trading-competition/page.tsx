import Competitions from "@/components/trading-competition/competitions"
import CompetitionHero from "@/components/trading-competition/hero"
import { trpc } from "@/trpc/server"

export const dynamic = "force-dynamic"

export default async function TradingCompetition() {
  const competitions = await trpc.getCompetitions()

  return (
    <main className='relative'>
      <CompetitionHero />
      <Competitions competitions={competitions} />
    </main>
  )
}
