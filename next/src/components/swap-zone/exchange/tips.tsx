"use client"

import { Heading } from "@/components/elements/heading"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { motion } from "motion/react"
import { useState } from "react"
import { BsInfoCircleFill } from "react-icons/bs"
import { IoCloseCircleOutline } from "react-icons/io5"
import { LuCircleCheckBig } from "react-icons/lu"

const tips = [
  {
    heading: "We will process your transaction even if you:",
    list: [
      "Send a deposit in the wrong network, if this asset is supported on our service",
      "Create a transaction with a wrong coin",
      "Select an amount and send a different one",
      "Send more than one deposit for the same transaction",
      "Send a deposit long after the exchange was created or completed",
    ],
    key: "default",
  },
  {
    heading: "We will not be able to proceed with the transaction on the initial terms if you:",
    list: [
      "Send a deposit for a fixed-rate exchange after the rate expires, provided that the rate declines over the timeframe",
      "make a transaction using the wrong contract address",
    ],
    note: "In these cases, we advice that you contact our support team, the exchange can be continued from there, or alternatively, you are to request a refund",
    key: "rejected",
  },
  {
    heading: "How to cancel an exchange",
    list: [
      "If you have not sent any funds yet, there's no need to cancel the transaction, you can simply just create a new one",
      "If you have already sent the funds for the exchange, immediately contact our support team for assistance",
    ],
    key: "cancel",
  },
]

const Tips = () => {
  return (
    <motion.div className='relative bg-white rounded-3xl h-fit p-5 max-w-5xl w-full border border-zinc-200 mx-auto mt-20'>
      <Heading as='h2' className='text-sm md:text-base text-start font-medium'>
        Useful information to know
      </Heading>
      <TipsContent />
    </motion.div>
  )
}

export default Tips

export const DialogTips = () => {
  const [open, setOpen] = useState(false)

  const onOpenChange = () => {
    setOpen(!open)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant='outline' className='w-full h-12 rounded-lg'>
          <BsInfoCircleFill className='w-4 h-4 mr-1' />
          Transaction tips
        </Button>
      </DialogTrigger>
      <DialogContent
        className='
          transition-all duration-300
          opacity-0 scale-95
          data-[state=open]:opacity-100 data-[state=open]:scale-100
        '
      >
        <DialogHeader>
          <DialogTitle>Transaction tips</DialogTitle>
          <DialogDescription>
            Useful information to know before you start your transaction
          </DialogDescription>
        </DialogHeader>
        <TipsContent />
      </DialogContent>
    </Dialog>
  )
}

const TipsContent = () => {
  return (
    <div className='flex flex-col gap-8 mt-5'>
      {tips.map((tip) => (
        <div key={tip.key}>
          <Heading as='h3' className='text-sm md:text-base text-start font-medium'>
            {tip.heading}
          </Heading>
          <div className='flex flex-col gap-2 mt-3'>
            {tip.list.map((item) => (
              <div key={item} className='flex items-start gap-2'>
                {tip.key === "default" && (
                  <LuCircleCheckBig className='w-4 h-4 text-emerald-500 shrink-0' />
                )}
                {tip.key === "rejected" && (
                  <IoCloseCircleOutline className='w-5 h-5 text-yellow-500 shrink-0' />
                )}
                {tip.key === "cancel" && (
                  <BsInfoCircleFill className='w-4 h-4 text-blue-500 shrink-0' />
                )}
                <p className='text-xs md:text-sm text-start font-medium'>{item}</p>
              </div>
            ))}
          </div>
          {tip.note && (
            <p className='mt-2 text-xs md:text-sm text-start text-zinc-700 border border-zinc-200 p-4 rounded-lg'>
              {tip.note}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}
