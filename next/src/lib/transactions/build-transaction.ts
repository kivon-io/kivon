import type { CheckResultT } from "@/lib/wallet/use-execute-steps"
import type { TransactionInput } from "@/trpc/routers/transactions"
import { EXCHANGE_APP_NAME, RELAY_APP_NAME } from "../shared/constants"
import { appendUrlToTxHash } from "../utils"

type BridgeBuildArgs = {
  quote: Quote
  checkResult: CheckResultT
  origin: {
    chainId: number
    chainName: string
    chainImage: string
    tokenSymbol: string
    explorerUrl: string
  }
  destination: {
    chainId: number
    chainName: string
    chainImage: string
    tokenSymbol: string
    explorerUrl: string
  }
  userAddress: `0x${string}`
}

type ExchangeBuildArgs = {
  exchangeTransaction: ExchangeStatusResponse
  origin: TokenInfoResponse
  destination: TokenInfoResponse
  userAddress: `0x${string}`
  fromAmountUsd: string
  toAmountUsd: string
  chains: Chain[]
}

const getChainInfoFromNetwork = (network: string, chains: Chain[]) => {
  return chains.find((chain) => chain.name === network)
}

export function buildBridgeTransaction(args: BridgeBuildArgs): TransactionInput {
  const { quote, checkResult, origin, destination, userAddress } = args

  const currencyIn = quote.details.currencyIn
  const currencyOut = quote.details.currencyOut

  // Try to capture an order/request id for traceability
  const orderId = quote?.protocol?.v2?.orderId
  const requestId = quote?.steps?.find((s) => Boolean(s.requestId))?.requestId

  const currencies: TransactionInput["currencies"] = [
    {
      chain_id: currencyIn.currency.chainId,
      chain_name: origin.chainName,
      chain_symbol: origin.tokenSymbol,
      chain_logo_uri: origin.chainImage,
      currency_role: "from",
      currency_address: currencyIn.currency.address,
      currency_symbol: currencyIn.currency.symbol,
      currency_name: currencyIn.currency.name,
      currency_logo_uri: currencyIn.currency.metadata.logoURI,
      decimals: currencyIn.currency.decimals,
      is_native: currencyIn.currency.metadata.isNative ?? false,
      amount: currencyIn.amount,
      amount_formatted: currencyIn.amountFormatted,
      amount_usd: currencyIn.amountUsd,
    },
    {
      chain_id: currencyOut.currency.chainId,
      chain_name: destination.chainName,
      chain_symbol: destination.tokenSymbol,
      chain_logo_uri: destination.chainImage,
      currency_role: "to",
      currency_address: currencyOut.currency.address,
      currency_symbol: currencyOut.currency.symbol,
      currency_name: currencyOut.currency.name,
      currency_logo_uri: currencyOut.currency.metadata.logoURI,
      decimals: currencyOut.currency.decimals,
      is_native: currencyOut.currency.metadata.isNative ?? false,
      amount: currencyOut.amount,
      amount_formatted: currencyOut.amountFormatted,
      amount_usd: currencyOut.amountUsd,
    },
  ]

  const payload: TransactionInput = {
    transaction_type: "bridge",
    user_address: userAddress,
    from_amount: currencyIn.amount,
    to_amount: currencyOut.amount,
    from_amount_usd: currencyIn.amountUsd,
    to_amount_usd: currencyOut.amountUsd,
    external_transaction_id: orderId || requestId || "",
    sender_address: quote.details.sender,
    recipient_address: quote.details.recipient,
    input_tx_hash: checkResult.inTxHashes?.[0],
    output_tx_hash: checkResult.txHashes?.[0],
    input_hash_explorer_url: origin.explorerUrl + "/tx/" + checkResult.inTxHashes?.[0],
    output_hash_explorer_url: destination.explorerUrl + "/tx/" + checkResult.txHashes?.[0],
    time_estimate: quote.details.timeEstimate.toString(),
    currencies,
    fees: [
      {
        fee_type: "app",
        fee_amount: quote.fees?.app?.amount,
        fee_amount_formatted: quote.fees?.app?.amountFormatted,
        fee_amount_usd: quote.fees?.app?.amountUsd,
        fee_currency_address: quote.fees?.app?.currency.address,
        fee_currency_symbol: quote.fees?.app?.currency.symbol,
        fee_currency_name: quote.fees?.app?.currency.name,
        fee_currency_logo_uri: quote.fees?.app?.currency.metadata.logoURI,
      },
    ],
    protocol: [
      {
        protocol_name: RELAY_APP_NAME,
        order_id: orderId || requestId,
        request_id: requestId || orderId,
      },
    ],
  }

  return payload
}

export const buildExchangeTransaction = (args: ExchangeBuildArgs): TransactionInput => {
  const {
    exchangeTransaction,
    origin,
    destination,
    userAddress,
    chains,
    fromAmountUsd,
    toAmountUsd,
  } = args

  const fromChainInfo = getChainInfoFromNetwork(exchangeTransaction.fromNetwork, chains)
  const toChainInfo = getChainInfoFromNetwork(exchangeTransaction.toNetwork, chains)

  const fromAmount =
    exchangeTransaction.amountFrom?.toString() ||
    exchangeTransaction.expectedAmountFrom?.toString() ||
    "0"
  const toAmount =
    exchangeTransaction.amountTo?.toString() ||
    exchangeTransaction.expectedAmountTo?.toString() ||
    "0"

  const calculateEstimatedTime = () => {
    const depositReceivedAt = new Date(exchangeTransaction.depositReceivedAt || "")
    const updatedAt = new Date(exchangeTransaction.updatedAt || "")
    const timeDifference = updatedAt.getTime() - depositReceivedAt.getTime()

    return Math.ceil(timeDifference / 1000)
  }

  const currencies: TransactionInput["currencies"] = [
    {
      chain_id: fromChainInfo?.id || 0,
      chain_name: fromChainInfo?.name || "",
      chain_symbol: fromChainInfo?.currency.symbol || "",
      chain_logo_uri: fromChainInfo?.iconUrl || "",
      currency_role: "from" as const,
      currency_address: "",
      currency_symbol: exchangeTransaction.fromCurrency.toUpperCase(),
      currency_name: origin.name,
      currency_logo_uri: origin.image,
      decimals: 18,
      is_native: false,
      amount: fromAmount,
      amount_formatted: fromAmount,
      amount_usd: fromAmountUsd,
    },
    {
      chain_id: toChainInfo?.id || 0,
      chain_name: toChainInfo?.name || "",
      chain_symbol: toChainInfo?.currency.symbol || "",
      chain_logo_uri: toChainInfo?.iconUrl || "",
      currency_role: "to" as const,
      currency_address: "",
      currency_symbol: exchangeTransaction.toCurrency.toUpperCase(),
      currency_name: destination.name,
      currency_logo_uri: destination.image,
      decimals: 18,
      is_native: false,
      amount: toAmount,
      amount_formatted: toAmount,
      amount_usd: toAmountUsd,
    },
  ]

  const payload: TransactionInput = {
    transaction_type: "swap",
    user_address: userAddress,
    from_amount: fromAmount,
    to_amount: toAmount,
    from_amount_usd: fromAmountUsd,
    to_amount_usd: toAmountUsd,
    external_transaction_id: exchangeTransaction.id,
    sender_address: exchangeTransaction.payinAddress,
    recipient_address: exchangeTransaction.payoutAddress,
    input_tx_hash: exchangeTransaction.payinHash || "",
    output_tx_hash: exchangeTransaction.payoutHash || "",
    input_hash_explorer_url: appendUrlToTxHash(
      origin.addressExplorerMask,
      exchangeTransaction.payinHash || ""
    ),
    output_hash_explorer_url: appendUrlToTxHash(
      destination.addressExplorerMask,
      exchangeTransaction.payoutHash || ""
    ),
    time_estimate: calculateEstimatedTime().toString(),
    currencies,
    fees: [],
    protocol: [
      {
        protocol_name: EXCHANGE_APP_NAME,
        order_id: exchangeTransaction.id,
        request_id: exchangeTransaction.id,
      },
    ],
  }

  return payload
}
