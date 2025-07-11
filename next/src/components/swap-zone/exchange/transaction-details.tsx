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
import { motion } from "motion/react"
import { useState } from "react"
import { UseFormReturn } from "react-hook-form"
import { AiTwotoneLock, AiTwotoneUnlock } from "react-icons/ai"
import { BsInfoCircle } from "react-icons/bs"
import { HiOutlineArrowNarrowDown, HiOutlineArrowNarrowUp } from "react-icons/hi"
import { MdOutlineKeyboardArrowDown } from "react-icons/md"
import { EXCHANGE_STEPS, EXCHANGE_TYPE, ExchangeFormSchema } from "./constants"

const TransactionDetails = () => {
  const { step, form } = useExchange()
  const { sendToken, receiveToken } = form.watch()

  if (step !== EXCHANGE_STEPS.TRANSACTION_DETAILS) return null

  const handleChangeSwapDirection = () => {
    form.setValue("sendToken", receiveToken)
    form.setValue("receiveToken", sendToken)
  }

  return (
    <div className='relative flex flex-col'>
      <AmountDetails type='send' token={sendToken} form={form} />
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
      <AmountDetails type='receive' token={receiveToken} form={form} />

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
  token: string
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
          <div className='h-10 w-10 rounded-full bg-zinc-200 shrink-0'></div>
          <div className='flex flex-col w-full'>
            <div className='w-full flex justify-between items-center gap-2'>
              <div className='flex items-center gap-2'>
                <div className='flex gap-1 items-center cursor-pointer' onClick={handleSelectCoin}>
                  <Symbol symbol='ETH' className='font-medium text-zinc-800' />
                  <MdOutlineKeyboardArrowDown className='text-zinc-600 text-lg' />
                </div>
                {type === EXCHANGE_TYPE.RECEIVE && (
                  <div className='cursor-pointer relative shrink-0' onClick={handleFixedRate}>
                    {fixed_rate ? (
                      <AiTwotoneLock className='text-emerald-600 text-lg' />
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
                  value={0.012591}
                  className='w-full text-right text-base md:text-lg font-medium focus-visible:ring-0 focus-within:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none focus-within:outline-none border-none shadow-none'
                />
              )}
            </div>
            <div className='flex items-center gap-2'>
              <TokenName name={token} />
              <Badge>
                <span className='text-xs capitalize'>{token}</span>
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
