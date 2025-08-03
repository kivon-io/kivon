"use client"

import Symbol from "@/components/elements/symbol"
import TokenName from "@/components/elements/token-name"
import { Form, FormField } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useAppContext } from "@/context/app-context"
import { useBridge } from "@/context/bridge-context"
import { EXCHANGE_TYPE } from "@/lib/shared/constants"
import { motion } from "framer-motion"
import { UseFormReturn } from "react-hook-form"
import { MdOutlineKeyboardArrowDown } from "react-icons/md"
import ChangeTransactionDirection from "../change-transaction-direction"
import { BridgeImageAsset } from "./chain-image"
import { BRIDGE_STAGES, BridgeFormSchema } from "./constants"

const BridgeInfo = () => {
  const { step, form } = useBridge()

  const { origin, destination, amount } = form.watch()

  const handleChangeSwapDirection = () => {
    form.setValue("origin", destination)
    form.setValue("destination", origin)
  }

  const estimatedExchangeAmount = {
    toAmount: 0,
  }

  if (step === BRIDGE_STAGES.SELECT_ASSET) return null
  return (
    <div className='relative flex flex-col'>
      <div className='relative'>
        <AmountDetails type={EXCHANGE_TYPE.SEND} token={origin} form={form} />
      </div>
      <div className='relative left-5 h-16 border-l border-dashed border-zinc-200 dark:border-zinc-700 flex items-center justify-between'>
        <div className='flex md:flex-row flex-col items-center gap-2'>
          <div className='text-xs font-medium pl-3 text-zinc-600 dark:text-zinc-400 flex items-center gap-1'>
            <div className='flex items-center gap-1'>
              <span className='hidden'> Estimated rate: </span> {amount}{" "}
              <Symbol className='text-xs' symbol={origin.chainSymbol} />
            </div>
            <div className='flex items-center gap-1'>
              ~ {estimatedExchangeAmount?.toAmount}{" "}
              <Symbol className='text-xs' symbol={destination.chainSymbol} />
            </div>
          </div>
          {/* {estimatedExchangeAmount?.validUntil && (
              <ValidFixedRate validUntil={estimatedExchangeAmount.validUntil} />
            )} */}
        </div>
        <ChangeTransactionDirection handleChangeSwapDirection={handleChangeSwapDirection} />
        <div className='absolute h-2 w-2 rounded-full -translate-x-1/2 transform -translate-y-1/2 top-1/2 bg-zinc-200 dark:bg-zinc-700' />
      </div>
      <AmountDetails
        type={EXCHANGE_TYPE.RECEIVE}
        token={destination}
        form={form}
        //   minExchangeAmount={minExchangeAmount?.minAmount}
      />
    </div>
  )
}

export default BridgeInfo

const AmountDetails = ({
  type,
  token,
  form,
  minExchangeAmount,
}: {
  type: "send" | "receive"
  token: BridgeFormSchema["origin"] | BridgeFormSchema["destination"]
  form: UseFormReturn<BridgeFormSchema>
  minExchangeAmount?: number
}) => {
  const { handleType, toggleBridgeTokenList } = useAppContext()

  const handleSelectCoin = () => {
    handleType(type)
    toggleBridgeTokenList()
  }

  //   const handleFixedRate = () => {
  //     form.setValue("fixed_rate", !fixed_rate)
  //     setOpenFixedRateInfoDialog(true)
  //   }

  const sendAmount = form.watch("amount")

  const estimatedExchange = {
    toAmount: 0,
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className='bg-zinc-100 dark:bg-neutral-900 relative border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 flex flex-col gap-2'
      >
        <p className='text-sm'>You {type === "send" ? "send" : "receive"}</p>
        <div className='flex gap-2 items-center'>
          {token && (
            <BridgeImageAsset
              chainName={token.chainName}
              chainImage={token.chainImage}
              currencyName={token.tokenName}
              currencyImage={token.tokenImage}
            />
          )}
          <div className='flex flex-col w-full'>
            <div className='w-full flex justify-between items-center gap-2'>
              <div className='flex items-center gap-2'>
                <div className='flex gap-1 items-center cursor-pointer' onClick={handleSelectCoin}>
                  <Symbol symbol={token.tokenSymbol} />
                  <MdOutlineKeyboardArrowDown className='text-zinc-600 text-lg' />
                </div>
                {type === EXCHANGE_TYPE.RECEIVE && (
                  <div className='cursor-pointer relative shrink-0'></div>
                )}
              </div>
              {type === EXCHANGE_TYPE.SEND ? (
                <Form {...form}>
                  <FormField
                    control={form.control}
                    name={"amount"}
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
              <TokenName name={token.chainDisplayName} />
              {/* <Badge>
                <span className='text-xs uppercase font-medium'>{token.chainName}</span>
              </Badge> */}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}
