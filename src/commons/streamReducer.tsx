/* eslint-disable @typescript-eslint/no-empty-function */

import React, { createContext, useContext, useEffect, useReducer } from "react"
import useSearchParams from "./useSearchParams"

interface Stream {
    channelName: string
    displayPosition: number
}

type StreamState = {
    streams: Array<Stream>
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
        case "ADD_STREAM": {
            const newStream: Stream = {
                channelName: action.payload,
                displayPosition: state.streams.length,
            }
            return {
                ...state,
                streams: [...state.streams, newStream],
            }
        }
        case "REMOVE_STREAM":
            return {
                ...state,
                streams: state.streams.filter((stream) => stream.channelName !== action.payload),
            }
        case "SET_STREAMS":
            return {
                ...state,
                streams: action.payload,
            }
        case "SWAP_STREAM_POSITIONS": {
            return { ...state }
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

const testArray: Array<Stream> = [
    { channelName: "test1", displayPosition: 0 },
    { channelName: "test2", displayPosition: 1 },
]

/*
    streams: useSearchParams("streams")
        .getAll()
        .map((streamFromParams, index) => ({
            channelName: streamFromParams,
            displayPosition: index,
        }))
*/

const initialState: StreamState = {
    streams: testArray,
    selectedChannel: "",
    chatIsVisible: true,
}

const StateContext = createContext<{
    streamState: StreamState
    addStream: (channel: string) => void
    removeStream: (channel: string) => void
    getChannelNames: () => Array<Stream>
    setStreams: (channelsArray: Array<string>) => void
    swapStreamPositions: (channel1: string, channel2: string) => void
    selectChatChannel: (channel: string) => void
    setChatVisibility: (visibility: boolean) => void
}>({
    streamState: initialState,
    addStream: () => {},
    removeStream: () => {},
    setStreams: () => {},
    getChannelNames: () => [],
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
        if (
            !streamState.streams.find(
                (stream) => stream.channelName === streamState.selectedChannel
            )
        ) {
            selectChatChannel(streamState.streams[0].channelName || "")
        }
    }, [streamState.streams])

    const addStream = (channel: string) => {
        if (streamState.streams.find((stream) => stream.channelName === channel)) {
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

    const setStreams = (channelsArray: Array<string>) => {
        dispatch({ type: "SET_STREAMS", payload: channelsArray })
    }

    const selectChatChannel = (channel: string) => {
        dispatch({ type: "SELECT_CHAT_CHANNEL", payload: channel })
    }

    const setChatVisibility = (visibility: boolean) => {
        dispatch({ type: "SET_CHAT_VISIBILITY", payload: visibility })
    }

    const getChannelNames = () => {
        return streamState.streams
            .sort((stream1, stream2) => stream1.displayPosition - stream2.displayPosition)
            .map((stream) => stream.channelName)
    }

    const contextValue = {
        streamState,
        addStream,
        removeStream,
        getChannelNames,
        setStreams,
        swapStreamPositions,
        selectChatChannel,
        setChatVisibility,
    }

    return <StateContext.Provider value={contextValue}>{children}</StateContext.Provider>
}

export const useStreamContext = () => useContext(StateContext)
