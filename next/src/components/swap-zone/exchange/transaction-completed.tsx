import { Heading } from "@/components/elements/heading"
import { Subheading } from "@/components/elements/sub_heading"
import Symbol from "@/components/elements/symbol"
import { Button } from "@/components/ui/button"
import { useExchange } from "@/context/exchange-context"
import { APP_NAME } from "@/lib/shared/constants"
import { appendUrlToTxHash, formatDate } from "@/lib/utils"
import { trpc } from "@/trpc/client"
import { motion } from "motion/react"
import { FiCheckCircle } from "react-icons/fi"
import { HiOutlineArrowNarrowRight } from "react-icons/hi"
import TokenLogo from "../token-logo"

const TransactionComplete = () => {
  const { exchangeTransactionStatus } = useExchange()

  const { data: sendTokenInfo } = trpc.getTokenInfo.useQuery(
    {
      ticker: exchangeTransactionStatus.fromLegacyTicker,
    },
    {
      enabled: !!exchangeTransactionStatus.fromLegacyTicker,
    }
  )

  const { data: receiveTokenInfo } = trpc.getTokenInfo.useQuery(
    {
      ticker: exchangeTransactionStatus.toLegacyTicker,
    },
    {
      enabled: !!exchangeTransactionStatus.toLegacyTicker,
    }
  )

  return (
    <div className='relative'>
      <div className='flex flex-col gap-4 '>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className='h-16 w-16 rounded-full mx-auto bg-gradient-to-b from-emerald-50 to-emerald-100 dark:from-emerald-900 dark:to-emerald-950 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center'
        >
          <FiCheckCircle className='text-4xl text-emerald-600 dark:text-emerald-400' />
        </motion.div>
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

        <div className='flex flex-col gap-5'>
          <div className='grid grid-cols-12 items-center gap-4 border-t border-dashed border-zinc-300 dark:border-zinc-700 pt-5'>
            <div className='col-span-5 flex items-center justify-center'>
              <div className='flex items-center gap-2'>
                {sendTokenInfo?.image && (
                  <TokenLogo src={sendTokenInfo?.image} alt={sendTokenInfo?.ticker} />
                )}
                <div className='flex items-center gap-1 text-sm'>
                  <Symbol symbol={exchangeTransactionStatus.fromCurrency} />
                  <p className='text-zinc-700 dark:text-zinc-400'>
                    {exchangeTransactionStatus.amountFrom}
                  </p>
                </div>
              </div>
            </div>
            <div className='col-span-2 flex items-center justify-center'>
              <HiOutlineArrowNarrowRight className='text-zinc-500 text-2xl' />
            </div>
            <div className='col-span-5 flex items-center justify-center'>
              <div className='flex items-center gap-2'>
                {receiveTokenInfo?.image && (
                  <TokenLogo src={receiveTokenInfo?.image} alt={receiveTokenInfo?.ticker} />
                )}
                <div className='flex items-center gap-1 text-sm'>
                  <Symbol symbol={exchangeTransactionStatus.toCurrency} />
                  <p className='text-zinc-700 dark:text-zinc-400'>
                    {exchangeTransactionStatus.expectedAmountTo}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Button className='w-fit mx-auto bg-secondary-custom text-white hover:bg-secondary-custom/80 transition-all duration-200'>
            Leave us a review
          </Button>
        </div>
      </div>

      {/* transaction details */}
      <div className='flex flex-col gap-5 mt-10 bg-zinc-100 dark:bg-neutral-950 p-5 rounded-lg border border-zinc-200 dark:border-zinc-800'>
        <Heading
          as='h2'
          className='text-left w-full text-sm md:text-base lg:text-lg font-medium text-zinc-900 dark:text-zinc-100 border-b border-zinc-200 dark:border-zinc-800 pb-2'
        >
          Transaction Details
        </Heading>
        <div className='flex flex-col gap-10'>
          <TransactionInfo
            subheading='Exchange order details'
            details={[
              {
                label: "Transaction ID",
                value: {
                  text: <TransactionText text={exchangeTransactionStatus.id} />,
                },
              },
              {
                label: "Created at",
                value: {
                  text: <TransactionText text={formatDate(exchangeTransactionStatus.createdAt)} />,
                },
              },
            ]}
          />
          <TransactionInfo
            subheading='Input transaction details'
            details={[
              {
                label: "Tx Hash",
                value: {
                  text: (
                    <TransactionHash
                      hash={
                        sendTokenInfo?.transactionExplorerMask &&
                        exchangeTransactionStatus.payinHash
                          ? appendUrlToTxHash(
                              sendTokenInfo?.transactionExplorerMask,
                              exchangeTransactionStatus.payinHash
                            )
                          : ""
                      }
                      text={exchangeTransactionStatus.payinHash || ""}
                    />
                  ),
                },
              },
              {
                label: "Sent amount",
                value: {
                  text: (
                    <TransactionAmount
                      amount={exchangeTransactionStatus.amountFrom || 0}
                      currency={exchangeTransactionStatus.fromCurrency}
                      network={exchangeTransactionStatus.fromNetwork}
                    />
                  ),
                },
              },
              {
                label: "Received at",
                value: {
                  text: (
                    <TransactionText
                      text={formatDate(exchangeTransactionStatus.depositReceivedAt || "")}
                    />
                  ),
                },
              },
            ]}
          />
          <TransactionInfo
            subheading='Output transaction details'
            details={[
              {
                label: "Tx Hash",
                value: {
                  text: (
                    <TransactionHash
                      hash={
                        receiveTokenInfo?.transactionExplorerMask &&
                        exchangeTransactionStatus.payoutHash
                          ? appendUrlToTxHash(
                              receiveTokenInfo?.transactionExplorerMask,
                              exchangeTransactionStatus.payoutHash
                            )
                          : ""
                      }
                      text={exchangeTransactionStatus.payoutHash || ""}
                    />
                  ),
                },
              },
              {
                label: "Your address",
                value: {
                  text: (
                    <TransactionHash
                      hash={
                        receiveTokenInfo?.addressExplorerMask &&
                        exchangeTransactionStatus.payoutAddress
                          ? appendUrlToTxHash(
                              receiveTokenInfo?.addressExplorerMask,
                              exchangeTransactionStatus.payoutAddress
                            )
                          : ""
                      }
                      text={exchangeTransactionStatus.payoutAddress || ""}
                    />
                  ),
                },
              },
              {
                label: "Amount",
                value: {
                  text: (
                    <TransactionAmount
                      amount={exchangeTransactionStatus.amountTo || 0}
                      currency={exchangeTransactionStatus.toCurrency}
                      network={exchangeTransactionStatus.toNetwork}
                    />
                  ),
                },
              },
            ]}
          />
        </div>
      </div>
    </div>
  )
}

export default TransactionComplete

const TransactionInfo = ({
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
      <div className='flex flex-col gap-1'>
        {details.map((detail) => (
          <div key={detail.label} className='grid grid-cols-12 items-start gap-2'>
            <p className='text-xs text-zinc-600 dark:text-zinc-400 font-medium col-span-4'>
              {detail.label}
            </p>
            <div className='col-span-8'>
              {/* {detail.value.isUrl ? (
                <a
                  href={detail.value.text}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-xs font-medium text-secondary-custom hover:text-secondary-custom/80 transition-all duration-200 break-words'
                >
                  {detail.value.text}
                </a>
              ) : (
                <p className='text-xs text-zinc-900 font-medium break-words'>{detail.value.text}</p>
              )} */}
              {detail.value.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const TransactionHash = ({ hash, text }: { hash: string; text?: string }) => {
  return (
    <a
      href={hash}
      target='_blank'
      rel='noopener noreferrer'
      className='text-xs text-secondary-custom hover:underline font-medium break-words'
    >
      {text || hash}
    </a>
  )
}

const TransactionAmount = ({
  amount,
  currency,
  network,
}: {
  amount: number
  currency: string
  network: string
}) => {
  return (
    <div className='flex items-center gap-1'>
      <p className='text-xs text-zinc-900 dark:text-zinc-100 font-medium break-words'>
        {amount || 0}
      </p>
      <Symbol className='text-xs' symbol={currency} />
      <span className='text-xs text-zinc-500 dark:text-zinc-400 font-medium break-words uppercase'>
        ({network})
      </span>
    </div>
  )
}

const TransactionText = ({ text }: { text: string }) => {
  return <p className='text-xs text-zinc-900 dark:text-zinc-100 font-medium break-words'>{text}</p>
}
