import Countdown from "@/components/countdown"
import { Grid } from "@/components/decorations/grid"
import { Heading } from "@/components/elements/heading"
import JoinCompetition from "@/components/trading-competition/join-competition"
import Participants from "@/components/trading-competition/participants"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn, formatAmount, formatPosition } from "@/lib/utils"
import { trpc } from "@/trpc/server"
import Image from "next/image"

export const dynamic = "force-dynamic"

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const competition = await trpc.getCompetitionById({ id })
  const participants = await trpc.getParticipants({ id })

  return (
    <main className='relative'>
      <div className={cn("md:h-[20rem] h-[10rem] w-full max-w-7xl relative mt-14 mx-auto")}>
        <Image src={competition.image} alt={competition.title} fill className='object-cover ' />
      </div>
      <div className='max-w-7xl w-full mx-auto mt-10 flex flex-col gap-16 mb-10 px-4 md:px-0 '>
        <div className='grid grid-cols-12 gap-4'>
          <div className='flex flex-col gap-2 max-w-4/5 col-span-12 md:col-span-8'>
            <Heading as='h1' size='md' className='text-left max-w-full px-0 ml-0'>
              {competition.title}
            </Heading>
            <p className='text-left '>{competition.description}</p>
            <JoinCompetition competition={competition} />

            <div className='flex items-center gap-4 mt-5'>
              <div className='flex flex-col'>
                <p className='text-xs text-zinc-500'>Prize Pool</p>
                <div className='text-lg md:text-2xl font-bold text-secondary-custom font-barlow'>
                  ${formatAmount(competition.prizeAmount.toString(), 0)}
                </div>
              </div>
              <Countdown endDate={competition.endDate} />
            </div>
          </div>
          <div className='col-span-12 md:col-span-4 flex flex-col gap-2'>
            <CompetitionCurrencyOrigin competition={competition} />
            <CompetitionCurrencyDestination competition={competition} />

            <div className='mt-2 grid grid-cols-3 gap-2'>
              {competition.prizeStructures.map((prizeStructure) => {
                return (
                  <div
                    key={prizeStructure.id}
                    className={cn(
                      "rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700 bg-gradient-to-br from-zinc-400 to-zinc-600 dark:from-zinc-600 dark:to-zinc-800 relative p-2 flex flex-col gap-1",
                      prizeStructure.position === 1 &&
                        "bg-gradient-to-br from-emerald-500 to-emerald-700 border-emerald-400 dark:from-emerald-600 dark:to-emerald-800 dark:border-emerald-500",
                      prizeStructure.position === 2 &&
                        "bg-gradient-to-br from-blue-600 to-blue-800 border-blue-400 dark:from-blue-700 dark:to-blue-900 dark:border-blue-500",
                      prizeStructure.position === 3 &&
                        "bg-gradient-to-br from-yellow-600 to-yellow-800 border-yellow-400 dark:from-yellow-700 dark:to-yellow-900 dark:border-yellow-500"
                    )}
                  >
                    <div className='flex justify-between items-center z-10'>
                      <Badge
                        className={cn(
                          "font-barlow text-white bg-zinc-700 dark:bg-zinc-800",
                          prizeStructure.position === 1 && "bg-emerald-700 dark:bg-emerald-700",
                          prizeStructure.position === 2 && "bg-blue-700 dark:bg-blue-900",
                          prizeStructure.position === 3 && "bg-yellow-700 dark:bg-yellow-900"
                        )}
                      >
                        {formatPosition(prizeStructure.position)}
                      </Badge>
                    </div>
                    <div className='flex justify-center text-xl font-semibold text-white font-barlow z-10'>
                      ${formatAmount(prizeStructure.prizeAmount.toString(), 0)}
                    </div>
                    <Grid
                      size={10}
                      className='absolute inset-0'
                      gridFillClassName={cn(
                        "fill-zinc-500/40 dark:fill-zinc-600/40 stroke-zinc-500 dark:stroke-zinc-600",
                        prizeStructure.position === 1 &&
                          "fill-emerald-500/40 dark:fill-emerald-600/40 stroke-emerald-500 dark:stroke-emerald-600",
                        prizeStructure.position === 2 &&
                          "fill-blue-500/40 dark:fill-blue-600/40 stroke-blue-500 dark:stroke-blue-900",
                        prizeStructure.position === 3 &&
                          "fill-yellow-500/40 dark:fill-yellow-600/40 stroke-yellow-500 dark:stroke-yellow-900"
                      )}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <Participants participants={participants} />
      </div>
    </main>
  )
}

const CompetitionCurrencyOrigin = ({ competition }: { competition: Competition }) => {
  return (
    <div className='flex items-center justify-between gap-2 border border-zinc-200 dark:border-zinc-700 rounded-lg bg-zinc-200 dark:bg-zinc-800 p-2'>
      <div className='flex items-center gap-2'>
        <div className='relative h-8 w-8'>
          <Image
            src={competition.originCurrency.currencyLogoUri}
            alt={competition.originCurrency.currencyName}
            fill
            className='rounded-full'
          />
          <div className='absolute -bottom-1 right-0'>
            <Image
              src={competition.originChain.chainLogoUri}
              alt={competition.originChain.chainName}
              width={20}
              height={20}
              className='rounded-full'
            />
          </div>
        </div>
        <div className='flex flex-col'>
          <p className='text-sm'>{competition.originCurrency.currencyName}</p>
          <p className='text-xs text-zinc-500 capitalize'>{competition.originChain.chainName}</p>
        </div>
      </div>
      <Button variant='secondary' size='sm'>
        Bridge
      </Button>
    </div>
  )
}
const CompetitionCurrencyDestination = ({ competition }: { competition: Competition }) => {
  return (
    <div className='flex items-center justify-between gap-2 border border-zinc-200 dark:border-zinc-700 rounded-lg bg-zinc-200 dark:bg-zinc-800 p-2'>
      <div className='flex items-center gap-2'>
        <div className='relative h-8 w-8'>
          <Image
            src={competition.destinationCurrency.currencyLogoUri}
            alt={competition.destinationCurrency.currencyName}
            fill
            className='rounded-full'
          />
          <div className='absolute -bottom-1 right-0'>
            <Image
              src={competition.destinationChain.chainLogoUri}
              alt={competition.destinationChain.chainName}
              width={20}
              height={20}
              className='rounded-full'
            />
          </div>
        </div>
        <div className='flex flex-col'>
          <p className='text-sm'>{competition.destinationCurrency.currencyName}</p>
          <p className='text-xs text-zinc-500 capitalize'>
            {competition.destinationChain.chainName}
          </p>
        </div>
      </div>
      <Button variant='secondary' size='sm'>
        Bridge
      </Button>
    </div>
  )
}
