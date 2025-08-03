import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { useBridge } from "@/context/bridge-context"
import { BsFillInfoCircleFill } from "react-icons/bs"
import { IoMdSettings } from "react-icons/io"
import { BRIDGE_STAGES } from "./constants"

const Slippage = () => {
  const { step, form } = useBridge()
  if (step !== BRIDGE_STAGES.TRANSACTION_INFORMATION) return null
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size='icon'
          variant='outline'
          className='bg-white dark:bg-neutral-950 rounded-lg border-zinc-200 dark:border-zinc-800'
        >
          <IoMdSettings className='w-4 h-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent side='bottom' align='end' className='max-w-52 flex flex-col gap-2 shadow-sm'>
        <div className='flex items-center gap-1'>
          <p className='text-xs font-medium text-zinc-700 dark:text-zinc-100'>Max Slippage</p>
          <Tooltip>
            <TooltipTrigger asChild>
              <BsFillInfoCircleFill className='w-4 h-4 text-zinc-500 dark:text-zinc-400' />
            </TooltipTrigger>
            <TooltipContent className='bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 max-w-40 mx-auto'>
              <p className='text-xs text-zinc-700 dark:text-zinc-100'>
                If the price exceeds the maximum slippage, the transaction will be reverted.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
        <div className='flex w-full max-w-sm flex-col gap-6'>
          <Tabs defaultValue='auto'>
            <TabsList className='bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800'>
              <TabsTrigger
                value='auto'
                className='text-xs font-medium border data-[state=active]:bg-zinc-200 dark:data-[state=active]:bg-zinc-800 data-[state=active]:border-zinc-200 dark:data-[state=active]:border-zinc-800 rounded-sm'
              >
                Auto
              </TabsTrigger>
              <TabsTrigger
                value='custom'
                className='text-xs font-medium border data-[state=active]:bg-zinc-200 dark:data-[state=active]:bg-zinc-800 data-[state=active]:border-zinc-200 dark:data-[state=active]:border-zinc-800 rounded-sm'
              >
                Custom
              </TabsTrigger>
            </TabsList>
            <TabsContent value='auto'>
              <p className='text-xs text-zinc-700 dark:text-zinc-100'>
                We&apos;ll set the slippage automatically to minimize the failure rate.
              </p>
            </TabsContent>
            <TabsContent value='custom'>
              <Form {...form}>
                <FormField
                  control={form.control}
                  name='slippage'
                  render={({ field }) => (
                    <FormItem className='relative'>
                      <Input
                        className='text-right pr-5 focus-visible:ring-0 focus-within:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none focus-within:outline-none shadow-none'
                        {...field}
                        placeholder='2'
                      />
                      <div className='absolute right-2 top-0 bottom-0 flex items-center justify-center'>
                        <p className='text-xs text-zinc-700 dark:text-zinc-100'>%</p>
                      </div>
                    </FormItem>
                  )}
                />
              </Form>
            </TabsContent>
          </Tabs>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default Slippage
