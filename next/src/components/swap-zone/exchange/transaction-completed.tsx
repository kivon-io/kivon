import { Heading } from "@/components/elements/heading"
import { Subheading } from "@/components/elements/sub_heading"
import Symbol from "@/components/elements/symbol"
import { Button } from "@/components/ui/button"
import { useExchange } from "@/context/exchange-context"
import { APP_NAME } from "@/lib/shared/constants"
import { formatDate } from "@/lib/utils"
import { motion } from "motion/react"
import { FiCheckCircle } from "react-icons/fi"
import { HiOutlineArrowNarrowRight } from "react-icons/hi"

const TransactionComplete = () => {
  const { exchangeTransactionStatus } = useExchange()

  console.log("EXCHANGE TRANSACTION STATUS: ", exchangeTransactionStatus)

  return (
    <div className='relative'>
      <div className='flex flex-col gap-4 '>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className='h-16 w-16 rounded-full mx-auto bg-gradient-to-b from-emerald-50 to-emerald-100 border border-emerald-200 flex items-center justify-center'
        >
          <FiCheckCircle className='text-4xl text-emerald-600' />
        </motion.div>
        <div className='flex flex-col items-center justify-center'>
          <Heading as='h1' className='text-sm md:text-lg lg:text-xl font-medium text-emerald-600'>
            Transaction Completed
          </Heading>
          <Subheading as='p' className='text-xs md:text-sm lg:text-sm text-zinc-700'>
            Your transaction has been completed successfully. Thank you for using {APP_NAME}
          </Subheading>
        </div>

        <div className='flex flex-col gap-5'>
          <div className='grid grid-cols-12 items-center gap-4 border-t border-dashed border-zinc-300  pt-5'>
            <div className='col-span-5 flex items-center justify-center'>
              <div className='flex items-center gap-2'>
                <div className='h-8 w-8 md:h-10 md:w-10 rounded-full bg-zinc-500'></div>
                <div className='flex items-center gap-1 text-sm'>
                  <Symbol symbol={exchangeTransactionStatus.fromCurrency} />
                  <p className='text-zinc-700'>{exchangeTransactionStatus.expectedAmountFrom}</p>
                </div>
              </div>
            </div>
            <div className='col-span-2 flex items-center justify-center'>
              <HiOutlineArrowNarrowRight className='text-zinc-500 text-2xl' />
            </div>
            <div className='col-span-5 flex items-center justify-center'>
              <div className='flex items-center gap-2'>
                <div className='h-8 w-8 md:h-10 md:w-10 rounded-full bg-zinc-500'></div>
                <div className='flex items-center gap-1 text-sm'>
                  <Symbol symbol={exchangeTransactionStatus.toCurrency} />
                  <p className='text-zinc-700'>{exchangeTransactionStatus.expectedAmountTo}</p>
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
      <div className='flex flex-col gap-5 mt-10 bg-zinc-50 p-5 rounded-lg'>
        <Heading
          as='h2'
          className='text-left w-full text-sm md:text-base lg:text-lg font-medium text-zinc-900 border-b border-zinc-200 pb-2'
        >
          Transaction Details
        </Heading>
        <div className='flex flex-col gap-10'>
          <TransactionInfo
            subheading='Exchange order details'
            details={[
              {
                label: "Transaction ID",
                value: { text: exchangeTransactionStatus.id },
              },
              {
                label: "Created at",
                value: {
                  text: formatDate(exchangeTransactionStatus.createdAt),
                  isUrl: false,
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
                  text: exchangeTransactionStatus.payinHash || "",
                  isUrl: true,
                },
              },
              {
                label: "Sent amount",
                value: {
                  text: `${exchangeTransactionStatus.expectedAmountFrom} ${exchangeTransactionStatus.fromCurrency}`,
                  isUrl: false,
                },
              },
              {
                label: "Received at",
                value: {
                  text: formatDate(exchangeTransactionStatus.depositReceivedAt || ""),
                  isUrl: false,
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
                  text: exchangeTransactionStatus.payoutHash || "",
                  isUrl: true,
                },
              },
              {
                label: "Your address",
                value: {
                  text: exchangeTransactionStatus.payoutAddress || "",
                  isUrl: false,
                },
              },
              {
                label: "Amount",
                value: {
                  text: `${exchangeTransactionStatus.expectedAmountTo} ${exchangeTransactionStatus.toCurrency}`,
                  isUrl: false,
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
      text: string
      isUrl?: boolean
    }
  }[]
}) => {
  return (
    <div className='flex flex-col gap-5'>
      <p className='text-sm text-zinc-500'>{subheading}</p>
      <div className='flex flex-col gap-1'>
        {details.map((detail) => (
          <div key={detail.label} className='grid grid-cols-12 items-center gap-2'>
            <p className='text-xs text-zinc-600 font-medium col-span-4'>{detail.label}</p>
            <div className='col-span-8'>
              {detail.value.isUrl ? (
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
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
