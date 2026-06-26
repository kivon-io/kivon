export const RELAY_LINK_API_URL =
  process.env.NEXT_PUBLIC_RELAY_LINK_BASE_URL ?? "https://api.relay.link"

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? "Kivon"

export const DEFAULT_DECIMALS = 18

export const PROTOCOL_VERSION = {
  V1: "v1",
  V2: "v2",
  PREFER_V2: "preferV2",
} as const

export const TRADE_TYPE = {
  EXACT_INPUT: "EXACT_INPUT",
  EXACT_OUTPUT: "EXACT_OUTPUT",
  EXPECTED_OUTPUT: "EXPECTED_OUTPUT",
} as const

export const VM_TYPES = {
  BVM: "bvm",
  EVM: "evm",
  SVM: "svm",
  TVM: "tvm",
  TONVM: "tonvm",
  SUIVM: "suivm",
  HYPEVM: "hypevm",
} as const
