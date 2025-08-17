"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import { useForm, UseFormReturn } from "react-hook-form"
import { FiUpload } from "react-icons/fi"
import { useMediaQuery } from "usehooks-ts"
import z from "zod"
import Lines from "../decorations/lines"
import { Heading } from "../elements/heading"
import { Subheading } from "../elements/sub_heading"
import Section from "../section"
import { Button } from "../ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet"

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  symbol: z.string().min(1, {
    message: "Symbol is required",
  }),
  image: z.object({
    file: z.instanceof(File).optional().nullable(),
    url: z.string().optional().nullable(),
  }),
})

type FormSchemaType = z.infer<typeof formSchema>

const Features = () => {
  const isMobile = useMediaQuery("(max-width: 768px)")

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "Kivon index",
      symbol: "KIV",
      image: {
        file: undefined,
        url: undefined,
      },
    },
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      form.setValue("image", { file, url: URL.createObjectURL(file) })
    }
  }

  const handleRemoveImage = () => {
    form.setValue("image", { file: undefined, url: undefined })
  }

  const name = form.watch("name")
  const symbol = form.watch("symbol")
  const image = form.watch("image")

  return (
    <Section className='relative max-w-7xl mx-auto'>
      <div className='flex flex-col justify-center'>
        <Heading as='h2' className='text-center font-bold text-lg md:text-2xl'>
          Basic index features at a glance
        </Heading>
        <Subheading className='text-base md:text-lg'>
          The most versatile and comprehensive platform.
        </Subheading>
      </div>
      <div className='overflow-hidden pt-16'>
        <div className='mx-auto w-full px-6'>
          <div className='relative isolate -mx-6 bg-white dark:bg-zinc-900 shadow-[0_0_0_1px_rgba(24,28,33,0.06),0_16px_36px_-6px_rgba(24,28,33,0.2),0_8px_16px_-3px_rgba(0,0,0,0.08)] sm:mx-0 sm:rounded-t-lg'>
            <div className='relative z-10 flex gap-x-2 p-4 shadow-[0_1px_0.5px] shadow-black/7.5'>
              <div className='size-2 flex-none rounded-full bg-gray-600/10 shadow-[0_0_2px_inset] shadow-black/15'></div>
              <div className='size-2 flex-none rounded-full bg-gray-600/10 shadow-[0_0_2px_inset] shadow-black/15'></div>
            </div>
            <div className='absolute -inset-x-32 -bottom-3 -top-16 z-10 bg-gradient-to-t from-background from-10% to-75%'></div>
            <div className='relative lg:grid lg:grid-cols-2'>
              <div className='lg-pb-28 lg:pt-20'>
                <div className='relative z-10 mx-auto bg-zinc-100 dark:bg-zinc-800 px-6 lg:max-w-[25rem] lg:rounded-[0.625rem] lg:px-px pb-px'>
                  <div className='mx-auto pt-10 sm:text-center lg:!max-w-none lg:px-5 lg:py-6 lg:text-left [@media(min-width:32.125em)]:max-w-sm'>
                    <h2 className='font-medium text-base'>Create your own Index</h2>
                    <p className='text-sm text-zinc-500 dark:text-zinc-400'>
                      Create your own index with custom name, symbol and denomination asset.
                    </p>
                  </div>
                  <div className='mt-2 md:mt-0 overflow-hidden rounded-[0.625rem] bg-white dark:bg-zinc-900 shadow-[0_0_0_1px_rgba(25,28,33,0.04),0_-2px_2px_-1px_rgba(25,28,33,0.02),0_3px_3px_-2px_rgba(25,28,33,0.06),0_3px_5px_-2px_rgba(0,0,0,0.08)] lg:block'>
                    {isMobile ? (
                      <CreateIndexMobile
                        form={form}
                        handleImageChange={handleImageChange}
                        handleRemoveImage={handleRemoveImage}
                      />
                    ) : (
                      <CreateIndexForm
                        form={form}
                        handleImageChange={handleImageChange}
                        handleRemoveImage={handleRemoveImage}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className='flex items-center justify-center bg-gray-25 pb-28 pt-8 lg:pt-20 [@media(min-width:32.125em)]:px-10'>
                <figure className='relative z-10 w-full bg-zinc-50 dark:bg-zinc-800 p-4 [@media(min-width:32.125rem)]:max-w-[27.125rem]'>
                  <span className='absolute inset-0 [background-image:repeating-linear-gradient(-45deg,theme(colors.zinc.100/.25),theme(colors.zinc.100/.25)_6px,transparent_6px,transparent_12px)] dark:[background-image:repeating-linear-gradient(-45deg,theme(colors.zinc.900/.25),theme(colors.zinc.900/.25)_6px,transparent_6px,transparent_12px)] [mask-image:linear-gradient(to_top,black,transparent_80%)]'></span>
                  <div className='relative w-full rounded-xl border dark:border-zinc-900 shadow-xl'>
                    <div className='rounded-b-lg rounded-t-xl bg-white dark:bg-zinc-900 shadow-[0_0_2px_theme(colors.black/0.08),0_1px_2px_theme(colors.black/0.06),0_0_2px_theme(colors.black/0.08)]'>
                      <div className='flex flex-col gap-8 overflow-hidden px-10 py-8 relative'>
                        <div className='flex items-center gap-2'>
                          <div className='h-10 w-10 rounded-full bg-zinc-400 dark:bg-zinc-600 relative overflow-hidden border border-zinc-200 dark:border-zinc-700'>
                            {image.url && (
                              <Image src={image.url} alt={name} fill className='object-cover' />
                            )}
                          </div>
                          <div className='flex flex-col'>
                            <h1 className='text-sm font-medium text-zinc-900 dark:text-zinc-100'>
                              {name}
                            </h1>
                            <p className='text-xs text-zinc-500 dark:text-zinc-400'>{symbol}</p>
                          </div>
                        </div>
                        <div className='gap-2 w-full items-center relative grid grid-cols-2'>
                          <Button className='w-full' size='lg'>
                            Buy
                          </Button>
                          <Button className='w-full' size='lg' variant='outline'>
                            Sell
                          </Button>
                        </div>
                        <div className='border-t border-zinc-200 dark:border-zinc-800 pt-2'>
                          <div className='flex justify-between'>
                            <div className='flex items-center gap-2'>
                              <div className='h-10 w-10 rounded-full bg-zinc-400 dark:bg-zinc-700'></div>
                              <div className='flex flex-col'>
                                <p className='text-xs text-zinc-500 dark:text-zinc-400'>Creator:</p>
                                <p className='text-sm'>Kivon Protocol</p>
                              </div>
                            </div>
                            <div className='flex items-center gap-2'>
                              <div className='h-10 w-10 rounded-full bg-zinc-400 dark:bg-zinc-700'></div>
                              <div className='flex flex-col'>
                                <p className='text-xs text-zinc-500 dark:text-zinc-400'>Manager:</p>
                                <p className='text-sm'>0x651...1234</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className='relative pt-4 text-center text-xs/4 font-medium text-gray-400'>
                    This is a preview
                  </p>
                  <Lines />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

export default Features

const CreateIndexMobile = ({
  form,
  handleImageChange,
  handleRemoveImage,
}: {
  form: UseFormReturn<FormSchemaType>
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleRemoveImage: () => void
}) => {
  return (
    <Sheet>
      <SheetTrigger className='' asChild>
        <Button className='w-full'>Customize</Button>
      </SheetTrigger>
      <SheetContent side='bottom'>
        <SheetHeader>
          <SheetTitle>Customize your own index</SheetTitle>
          <SheetDescription>
            Create your own index with custom name, symbol and image.
          </SheetDescription>
        </SheetHeader>
        <CreateIndexForm
          form={form}
          handleImageChange={handleImageChange}
          handleRemoveImage={handleRemoveImage}
        />
      </SheetContent>
    </Sheet>
  )
}

const CreateIndexForm = ({
  form,
  handleImageChange,
  handleRemoveImage,
}: {
  form: UseFormReturn<FormSchemaType>
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleRemoveImage: () => void
}) => {
  const image = form.watch("image")

  return (
    <Form {...form}>
      <div className='px-5 pb-6 lg:pt-6 flex flex-col gap-4'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='Kivon index' {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='symbol'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Symbol</FormLabel>
              <FormControl>
                <Input placeholder='KIV' {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className='relative flex flex-col gap-2'>
          <p className='text-sm'>Logo</p>
          {!image.url && (
            <Label
              htmlFor='logo'
              className='w-full h-11 cursor-pointer border border-dashed border-zinc-200 dark:border-zinc-700 rounded-md flex items-center justify-center p-4 group'
            >
              <input
                className='hidden'
                type='file'
                name='logo'
                id='logo'
                onChange={handleImageChange}
              />
              <FiUpload className='size-4 text-zinc-400 group-hover:scale-125 transition-all duration-300' />
            </Label>
          )}
          {image.url && (
            <div className='flex items-center gap-2 w-full'>
              <div className='h-10 w-10 relative overflow-hidden rounded-full border border-zinc-200 dark:border-zinc-700'>
                <Image
                  src={image.url}
                  alt={form.getValues("name")}
                  fill
                  className='object-cover w-10 h-10'
                />
              </div>
              <Button variant='outline' size='sm' onClick={handleRemoveImage}>
                Remove
              </Button>
            </div>
          )}
        </div>
      </div>
    </Form>
  )
}
