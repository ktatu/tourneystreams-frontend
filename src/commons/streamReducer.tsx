import React, { createContext, useContext, useEffect, useReducer } from "react"
import useSearchParams from "./useSearchParams"

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

    switch (action.type) {
        case "ADD":
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

const StateContext = createContext<{
    streamState: StreamState
    addStream: (channel: string) => void
    removeStream: (channel: string) => void
    // eslint-disable-next-line @typescript-eslint/no-empty-function
}>({ streamState: initialState, addStream: () => {}, removeStream: () => {} })

interface StreamContextProviderProps {
    reducer: React.Reducer<StreamState, Action>
    children: React.ReactElement
}

export const StreamContextProvider = ({ reducer, children }: StreamContextProviderProps) => {
    const [streamState, dispatch] = useReducer(reducer, initialState)
    const streamsInSearchParams = useSearchParams("streams")

    useEffect(() => {
        streamsInSearchParams.setParams(streamState.streams)
    }, [streamState])

    const addStream = (channel: string) => {
        if (streamState.streams.includes(channel)) {
            return
        }
        dispatch({ type: "ADD", payload: channel })
    }

    const removeStream = (channel: string) => {
        dispatch({ type: "REMOVE", payload: channel })
    }

    const contextValue = {
        streamState,
        addStream,
        removeStream,
    }

    return <StateContext.Provider value={contextValue}>{children}</StateContext.Provider>
}

export const useStreamContext = () => useContext(StateContext)
