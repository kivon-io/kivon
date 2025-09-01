import { Heading } from "@/components/elements/heading"
import Section from "@/components/section"
import TransactionsTable from "@/components/transactions"
import { trpc } from "@/trpc/server"

export default async function TransactionsPage() {
  const transactions = await trpc.getTransactions()

  return (
    <Section className='max-w-7xl mx-auto py-20'>
      <Heading className='text-left text-2xl md:text-xl w-fit ml-0 mb-5'>Transactions</Heading>

      <TransactionsTable transactions={transactions} />
    </Section>
  )
}
