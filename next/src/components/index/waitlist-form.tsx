"use client"

import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { Button } from "../ui/button"
import { Form, FormControl, FormField, FormItem } from "../ui/form"
import { Input } from "../ui/input"

const WaitlistForm = ({ className }: { className?: string }) => {
  const formSchema = z.object({
    email: z.string().min(1, { message: "Email is required" }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        throw new Error("Failed to join waitlist")
      }
      toast.success("You've been added to the waitlist!")
      form.reset()
    } catch (error) {
      console.error(error)
      toast.error("Failed to join waitlist")
    }
  }

  return (
    <div
      className={cn(
        "relative flex items-center max-w-md mx-auto rounded-full p-1.5 border border-zinc-700",
        className
      )}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex items-center w-full'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem className='w-full gap-0'>
                <FormControl>
                  <Input
                    placeholder='Email address'
                    {...field}
                    className='rounded-full focus-visible:ring-0 border-0 w-full shadow-none'
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type='submit'
            disabled={form.formState.isSubmitting}
            className='text-center whitespace-nowrap max-w-28 min-w-28 text-white rounded-full bg-gradient-to-br from-secondary-custom to-secondary-custom/70 hover:from-secondary-custom/80 hover:to-secondary-custom/70'
          >
            {form.formState.isSubmitting ? "Joining..." : "Join Waitlist"}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default WaitlistForm
