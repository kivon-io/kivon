import type { CheckResultT } from "@/lib/wallet/use-execute-steps"
import type { TransactionInput } from "@/trpc/routers/transactions"
import { RELAY_APP_NAME } from "../shared/constants"

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
