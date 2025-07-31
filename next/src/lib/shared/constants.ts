export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME
export const CHANGE_NOW_API_URL = process.env.NEXT_PUBLIC_CHANGE_NOW_API_URL
export const CHANGE_NOW_API_URL_v1 = process.env.NEXT_PUBLIC_CHANGE_NOW_API_URL_V1
export const APP_URL = process.env.APP_URL!
export const RELAY_LINK_API_URL = process.env.NEXT_PUBLIC_RELAY_LINK_BASE_URL

export const EXCHANGE_PARAMS_DEFAULT = {
  FLOW: "standard",
  BUY: false,
  SELL: false,
  ACTIVE: true,
}

export const FLOW_TYPE = {
  FIXED: "fixed-rate",
  STANDARD: "standard",
} as const

export const EXCHANGE_TYPE = {
  SEND: "send",
  RECEIVE: "receive",
} as const

export const DEFAULT_DECIMALS = 18
