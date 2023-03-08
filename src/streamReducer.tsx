import React, { createContext, useReducer } from "react"

type State = {
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

const streamReducer = (state: State, action: Action) => {
    const stream = action.payload

    switch (action.type) {
        case "ADD":
            if (state.streams.includes(stream)) {
                return state
            }
            return {
                ...state,
                streams: state.streams.concat(stream),
            }
        case "REMOVE":
            return {
                ...state,
                streams: state.streams.filter((streamInState) => streamInState !== stream),
            }
        default:
            return state
    }
}

const initialState: State = {
    streams: [],
}

const StateContext = createContext<[State, React.Dispatch<Action>]>([
    initialState,
    () => initialState,
])

interface StateProviderProps {
    reducer: React.Reducer<State, Action>
    children: React.ReactElement
}

export const StreamContextProvider = ({ reducer, children }: StateProviderProps) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return <StateContext.Provider value={[state, dispatch]}>{children}</StateContext.Provider>
}

export default StateContext
