"use client"
import { APP_NAME, TRANSACTION_TYPE } from "@/lib/shared/constants"
import { cn, formatDate, formatSmartBalance } from "@/lib/utils"
import { Check, Copy } from "lucide-react"
import { motion } from "motion/react"
import Link from "next/link"
import { useState } from "react"
import { FiCheckCircle } from "react-icons/fi"
import { BlurImage } from "../blur-image"
import { Grid } from "../decorations/grid"
import { Heading } from "../elements/heading"
import { Subheading } from "../elements/sub_heading"
import Symbol from "../elements/symbol"
import { Button } from "../ui/button"

export const TransactionDetailsHeader = () => {
  return (
    <div className='flex flex-col gap-4'>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className='h-16 w-16 rounded-full mx-auto bg-gradient-to-b from-emerald-50 to-emerald-100 dark:from-emerald-900 dark:to-emerald-950 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center'
      >
        <FiCheckCircle className='text-4xl text-emerald-600 dark:text-emerald-400' />
      </motion.div>
      <div className='flex flex-col items-center justify-center'>
        <div className='flex flex-col items-center justify-center'>
          <Heading
            as='h1'
            className='text-sm md:text-lg lg:text-xl font-medium text-emerald-600 dark:text-emerald-400'
          >
            Transaction Completed
          </Heading>
          <Subheading
            as='p'
            className='text-xs md:text-sm lg:text-sm text-zinc-700 dark:text-zinc-400'
          >
            Your transaction has been completed successfully. Thank you for using {APP_NAME}
          </Subheading>
        </div>

        <Button variant='tertiary'>
          <Link href={process.env.NEXT_PUBLIC_REVIEW_LINK!} target='_blank'>
            Leave us a review
          </Link>
        </Button>
      </div>
    </div>
  )
}

export const StatsCard = ({ title, value }: { title: string; value: string }) => {
  return (
    <div className='flex flex-col gap-1 border border-zinc-200 dark:border-zinc-800 rounded-lg p-5 relative overflow-hidden h-32 bg-white dark:bg-zinc-900'>
      <div className='relative z-10 h-full'>
        <p className='text-xs text-zinc-600 dark:text-zinc-400 font-medium'>{title}</p>
        <p className='text-2xl md:text-4xl font-barlow text-zinc-900 dark:text-zinc-100 font-bold mt-1'>
          {value}
        </p>
      </div>
      <Grid size={20} className='absolute -top-5 right-0' />
    </div>
  )
}

export const TransactionDetailsContent = ({ transaction }: { transaction: Transaction }) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-5 max-w-4xl mx-auto mt-10'>
      <div className='relative flex flex-col gap-4 p-5 bg-zinc-50 dark:bg-neutral-900 rounded-lg border border-zinc-200 dark:border-zinc-800'>
        <div className='flex items-center gap-2 border-b border-dashed border-zinc-200 dark:border-zinc-800 pb-2'>
          <div className='relative flex items-center gap-2'>
            {transaction.from_currency.currency_logo_uri && (
              <BlurImage
                src={transaction.from_currency.currency_logo_uri}
                alt={transaction.from_currency.currency_name}
                className={cn(
                  "object-contain object-center w-8 h-8 shrink-0",
                  transaction.transaction_type === TRANSACTION_TYPE.BRIDGE && "rounded-full"
                )}
                width={32}
                height={32}
              />
            )}
            {transaction.from_currency.chain_logo_uri &&
              transaction.transaction_type === TRANSACTION_TYPE.BRIDGE && (
                <div className='absolute -bottom-1 -right-1 bg-white dark:bg-neutral-950 border border-zinc-200 dark:border-zinc-700 rounded-full'>
                  <BlurImage
                    src={transaction.from_currency.chain_logo_uri}
                    alt={transaction.from_currency.chain_name}
                    className='object-cover object-center w-4 h-4 rounded-full'
                    width={16}
                    height={16}
                  />
                </div>
              )}
          </div>
          <div className='flex flex-col'>
            <p className='text-sm font-medium text-zinc-900 dark:text-zinc-100'>
              {formatSmartBalance(transaction.from_currency.amount_formatted)}{" "}
              {transaction.from_currency.currency_symbol}
            </p>
            <AmountUsd amount={transaction.from_currency.amount_usd} />
          </div>
        </div>
        <div className='grid grid-cols-12 items-center gap-2'>
          <p className='text-xs text-zinc-600 dark:text-zinc-400 font-medium col-span-4'>
            Currency
          </p>
          <div className='flex items-center gap-2 col-span-8'>
            {transaction.from_currency.currency_logo_uri && (
              <BlurImage
                src={transaction.from_currency.currency_logo_uri}
                alt={transaction.from_currency.currency_name}
                className={cn(
                  "object-contain object-center w-6 h-6 shrink-0",
                  transaction.transaction_type === TRANSACTION_TYPE.BRIDGE && "rounded-full"
                )}
                width={16}
                height={16}
              />
            )}
            <p className='capitalize text-sm text-zinc-900 dark:text-zinc-100 font-medium break-words'>
              {transaction.from_currency.currency_name}
            </p>
          </div>
        </div>
        <div className='grid grid-cols-12 items-center gap-2'>
          <p className='text-xs text-zinc-600 dark:text-zinc-400 font-medium col-span-4'>Chain</p>
          <div className='flex items-center gap-2 col-span-8'>
            {transaction.from_currency.chain_logo_uri && (
              <BlurImage
                src={transaction.from_currency.chain_logo_uri}
                alt={transaction.from_currency.chain_name}
                className='object-contain object-center w-6 h-6 rounded-full shrink-0'
                width={16}
                height={16}
              />
            )}
            <p className='capitalize text-sm text-zinc-900 dark:text-zinc-100 font-medium break-words'>
              {transaction.from_currency.chain_name}
            </p>
          </div>
        </div>
        <div className='relative flex flex-col gap-10'>
          <Info
            subheading=''
            details={[
              {
                label: "Transaction Hash",
                value: {
                  text: (
                    <Hash
                      hash={transaction.input_hash_explorer_url || ""}
                      text={transaction.input_tx_hash || ""}
                    />
                  ),
                },
              },
              {
                label: "From Amount",
                value: {
                  text: (
                    <Amount
                      amount={Number(transaction.from_currency.amount_formatted) || 0}
                      currency={transaction.from_currency.currency_symbol}
                    />
                  ),
                },
              },
              {
                label: "Timestamp",
                value: {
                  text: <Text text={formatDate(transaction.completed_at || "")} />,
                },
              },
            ]}
          />
        </div>
      </div>
      <div className='relative flex flex-col gap-4 p-5 bg-zinc-50 dark:bg-neutral-900 rounded-lg border border-zinc-200 dark:border-zinc-800'>
        <div className='flex items-center gap-2 border-b border-dashed border-zinc-200 dark:border-zinc-800 pb-2'>
          <div className='relative flex items-center gap-2'>
            {transaction.to_currency.currency_logo_uri && (
              <BlurImage
                src={transaction.to_currency.currency_logo_uri}
                alt={transaction.to_currency.currency_name}
                className={cn(
                  "object-contain object-center w-8 h-8 shrink-0",
                  transaction.transaction_type === TRANSACTION_TYPE.BRIDGE && "rounded-full"
                )}
                width={32}
                height={32}
              />
            )}
            {transaction.to_currency.chain_logo_uri &&
              transaction.transaction_type === TRANSACTION_TYPE.BRIDGE && (
                <div className='absolute -bottom-1 -right-1 bg-white dark:bg-neutral-950 border border-zinc-200 dark:border-zinc-700 rounded-full'>
                  <BlurImage
                    src={transaction.to_currency.chain_logo_uri}
                    alt={transaction.to_currency.chain_name}
                    className='object-cover object-center w-4 h-4 rounded-full'
                    width={16}
                    height={16}
                  />
                </div>
              )}
          </div>
          <div className='flex flex-col'>
            <p className='text-sm font-medium text-zinc-900 dark:text-zinc-100'>
              {formatSmartBalance(transaction.from_currency.amount_formatted)}{" "}
              {transaction.to_currency.currency_symbol}
            </p>
            <AmountUsd amount={transaction.to_currency.amount_usd} />
          </div>
        </div>
        <div className='grid grid-cols-12 items-center gap-2'>
          <p className='text-xs text-zinc-600 dark:text-zinc-400 font-medium col-span-4'>
            Currency
          </p>
          <div className='flex items-center gap-2 col-span-8'>
            {transaction.to_currency.currency_logo_uri && (
              <BlurImage
                src={transaction.to_currency.currency_logo_uri}
                alt={transaction.to_currency.currency_name}
                className={cn(
                  "object-contain object-center w-6 h-6 shrink-0",
                  transaction.transaction_type === TRANSACTION_TYPE.BRIDGE && "rounded-full"
                )}
                width={16}
                height={16}
              />
            )}
            <p className='capitalize text-sm text-zinc-900 dark:text-zinc-100 font-medium break-words'>
              {transaction.to_currency.currency_name}
            </p>
          </div>
        </div>
        <div className='grid grid-cols-12 items-center gap-2'>
          <p className='text-xs text-zinc-600 dark:text-zinc-400 font-medium col-span-4'>Chain</p>
          <div className='flex items-center gap-2 col-span-8'>
            {transaction.to_currency.chain_logo_uri && (
              <BlurImage
                src={transaction.to_currency.chain_logo_uri}
                alt={transaction.to_currency.chain_name}
                className='object-contain object-center w-6 h-6 rounded-full shrink-0'
                width={16}
                height={16}
              />
            )}
            <p className='capitalize text-sm text-zinc-900 dark:text-zinc-100 font-medium break-words'>
              {transaction.to_currency.chain_name}
            </p>
          </div>
        </div>
        <div className='relative flex flex-col gap-10'>
          <Info
            subheading=''
            details={[
              {
                label: "Transaction Hash",
                value: {
                  text: (
                    <Hash
                      hash={
                        transaction.output_tx_hash
                          ? transaction.output_hash_explorer_url || ""
                          : "-"
                      }
                      text={transaction.output_tx_hash || "-"}
                    />
                  ),
                },
              },
              {
                label: "To Amount",
                value: {
                  text: (
                    <Amount
                      amount={Number(transaction.to_currency.amount_formatted) || 0}
                      currency={transaction.to_currency.currency_symbol}
                    />
                  ),
                },
              },
              {
                label: "Timestamp",
                value: {
                  text: <Text text={formatDate(transaction.completed_at || "")} />,
                },
              },
            ]}
          />
        </div>
      </div>
    </div>
  )
}

const Info = ({
  subheading,
  details,
}: {
  subheading: string
  details: {
    label: string
    value: {
      text: React.ReactNode
      isUrl?: boolean
    }
  }[]
}) => {
  return (
    <div className='flex flex-col gap-5'>
      <p className='text-sm text-zinc-500 dark:text-zinc-400'>{subheading}</p>
      <div className='flex flex-col gap-5'>
        {details.map((detail) => (
          <div key={detail.label} className='grid grid-cols-12 items-start gap-2'>
            <p className='text-xs text-zinc-600 dark:text-zinc-400 font-medium col-span-4'>
              {detail.label}
            </p>
            <div className='col-span-8'>{detail.value.text}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

const Hash = ({ hash, text }: { hash: string; text?: string }) => {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopyHash = () => {
    navigator.clipboard.writeText(text || hash)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }
  return (
    <div className='flex flex-col gap-1 relative w-fit break-words max-w-full'>
      <a
        href={hash}
        target='_blank'
        rel='noopener noreferrer'
        className='text-sm text-secondary-custom hover:underline font-medium break-words w-fit max-w-full'
      >
        {text || hash}
      </a>
      <Button size='icon' variant='ghost' onClick={handleCopyHash}>
        {isCopied ? <Check /> : <Copy />}
      </Button>
    </div>
  )
}

const Amount = ({ amount, currency }: { amount: number; currency: string }) => {
  return (
    <div className='flex items-center gap-1'>
      <p className='text-sm text-zinc-900 dark:text-zinc-100 font-medium break-words'>
        {amount || 0}
      </p>
      <Symbol className='text-xs' symbol={currency} />
    </div>
  )
}

const Text = ({ text }: { text: string }) => {
  return <p className='text-xs text-zinc-900 dark:text-zinc-100 font-medium break-words'>{text}</p>
}

const AmountUsd = ({ amount }: { amount: string }) => {
  if (Number(amount) === 0) return null
  return <p className='text-xs text-zinc-500 dark:text-zinc-400'>{amount} USD</p>
}
