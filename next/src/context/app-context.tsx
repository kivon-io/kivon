"use client"
import { createContext, useContext, useReducer, useState } from "react"
import { INITIAL_STATE, reducer } from "./context-reducer"

const AppContext = createContext<{
  state: typeof INITIAL_STATE
  type: "send" | "receive"
  toggleTokenList: () => void
  toggleBridgeTokenList: () => void
  handleType: (type: "send" | "receive") => void
}>({
  state: INITIAL_STATE,
  type: "send",
  toggleTokenList: () => {},
  toggleBridgeTokenList: () => {},
  handleType: () => {},
})

export default AppContext

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)
  const [type, setType] = useState<"send" | "receive">("send")

  const toggleTokenList = () => {
    dispatch({ type: "SET_TOKEN_LIST_OPEN", payload: !state.tokenListOpen })
  }

  const toggleBridgeTokenList = () => {
    dispatch({ type: "SET_BRIDGE_TOKEN_LIST_OPEN", payload: !state.bridgeTokenListOpen })
  }

  const handleType = (type: "send" | "receive") => {
    setType(type)
  }

  const values = {
    state,
    toggleTokenList,
    toggleBridgeTokenList,
    type,
    handleType,
  }

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>
}

const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}

export { AppProvider, useAppContext }
