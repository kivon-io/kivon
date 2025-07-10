export type AppActionType = { type: "SET_TOKEN_LIST_OPEN"; payload: boolean }

export const INITIAL_STATE = {
  tokenListOpen: false,
}

export const reducer = (state: typeof INITIAL_STATE, action: AppActionType) => {
  switch (action.type) {
    case "SET_TOKEN_LIST_OPEN":
      return { ...state, tokenListOpen: action.payload }
    default:
      return state
  }
}
