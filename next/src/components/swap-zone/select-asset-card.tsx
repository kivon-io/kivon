"use client"

import { cn } from "@/lib/utils"
import { motion } from "motion/react"
import Image from "next/image"
import Badge from "../decorations/badge"
import ExchangeType, { ExchangeT } from "../elements/exchange-type"
import Symbol from "../elements/symbol"
import TokenName from "../elements/token-name"
import { BridgeFormSchema } from "./bridge/constants"
import { ExchangeFormSchema } from "./exchange/constants"

type ExchangeToken = ExchangeFormSchema["sendToken"] | ExchangeFormSchema["receiveToken"]
type BridgeToken = BridgeFormSchema["origin"] | BridgeFormSchema["destination"]
type Token = ExchangeToken | BridgeToken

// Type guards
const isExchangeToken = (token: Token): token is ExchangeToken => {
  return "ticker" in token && "name" in token && "image" in token && "network" in token
}

const isBridgeToken = (token: Token): token is BridgeToken => {
  return "chainId" in token && "chainName" in token
}

// Helper functions to normalize token properties
const getTokenImage = (token: Token): string => {
  if (isExchangeToken(token)) return token.image
  if (isBridgeToken(token)) {
    return token.tokenImage || token.chainImage || ""
  }
  return ""
}

const getChainImage = (token: Token): string | null => {
  if (isExchangeToken(token)) return null
  if (isBridgeToken(token)) {
    return token.chainImage || null
  }
  return null
}

const getTokenName = (token: Token): string => {
  if (isExchangeToken(token)) return token.name
  if (isBridgeToken(token)) {
    return token.tokenName || token.chainDisplayName || ""
  }
  return ""
}

const getTokenSymbol = (token: Token): string => {
  if (isExchangeToken(token)) return token.ticker
  if (isBridgeToken(token)) {
    return token.tokenSymbol || token.chainSymbol || ""
  }
  return ""
}

const getTokenNetwork = (token: Token): string => {
  if (isExchangeToken(token)) return token.network
  if (isBridgeToken(token)) return token.chainName
  return ""
}

const SelectAssetCard = ({
  type,
  token,
  onClick,
  className,
}: {
  type: ExchangeT
  token: Token
  onClick: () => void
  className?: string
}) => {
  const tokenImage = getTokenImage(token)
  const tokenName = getTokenName(token)
  const tokenSymbol = getTokenSymbol(token)
  const tokenNetwork = getTokenNetwork(token)
  const chainImage = getChainImage(token)

  if (!token) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
      className={cn(
        "border border-zinc-200 dark:border-zinc-800 bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-neutral-900 dark:to-neutral-950 rounded-xl p-5 relative cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <div className='relative z-20 flex flex-col gap-4 items-center justify-center'>
        <ExchangeType type={type} />
        <div className='flex flex-col gap-2 items-center justify-center'>
          {isExchangeToken(token) ? (
            tokenImage && (
              <Image
                src={tokenImage}
                alt={tokenName}
                className='object-contain object-center w-8 h-8 rounded-full'
                width={32}
                height={32}
              />
            )
          ) : (
            <div className='relative'>
              {tokenImage && (
                <Image
                  src={tokenImage}
                  alt={tokenName}
                  className='object-contain object-center w-8 h-8 rounded-full'
                  width={32}
                  height={32}
                />
              )}
              {chainImage && (
                <div className='absolute -bottom-1 -right-1 bg-white dark:bg-neutral-950 border border-zinc-200 dark:border-zinc-700 rounded-sm'>
                  <Image
                    src={chainImage}
                    alt={tokenName}
                    className='object-cover object-center w-4 h-4 rounded-sm'
                    width={16}
                    height={16}
                  />
                </div>
              )}
            </div>
          )}

          <div className='flex flex-col gap-1 items-center justify-center'>
            <Symbol symbol={tokenSymbol} />
            <TokenName className='text-xs md:text-sm capitalize text-center' name={tokenName} />
            <Badge>
              <p className='text-xs uppercase font-medium'>{tokenNetwork}</p>
            </Badge>
          </div>
        </div>
      </div>
      <div className='absolute -top-3.5 h-2 w-4/5 left-1/2 -translate-x-1/2 translate-y-1/2 bg-zinc-50 dark:bg-neutral-900 border-t border-l border-r border-zinc-200 dark:border-zinc-800 rounded-t-xl opacity-80' />
      <div className='absolute -top-[22px] left-1/2 -translate-x-1/2 bg-zinc-50 dark:bg-neutral-800 h-2 w-3/5 translate-y-1/2 border-t border-l border-r border-zinc-200 dark:border-zinc-700 rounded-t-xl opacity-50' />
    </motion.div>
  )
}

export default SelectAssetCard
