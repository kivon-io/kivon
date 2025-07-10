"use client"
import { createContext, useContext, useReducer, useState } from "react"
import { INITIAL_STATE, reducer } from "./context-reducer"

const AppContext = createContext<{
  state: typeof INITIAL_STATE
  type: "send" | "receive"
  toggleTokenList: () => void
  handleType: (type: "send" | "receive") => void
}>({
  state: INITIAL_STATE,
  type: "send",
  toggleTokenList: () => {},
  handleType: () => {},
})

export default AppContext

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)
  const [type, setType] = useState<"send" | "receive">("send")

  const toggleTokenList = () => {
    dispatch({ type: "SET_TOKEN_LIST_OPEN", payload: !state.tokenListOpen })
  }

  const handleType = (type: "send" | "receive") => {
    setType(type)
  }

  const values = {
    state,
    toggleTokenList,
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
