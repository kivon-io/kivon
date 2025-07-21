import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { trpc } from "@/trpc/client"
import { UseFormReturn } from "react-hook-form"
import { BsCheckCircle, BsInfoCircle, BsXCircle } from "react-icons/bs"
import { ExchangeFormSchema } from "./constants"

const AdvancedSettings = ({ form }: { form: UseFormReturn<ExchangeFormSchema> }) => {
  const { data: validatedAddress } = trpc.validateAddress.useQuery(
    {
      address: form.watch("refund_address") || "",
      ticker: form.watch("sendToken.legacyTicker") || "",
    },
    {
      enabled: !!form.watch("refund_address") && !!form.watch("sendToken.ticker"),
    }
  )
  const refundAddress = form.watch("refund_address")

  return (
    <Accordion type='single' collapsible>
      <AccordionItem
        value='advanced-settings'
        className='border-t border-zinc-200 dark:border-zinc-800'
      >
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
                    <div className='relative'>
                      <Input
                        className='md:text-base text-sm h-12 focus-visible:ring-0 focus-within:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none focus-within:outline-none placeholder:text-sm shadow-none'
                        placeholder='Refund address (optional)'
                        {...field}
                      />
                      {validatedAddress?.result && refundAddress && (
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
            <Alert variant='info'>
              <BsInfoCircle />
              <AlertTitle className='text-sm'>Refund Address</AlertTitle>
              <AlertDescription className='text-blue-900 dark:text-blue-200 text-sm'>
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

export default AdvancedSettings
