/* eslint-disable @typescript-eslint/no-empty-function */

import React, { createContext, useContext, useEffect, useReducer } from "react"
import useSearchParams from "./useSearchParams"

type StreamState = {
    streams: Array<string>
    selectedChannel: string
}

type Action =
    | {
          type: "ADD_STREAM"
          payload: string
      }
    | {
          type: "REMOVE_STREAM"
          payload: string
      }
    | {
          type: "SELECT_CHAT_CHANNEL"
          payload: string
      }

export const streamReducer = (state: StreamState, action: Action) => {
    const channel = action.payload

    switch (action.type) {
        case "ADD_STREAM":
            return {
                ...state,
                streams: state.streams.concat(channel),
            }
        case "REMOVE_STREAM":
            return {
                ...state,
                streams: state.streams.filter((streamInState) => streamInState !== channel),
            }
        case "SELECT_CHAT_CHANNEL":
            return {
                ...state,
                selectedChannel: channel,
            }
        default:
            return state
    }
}

const initialState: StreamState = {
    streams: [],
    selectedChannel: "",
}

const StateContext = createContext<{
    streamState: StreamState
    addStream: (channel: string) => void
    removeStream: (channel: string) => void
    selectChatChannel: (channel: string) => void
}>({
    streamState: initialState,
    addStream: () => {},
    removeStream: () => {},
    selectChatChannel: () => {},
})

interface StreamContextProviderProps {
    reducer: React.Reducer<StreamState, Action>
    children: React.ReactElement
}

export const StreamContextProvider = ({ reducer, children }: StreamContextProviderProps) => {
    const [streamState, dispatch] = useReducer(reducer, initialState)
    const streamsInSearchParams = useSearchParams("streams")

    useEffect(() => {
        streamsInSearchParams.setParams(streamState.streams)
    }, [streamState.streams])

    useEffect(() => {
        if (!streamState.streams.includes(streamState.selectedChannel)) {
            selectChatChannel(streamState.streams[0] || "")
        }
    }, [streamState.streams])

    const addStream = (channel: string) => {
        if (streamState.streams.includes(channel)) {
            return
        }
        dispatch({ type: "ADD_STREAM", payload: channel })
    }

    const removeStream = (channel: string) => {
        dispatch({ type: "REMOVE_STREAM", payload: channel })
    }

    const selectChatChannel = (channel: string) => {
        dispatch({ type: "SELECT_CHAT_CHANNEL", payload: channel })
    }

    const contextValue = {
        streamState,
        addStream,
        removeStream,
        selectChatChannel,
    }

    return <StateContext.Provider value={contextValue}>{children}</StateContext.Provider>
}

export const useStreamContext = () => useContext(StateContext)
