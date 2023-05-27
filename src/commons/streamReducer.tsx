/* eslint-disable @typescript-eslint/no-empty-function */

import React, { createContext, useContext, useEffect, useReducer } from "react"
import useSearchParams from "./useSearchParams"

type StreamState = {
    streams: Array<string>
    selectedChannel: string
    chatIsVisible: boolean
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
          type: "SET_STREAMS"
          payload: Array<string>
      }
    | {
          type: "SWAP_STREAM_POSITIONS"
          payload: { channel1: string; channel2: string }
      }
    | {
          type: "SELECT_CHAT_CHANNEL"
          payload: string
      }
    | {
          type: "SET_CHAT_VISIBILITY"
          payload: boolean
      }

export const streamReducer = (state: StreamState, action: Action) => {
    switch (action.type) {
        case "ADD_STREAM":
            return { ...state, streams: [...state.streams, action.payload] }
        case "REMOVE_STREAM":
            return {
                ...state,
                streams: state.streams.filter((streamInState) => streamInState !== action.payload),
            }
        case "SET_STREAMS":
            return {
                ...state,
                streams: action.payload,
            }
        case "SWAP_STREAM_POSITIONS": {
            const index1 = state.streams.indexOf(action.payload.channel1)
            const index2 = state.streams.indexOf(action.payload.channel2)

            const swappedArray = [...state.streams]
            swappedArray[index1] = action.payload.channel2
            swappedArray[index2] = action.payload.channel1

            return { ...state, streams: [...swappedArray] }
        }
        case "SELECT_CHAT_CHANNEL":
            return {
                ...state,
                selectedChannel: action.payload,
            }
        case "SET_CHAT_VISIBILITY":
            return { ...state, chatIsVisible: action.payload }

        default:
            return state
    }
}

const initialState: StreamState = {
    streams: useSearchParams("streams").getAll(),
    selectedChannel: "",
    chatIsVisible: true,
}

const StateContext = createContext<{
    streamState: StreamState
    addStream: (channel: string) => void
    removeStream: (channel: string) => void
    swapStreamPositions: (channel1: string, channel2: string) => void
    selectChatChannel: (channel: string) => void
    setChatVisibility: (visibility: boolean) => void
}>({
    streamState: initialState,
    addStream: () => {},
    removeStream: () => {},
    swapStreamPositions: () => {},
    selectChatChannel: () => {},
    setChatVisibility: () => {},
})

interface StreamContextProviderProps {
    reducer: React.Reducer<StreamState, Action>
    children: React.ReactElement
}

export const StreamContextProvider = ({ reducer, children }: StreamContextProviderProps) => {
    const [streamState, dispatch] = useReducer(reducer, initialState)
    const streamsInSearchParams = useSearchParams("streams")

    useEffect(() => {
        if (!streamState.streams.includes(streamState.selectedChannel)) {
            selectChatChannel(streamState.streams[0] || "")
        }
    }, [streamState.streams])

    const addStream = (channel: string) => {
        if (streamState.streams.includes(channel)) {
            return
        }

        streamsInSearchParams.addToParams(channel)
        dispatch({ type: "ADD_STREAM", payload: channel })
    }

    const removeStream = (channel: string) => {
        streamsInSearchParams.removeFromParams(channel)
        dispatch({ type: "REMOVE_STREAM", payload: channel })
    }

    const swapStreamPositions = (channel1: string, channel2: string) => {
        dispatch({ type: "SWAP_STREAM_POSITIONS", payload: { channel1, channel2 } })
    }

    const selectChatChannel = (channel: string) => {
        dispatch({ type: "SELECT_CHAT_CHANNEL", payload: channel })
    }

    const setChatVisibility = (visibility: boolean) => {
        dispatch({ type: "SET_CHAT_VISIBILITY", payload: visibility })
    }

    const contextValue = {
        streamState,
        addStream,
        removeStream,
        swapStreamPositions,
        selectChatChannel,
        setChatVisibility,
    }

    return <StateContext.Provider value={contextValue}>{children}</StateContext.Provider>
}

export const useStreamContext = () => useContext(StateContext)
