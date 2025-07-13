import Badge from "@/components/decorations/badge"
import Symbol from "@/components/elements/symbol"
import TokenName from "@/components/elements/token-name"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAppContext } from "@/context/app-context"
import { useExchange } from "@/context/exchange-context"
import { FLOW_TYPE } from "@/lib/shared/constants"
import { trpc } from "@/trpc/client"
import { motion } from "motion/react"
import Image from "next/image"
import { useEffect, useMemo, useRef, useState } from "react"
import { UseFormReturn } from "react-hook-form"
import { AiTwotoneLock, AiTwotoneUnlock } from "react-icons/ai"
import { BsInfoCircle } from "react-icons/bs"
import { HiOutlineArrowNarrowDown, HiOutlineArrowNarrowUp } from "react-icons/hi"
import { MdOutlineKeyboardArrowDown } from "react-icons/md"
import { EXCHANGE_STEPS, EXCHANGE_TYPE, ExchangeFormSchema } from "./constants"

const TransactionDetails = () => {
  const { step, form } = useExchange()
  const { sendToken, receiveToken, fixed_rate, sendAmount } = form.watch()

  // memoized input for fetching min exchange amount
  const minExchangeInput = useMemo(() => {
    if (
      !sendToken?.ticker ||
      !receiveToken?.ticker ||
      !sendToken?.network ||
      !receiveToken?.network
    ) {
      return undefined
    }

    return {
      sendToken: sendToken.ticker,
      receiveToken: receiveToken.ticker,
      sendTokenNetwork: sendToken.network,
      receiveTokenNetwork: receiveToken.network,
      flow: fixed_rate ? FLOW_TYPE.FIXED : FLOW_TYPE.STANDARD,
    }
  }, [
    sendToken?.ticker,
    receiveToken?.ticker,
    sendToken?.network,
    receiveToken?.network,
    fixed_rate,
  ])

  const estimatedExchangeInput = useMemo(() => {
    if (
      !sendToken?.ticker ||
      !receiveToken?.ticker ||
      !sendToken?.network ||
      !receiveToken?.network ||
      !sendAmount ||
      sendAmount === 0
    ) {
      return undefined
    }
    return {
      sendToken: sendToken.ticker,
      receiveToken: receiveToken.ticker,
      sendTokenNetwork: sendToken.network,
      receiveTokenNetwork: receiveToken.network,
      flow: fixed_rate ? FLOW_TYPE.FIXED : FLOW_TYPE.STANDARD,
      sendAmount: sendAmount || 0,
    }
  }, [sendToken, receiveToken, fixed_rate, sendAmount])

  const { data: minExchangeAmount } = trpc.getMinExchangeAmount.useQuery(minExchangeInput!, {
    enabled: !!minExchangeInput,
    retry: false,
  })

  const { data: estimatedExchangeAmount } = trpc.getEstimatedExchangeAmount.useQuery(
    estimatedExchangeInput!,
    {
      enabled: !!estimatedExchangeInput,
      retry: false,
    }
  )

  const hasSetMinAmount = useRef(false)

  useEffect(() => {
    if (minExchangeAmount?.minAmount && !hasSetMinAmount.current) {
      form.setValue("sendAmount", minExchangeAmount.minAmount)
      hasSetMinAmount.current = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minExchangeAmount])

  useEffect(() => {
    if (estimatedExchangeAmount?.toAmount) {
      form.setValue("estimatedExchangeAmount", estimatedExchangeAmount.toAmount)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [estimatedExchangeAmount, sendAmount])

  if (step !== EXCHANGE_STEPS.TRANSACTION_DETAILS) return null

  const handleChangeSwapDirection = () => {
    form.setValue("sendToken", receiveToken)
    form.setValue("receiveToken", sendToken)
  }

  return (
    <div className='relative flex flex-col'>
      <AmountDetails type={EXCHANGE_TYPE.SEND} token={sendToken} form={form} />
      <div className='relative left-5 h-16 border-l border-dashed border-zinc-200 flex items-center justify-between'>
        <p className='text-xs font-medium pl-3 text-zinc-600'>Estimated rate: 1 ETH ~ 2900 USD</p>
        <div
          className='group rounded-lg relative right-10 h-10 w-10 flex items-center justify-center border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 transition duration-200 cursor-pointer'
          onClick={handleChangeSwapDirection}
        >
          <HiOutlineArrowNarrowDown className='text-zinc-600 text-sm group-hover:translate-y-0.5 duration-200 transition-all' />
          <HiOutlineArrowNarrowUp className='text-zinc-600 text-sm group-hover:-translate-y-0.5 duration-200 transition-all' />
        </div>
        <div className='absolute h-2 w-2 rounded-full -translate-x-1/2 transform -translate-y-1/2 top-1/2 bg-zinc-200' />
      </div>
      <AmountDetails type={EXCHANGE_TYPE.RECEIVE} token={receiveToken} form={form} />

      <div className='mt-5 flex flex-col gap-5'>
        <Form {...form}>
          <FormField
            control={form.control}
            name='destination_address'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Receipiant Address</FormLabel>
                <FormControl>
                  <Input
                    className='md:text-base text-sm h-12 focus-visible:ring-0 focus-within:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none focus-within:outline-none placeholder:text-sm shadow-none focus-visible:border-secondary-custom'
                    placeholder='Enter the ETH payout address'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='terms_and_conditions'
            render={({ field }) => (
              <FormItem className='flex items-start gap-3'>
                <Checkbox id='terms-2' checked={field.value} onCheckedChange={field.onChange} />
                <div className='grid gap-2'>
                  <Label htmlFor='terms-2'>Accept terms and conditions</Label>
                  <p className='text-muted-foreground text-sm'>
                    By clicking this checkbox, you agree to the terms and conditions.
                  </p>
                </div>
              </FormItem>
            )}
          />
          <AdvancedSettings form={form} />
        </Form>
      </div>
    </div>
  )
}

export default TransactionDetails

const AmountDetails = ({
  type,
  token,
  form,
}: {
  type: "send" | "receive"
  token: ExchangeFormSchema["sendToken"] | ExchangeFormSchema["receiveToken"]
  form: UseFormReturn<ExchangeFormSchema>
}) => {
  const [openFixedRateInfoDialog, setOpenFixedRateInfoDialog] = useState(false)
  const { handleType, toggleTokenList } = useAppContext()
  const { fixed_rate } = form.watch()

  const handleSelectCoin = () => {
    handleType(type)
    toggleTokenList()
  }

  const handleFixedRate = () => {
    form.setValue("fixed_rate", !fixed_rate)
    setOpenFixedRateInfoDialog(true)
  }

  const estimatedExchangeAmount = form.watch("estimatedExchangeAmount")
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className='bg-zinc-100 relative border border-zinc-200 rounded-xl p-4 flex flex-col gap-2'
      >
        <p className='text-sm'>You {type === "send" ? "send" : "receive"}</p>
        <div className='flex gap-2 items-center'>
          {token.image && (
            <Image
              src={token.image}
              alt={token.name}
              className='object-contain object-center w-8 h-8'
              width={32}
              height={32}
            />
          )}
          <div className='flex flex-col w-full'>
            <div className='w-full flex justify-between items-center gap-2'>
              <div className='flex items-center gap-2'>
                <div className='flex gap-1 items-center cursor-pointer' onClick={handleSelectCoin}>
                  <Symbol symbol={token.ticker} />
                  <MdOutlineKeyboardArrowDown className='text-zinc-600 text-lg' />
                </div>
                {type === EXCHANGE_TYPE.RECEIVE && (
                  <div className='cursor-pointer relative shrink-0' onClick={handleFixedRate}>
                    {fixed_rate ? (
                      <div className='flex items-center gap-1'>
                        <AiTwotoneLock className='text-emerald-600 text-lg' />
                        <p className='text-emerald-600 text-sm'>Fixed Rate</p>
                      </div>
                    ) : (
                      <AiTwotoneUnlock className='text-emerald-600 text-lg' />
                    )}
                  </div>
                )}
              </div>
              {type === EXCHANGE_TYPE.SEND ? (
                <Form {...form}>
                  <FormField
                    control={form.control}
                    name={"sendAmount"}
                    render={({ field }) => (
                      <Input
                        {...field}
                        className='w-full text-right text-base md:text-lg font-medium focus-visible:ring-0 focus-within:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none focus-within:outline-none border-none shadow-none'
                      />
                    )}
                  />
                </Form>
              ) : (
                <Input
                  readOnly
                  value={estimatedExchangeAmount || 0}
                  className='w-full select-none pointer-events-none text-right text-base md:text-lg font-medium focus-visible:ring-0 focus-within:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none focus-within:outline-none border-none shadow-none'
                />
              )}
            </div>
            <div className='flex items-center gap-2'>
              <TokenName name={token.name} />
              <Badge>
                <span className='text-xs capitalize'>{token.network}</span>
              </Badge>
            </div>
          </div>
        </div>
      </motion.div>
      <FixedRateInfoDialog
        open={openFixedRateInfoDialog}
        onOpenChange={setOpenFixedRateInfoDialog}
      />
    </>
  )
}

const FixedRateInfoDialog = ({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className='
          transition-all duration-300
          opacity-0 scale-95
          data-[state=open]:opacity-100 data-[state=open]:scale-100
          md:max-w-xs w-full
        '
      >
        <DialogHeader>
          <DialogTitle>Rate</DialogTitle>
          <DialogDescription>Estimated or fixed rate?</DialogDescription>
        </DialogHeader>
        <div className='flex flex-col gap-2'>
          <div className='flex flex-col gap-1'>
            <p className='font-medium text-sm'>Estimated Rate</p>
            <p className='text-zinc-600 text-xs'>
              The floating rate can change at any point due to market conditions, so you might
              receive more or less crypto than expected
            </p>
          </div>
          <div className='flex flex-col gap-1'>
            <p className='font-medium text-sm'>Fixed Rate</p>
            <p className='text-zinc-600 text-xs'>
              With the fixed rate, you will receive the exact amount of crypto you see on this
              screen
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const AdvancedSettings = ({ form }: { form: UseFormReturn<ExchangeFormSchema> }) => {
  return (
    <Accordion type='single' collapsible>
      <AccordionItem value='advanced-settings' className='border-t border-zinc-100'>
        <AccordionTrigger className='uppercase text-xs text-zinc-500  hover:no-underline flex justify-center'>
          Advanced Settings
        </AccordionTrigger>
        <AccordionContent>
          <div className='flex flex-col gap-2'>
            <FormField
              control={form.control}
              name='refund_address'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Refund Address</FormLabel>
                  <FormControl>
                    <Input
                      className='md:text-base text-sm h-12 focus-visible:ring-0 focus-within:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none focus-within:outline-none placeholder:text-sm shadow-none'
                      placeholder='Refund address (optional)'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Alert variant='info'>
              <BsInfoCircle />
              <AlertTitle className='text-sm'>Refund Address</AlertTitle>
              <AlertDescription className='text-blue-900 text-sm'>
                To receive a refund in case of an issue, add this address. This is an optional
                field.
              </AlertDescription>
            </Alert>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
