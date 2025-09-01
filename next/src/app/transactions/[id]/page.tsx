import Section from "@/components/section"
import {
  TransactionDetailsContent,
  TransactionDetailsHeader,
} from "@/components/transactions/details"
import { trpc } from "@/trpc/server"

export default async function TransactionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const transaction = await trpc.getTransactionById({ id })

  return (
    <Section className='max-w-7xl mx-auto py-20'>
      <div className='relative bg-white dark:bg-neutral-950 rounded-lg border border-zinc-200 dark:border-zinc-800 p-5'>
        <TransactionDetailsHeader />
        <TransactionDetailsContent transaction={transaction} />
      </div>
    </Section>
  )
}
