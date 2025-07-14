export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME
export const CHANGE_NOW_API_URL = process.env.NEXT_PUBLIC_CHANGE_NOW_API_URL
export const CHANGE_NOW_API_URL_v1 = process.env.NEXT_PUBLIC_CHANGE_NOW_API_URL_V1

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
