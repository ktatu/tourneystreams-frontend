import React, { createContext, useContext, useReducer } from "react"

type StreamState = {
    streams: Array<string>
}

type Action =
    | {
          type: "ADD"
          payload: string
      }
    | {
          type: "REMOVE"
          payload: string
      }

export const streamReducer = (state: StreamState, action: Action) => {
    const channel = action.payload
    console.log("calling reducer with action: ", action)

    switch (action.type) {
        case "ADD":
            if (state.streams.includes(channel)) {
                return state
            }
            return {
                ...state,
                streams: state.streams.concat(channel),
            }
        case "REMOVE":
            return {
                ...state,
                streams: state.streams.filter((streamInState) => streamInState !== channel),
            }
        default:
            return state
    }
}

const initialState: StreamState = {
    streams: [],
}

const StateContext = createContext<[StreamState, React.Dispatch<Action>]>([
    initialState,
    () => initialState,
])

interface StreamContextProviderProps {
    reducer: React.Reducer<StreamState, Action>
    children: React.ReactElement
}

export const StreamContextProvider = ({ reducer, children }: StreamContextProviderProps) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return <StateContext.Provider value={[state, dispatch]}>{children}</StateContext.Provider>
}

export const useStreamState = () => useContext(StateContext)
