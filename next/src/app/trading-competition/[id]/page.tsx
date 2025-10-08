import { Heading } from "@/components/elements/heading"
import JoinCompetition from "@/components/trading-competition/join-competition"
import Participants from "@/components/trading-competition/participants"
import { Button } from "@/components/ui/button"
import { cn, formatAmount } from "@/lib/utils"
import { trpc } from "@/trpc/server"
import Image from "next/image"

export const dynamic = "force-dynamic"

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const competition = await trpc.getCompetitionById({ id })
  const participants = await trpc.getParticipants({ id })

  return (
    <main className='relative'>
      <div className={cn("h-[20rem] w-full relative")}>
        <Image src={competition.image} alt={competition.title} fill className='object-cover ' />
      </div>
      <div className='max-w-7xl w-full mx-auto mt-10 flex flex-col gap-16 mb-10 px-4 md:px-0 '>
        <div className='grid grid-cols-12 gap-4'>
          <div className='flex flex-col gap-2 max-w-4/5 col-span-12 md:col-span-8'>
            <Heading as='h1' size='md' className='text-left max-w-full px-0 ml-0'>
              {competition.title}
            </Heading>
            <p className='text-left '>{competition.description}</p>
            <div className='flex items-center gap-4 mt-5'>
              <JoinCompetition competition={competition} />
              <div className='flex flex-col'>
                <p className='text-xs text-zinc-500'>Prize Amount</p>
                <div className='text-lg md:text-2xl font-bold text-secondary-custom font-mono'>
                  ${formatAmount(competition.prizeAmount.toString())}
                </div>
              </div>
            </div>
          </div>
          <div className='col-span-12 md:col-span-4 flex flex-col gap-4'>
            <CompetitionCurrencyOrigin competition={competition} />
            <CompetitionCurrencyDestination competition={competition} />
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
