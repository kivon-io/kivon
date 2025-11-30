import { FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { UseFormReturn } from "react-hook-form"
import { ExchangeFormSchema } from "./constants"

const ExtraField = ({ form }: { form: UseFormReturn<ExchangeFormSchema> }) => {
  const receiveToken = form.watch("receiveToken")

  if (!receiveToken.isExtraIdSupported) return null
  return (
    <FormField
      control={form.control}
      name='exchangeTransaction.payoutExtraId'
      render={({ field }) => (
        <FormItem>
          <FormLabel>Memo</FormLabel>
          <FormControl>
            <Input {...field} placeholder='Memo' className='h-12' />
          </FormControl>
          <FormDescription className='text-xs text-zinc-600 dark:text-zinc-400'>
            Do not forget to specify the memo for the transaction if it is required.
          </FormDescription>
        </FormItem>
      )}
    />
  )
}

export default ExtraField
