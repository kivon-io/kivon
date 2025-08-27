"use client"

import Balance from "@/components/elements/balance"
import Symbol from "@/components/elements/symbol"
import TokenName from "@/components/elements/token-name"
import { Button } from "@/components/ui/button"
import { Form, FormField } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useAppContext } from "@/context/app-context"
import { useBridge } from "@/context/bridge-context"
import { EXCHANGE_TYPE } from "@/lib/shared/constants"
import { useBalanceCheck } from "@/lib/wallet/use-balance-check"
import { motion } from "framer-motion"
import { UseFormReturn } from "react-hook-form"
import { MdOutlineKeyboardArrowDown } from "react-icons/md"
import { useAccount } from "wagmi"
import ChangeTransactionDirection from "../change-transaction-direction"
import AddressDisplay from "./address-display"
import AmountComponent from "./amount"
import { BridgeImageAsset } from "./chain-image"
import { BRIDGE_STAGES, BridgeFormSchema } from "./constants"

const BridgeInfo = () => {
  const { step, form, quote } = useBridge()

  const { origin, destination } = form.watch()

  const handleChangeSwapDirection = () => {
    form.setValue("origin", destination)
    form.setValue("destination", origin)
  }

  if (step === BRIDGE_STAGES.SELECT_ASSET) return null
  return (
    <div className='relative flex flex-col'>
      <div className='relative'>
        <AmountDetails type={EXCHANGE_TYPE.SEND} token={origin} form={form} />
      </div>
      <div className='relative left-5 h-16 border-l border-dashed border-zinc-200 dark:border-zinc-700 flex items-center justify-between'>
        <div className='flex md:flex-row flex-col items-center gap-2' />
        <ChangeTransactionDirection handleChangeSwapDirection={handleChangeSwapDirection} />
        <div className='absolute h-2 w-2 rounded-full -translate-x-1/2 transform -translate-y-1/2 top-1/2 bg-zinc-200 dark:bg-zinc-700' />
      </div>
      <AmountDetails type={EXCHANGE_TYPE.RECEIVE} token={destination} form={form} quote={quote} />
    </div>
  )
}

export default BridgeInfo

const AmountDetails = ({
  type,
  token,
  form,
  quote,
}: {
  type: "send" | "receive"
  token: BridgeFormSchema["origin"] | BridgeFormSchema["destination"]
  form: UseFormReturn<BridgeFormSchema>
  minExchangeAmount?: number
  quote?: Quote | null
}) => {
  const { address } = useAccount()
  const { handleType, toggleBridgeTokenList } = useAppContext()

  const handleSelectCoin = () => {
    handleType(type)
    toggleBridgeTokenList()
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className='bg-zinc-100 dark:bg-neutral-900 relative border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 flex flex-col gap-2'
      >
        <div className='flex items-center justify-between'>
          <p className='text-sm'>You {type === "send" ? "send" : "receive"}</p>
          {address && (
            <AddressDisplay
              address={type === EXCHANGE_TYPE.SEND ? address : (form.watch("recipient") ?? address)}
              type={type}
            />
          )}
        </div>

        <div className='flex gap-2 items-center cursor-pointer'>
          {token && (
            <BridgeImageAsset
              chainName={token.chainName}
              chainImage={token.chainImage}
              currencyName={token.tokenName}
              currencyImage={token.tokenImage}
              onClick={handleSelectCoin}
            />
          )}
          <div className='flex flex-col w-full'>
            <div className='w-full flex justify-between items-center gap-2'>
              <div className='flex items-center gap-2' onClick={handleSelectCoin}>
                <div className='flex gap-1 items-center'>
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
                        placeholder='0'
                        className='w-full max-w-3/5 text-right text-lg md:text-2xl font-bold font-barlow focus-visible:ring-0 focus-within:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none focus-within:outline-none border-none shadow-none text-ellipsis'
                        onChange={(e) => {
                          const value = e.target.value

                          if (value === "") {
                            field.onChange("")
                            return
                          }

                          if (value === ".") {
                            field.onChange("0.")
                            return
                          }

                          let cleanedValue = value.replace(/^0+(?=\d)/, "")

                          if (cleanedValue.startsWith(".")) {
                            cleanedValue = "0" + cleanedValue
                          }

                          if (!isNaN(Number(cleanedValue))) {
                            field.onChange(cleanedValue)
                          }
                        }}
                        value={field.value}
                        pattern='^[0-9]+(\.[0-9]*)?$'
                      />
                    )}
                  />
                </Form>
              ) : (
                <Input
                  readOnly
                  value={quote ? quote.details.currencyOut.amountFormatted : 0}
                  className='w-full max-w-3/5 text-right text-lg md:text-2xl font-bold font-barlow select-none pointer-events-none focus-visible:ring-0 focus-within:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none focus-within:outline-none border-none shadow-none text-ellipsis'
                />
              )}
            </div>
            <div className='flex items-center gap-2'>
              <TokenName name={token.chainDisplayName} />
            </div>
          </div>
        </div>
        <div className='flex justify-between items-center mt-2'>
          <AmountComponent type={type} />
          <BalanceComponent type={type} />
        </div>
      </motion.div>
    </>
  )
}

const BalanceComponent = ({ type }: { type: "send" | "receive" }) => {
  const { form } = useBridge()
  const { address } = useAccount()
  const chainId = form.watch("origin.chainId")
  const token = form.watch("origin.tokenContractAddress")

  const amount = form.watch("amount")
  const isNative = form.watch("origin.tokenIsNative")
  const { balanceFormatted } = useBalanceCheck(address, token, chainId, amount, isNative)
  const amountPercentages = [20, 50, 100]

  const handleSetAmount = (percentage: number) => {
    // set amount to percentage of balance
    form.setValue("amount", (Number(balanceFormatted) * percentage) / 100)
  }

  return (
    <div className='flex flex-col md:flex-row md:gap-2 items-center'>
      <Balance />
      {type === EXCHANGE_TYPE.SEND && (
        <div className='flex gap-1'>
          {amountPercentages.map((percentage) => (
            <Button
              key={percentage}
              disabled={!address}
              className='rounded-lg py-1 px-1.5 text-xs font-medium h-fit cursor-pointer shadow-none bg-zinc-50 dark:bg-neutral-800'
              size='icon'
              variant='outline'
              onClick={() => handleSetAmount(percentage)}
            >
              {percentage === 100 ? "MAX" : `${percentage}%`}
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}
