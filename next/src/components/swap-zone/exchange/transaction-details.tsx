import Badge from "@/components/decorations/badge"
import Symbol from "@/components/elements/symbol"
import TokenName from "@/components/elements/token-name"
import Loader from "@/components/loader"
import { Checkbox } from "@/components/ui/checkbox"
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
import { cn } from "@/lib/utils"
import { trpc } from "@/trpc/client"
import { motion } from "motion/react"
import Image from "next/image"
import { useEffect, useMemo, useRef, useState } from "react"
import { UseFormReturn } from "react-hook-form"
import { AiTwotoneLock, AiTwotoneUnlock } from "react-icons/ai"
import { BsCheckCircle, BsXCircle } from "react-icons/bs"
import { HiOutlineArrowNarrowDown, HiOutlineArrowNarrowUp } from "react-icons/hi"
import { MdOutlineKeyboardArrowDown } from "react-icons/md"
import AdvancedSettings from "./advanced-settings"
import { EXCHANGE_STEPS, EXCHANGE_TYPE, ExchangeFormSchema } from "./constants"
import FixedRateInfoDialog from "./fixed-rate-info"
import { ValidFixedRate } from "./valid-fixed-rate"

const TransactionDetails = () => {
  const hasSetMinAmount = useRef(false)
  const { step, form } = useExchange()
  const { sendToken, receiveToken, fixed_rate, sendAmount, destination_address } = form.watch()

  const { data: validatedAddress, isLoading: isValidatingAddress } = trpc.validateAddress.useQuery(
    {
      address: form.watch("destination_address") || "",
      network: form.watch("receiveToken.ticker") || "",
    },
    {
      enabled: !!form.watch("destination_address") && !!form.watch("receiveToken.ticker"),
    }
  )

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

  // Only fetch estimated amount if sendAmount is set and >= minExchangeAmount
  const shouldFetchEstimatedExchangeAmount = useMemo(() => {
    if (
      !estimatedExchangeInput ||
      !minExchangeAmount?.minAmount ||
      sendAmount < minExchangeAmount.minAmount
    ) {
      return false
    }
    return true
  }, [estimatedExchangeInput, minExchangeAmount?.minAmount, sendAmount])

  const { data: estimatedExchangeAmount } = trpc.getEstimatedExchangeAmount.useQuery(
    estimatedExchangeInput!,
    {
      enabled: shouldFetchEstimatedExchangeAmount,
      retry: false,
    }
  )

  useEffect(() => {
    if (minExchangeAmount?.minAmount && !hasSetMinAmount.current) {
      form.setValue("sendAmount", minExchangeAmount.minAmount)
      form.setValue("minExchangeAmount", minExchangeAmount.minAmount)
      hasSetMinAmount.current = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minExchangeAmount, sendToken, receiveToken, fixed_rate])

  useEffect(() => {
    if (estimatedExchangeAmount?.toAmount) {
      form.setValue("estimatedExchange", {
        rateId: estimatedExchangeAmount.rateId || undefined,
        validUntil: estimatedExchangeAmount.validUntil || undefined,
        toAmount: estimatedExchangeAmount.toAmount,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [estimatedExchangeAmount, sendAmount, sendToken, receiveToken, fixed_rate])

  useEffect(() => {
    if (validatedAddress) {
      form.setValue("isAddressValid", {
        result: validatedAddress.result,
        message: validatedAddress.message,
        isActivated: validatedAddress.isActivated,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validatedAddress, destination_address])

  if (step !== EXCHANGE_STEPS.TRANSACTION_DETAILS) return null

  const handleChangeSwapDirection = () => {
    form.setValue("sendToken", receiveToken)
    form.setValue("receiveToken", sendToken)
  }

  return (
    <div className='relative flex flex-col'>
      <div className='relative'>
        <AmountDetails type={EXCHANGE_TYPE.SEND} token={sendToken} form={form} />
        {minExchangeAmount?.minAmount && sendAmount < minExchangeAmount.minAmount && (
          <SendAmountLessThanMinAmount token={sendToken} minAmount={minExchangeAmount.minAmount} />
        )}
      </div>
      <div className='relative left-5 h-16 border-l border-dashed border-zinc-200 flex items-center justify-between'>
        <div className='flex md:flex-row flex-col items-center gap-2'>
          <div className='text-xs font-medium pl-3 text-zinc-600 flex items-center gap-1'>
            <div className='flex items-center gap-1'>
              <span className='hidden'> Estimated rate: </span> {sendAmount}{" "}
              <Symbol className='text-xs' symbol={sendToken.ticker} />
            </div>
            <div className='flex items-center gap-1'>
              ~ {estimatedExchangeAmount?.toAmount}{" "}
              <Symbol className='text-xs' symbol={receiveToken.ticker} />
            </div>
          </div>
          {estimatedExchangeAmount?.validUntil && (
            <ValidFixedRate validUntil={estimatedExchangeAmount.validUntil} />
          )}
        </div>
        <div
          className='group rounded-lg relative right-10 h-10 w-10 flex items-center justify-center border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 transition duration-200 cursor-pointer'
          onClick={handleChangeSwapDirection}
        >
          <HiOutlineArrowNarrowDown className='text-zinc-600 text-sm group-hover:translate-y-0.5 duration-200 transition-all' />
          <HiOutlineArrowNarrowUp className='text-zinc-600 text-sm group-hover:-translate-y-0.5 duration-200 transition-all' />
        </div>
        <div className='absolute h-2 w-2 rounded-full -translate-x-1/2 transform -translate-y-1/2 top-1/2 bg-zinc-200' />
      </div>
      <AmountDetails
        type={EXCHANGE_TYPE.RECEIVE}
        token={receiveToken}
        form={form}
        minExchangeAmount={minExchangeAmount?.minAmount}
      />

      <div className='mt-5 flex flex-col gap-5'>
        <Form {...form}>
          <FormField
            control={form.control}
            name='destination_address'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Receipiant Address</FormLabel>
                <FormControl>
                  <div className='relative '>
                    <Input
                      className='md:text-base text-sm h-12 focus-visible:ring-0 focus-within:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none focus-within:outline-none placeholder:text-sm shadow-none focus-visible:border-secondary-custom'
                      placeholder='Enter the ETH payout address'
                      {...field}
                    />
                    {isValidatingAddress && (
                      <div className='absolute right-2 top-1/2 -translate-y-1/2'>
                        <Loader />
                      </div>
                    )}
                    {validatedAddress?.result && destination_address && (
                      <BsCheckCircle className='absolute right-2 top-1/2 -translate-y-1/2 text-emerald-600' />
                    )}
                    {validatedAddress?.message && (
                      <BsXCircle className='absolute right-2 top-1/2 -translate-y-1/2 text-red-500' />
                    )}
                  </div>
                </FormControl>
                {validatedAddress?.message && (
                  <p className='text-xs text-red-500'>{validatedAddress.message}</p>
                )}
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
  minExchangeAmount,
}: {
  type: "send" | "receive"
  token: ExchangeFormSchema["sendToken"] | ExchangeFormSchema["receiveToken"]
  form: UseFormReturn<ExchangeFormSchema>
  minExchangeAmount?: number
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

  const sendAmount = form.watch("sendAmount")
  const estimatedExchange = form.watch("estimatedExchange")

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
                  value={
                    minExchangeAmount && sendAmount < minExchangeAmount
                      ? "-"
                      : estimatedExchange.toAmount || 0
                  }
                  className='w-full select-none pointer-events-none text-right text-base md:text-lg font-medium focus-visible:ring-0 focus-within:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none focus-within:outline-none border-none shadow-none'
                />
              )}
            </div>
            <div className='flex items-center gap-2'>
              <TokenName name={token.name} />
              <Badge>
                <span className='text-xs uppercase'>{token.network}</span>
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

const SendAmountLessThanMinAmount = ({
  token,
  minAmount,
}: {
  token: ExchangeFormSchema["sendToken"]
  minAmount: number
}) => {
  return (
    <div className={cn("absolute bottom-3 right-3")}>
      <div className='text-xs text-red-500 font-medium flex items-center gap-1'>
        Min is {minAmount} <Symbol className='text-xs text-red-500' symbol={token.ticker} />
      </div>
    </div>
  )
}
