import { proxy, subscribe, useSnapshot } from "valtio"
import useSearchParams from "./useSearchParams"

const searchParams = useSearchParams("streams")

const initialStreamsFromParams: Array<Stream> = searchParams
    .getAll()
    .map((channel, index) => ({ channelName: channel, displayPosition: index }))

interface Stream {
    channelName: string
    displayPosition: number
}

interface StreamsState {
    selectedChatChannel: string
    streams: Array<Stream>
    readonly channels: Array<string>
    readonly sortedChannels: Array<string>
}

export const streamsState = proxy<StreamsState>({
    selectedChatChannel: initialStreamsFromParams[0]?.channelName || "",
    streams: initialStreamsFromParams,
    get channels() {
        return this.streams.map((stream: Stream) => stream.channelName)
    },
    get sortedChannels() {
        return this.streams
            .sort(
                (stream1: Stream, stream2: Stream) =>
                    stream1.displayPosition - stream2.displayPosition
            )
            .map((stream: Stream) => stream.channelName)
    },
})

/*
subscribe(streamsState.streams, () => {
    console.log("subscribe")
    searchParams.setParams(streamsState.channels)

    // sync chat with streams
    // closed a stream with its chat open? open another stream's chat if any streams open or remove chat
    const currentChatChannel = streamsState.selectedChatChannel

    if (currentChatChannel && !streamsState.channels.includes(currentChatChannel)) {
        selectChatChannel(streamsState.channels[0] || "")
    }
})*/

export const useStreamsState = () => useSnapshot(streamsState)

subscribe(streamsState, () => {
    console.log("subsub")
    searchParams.setParams(streamsState.channels)
})

export const addStream = (channel: string) => {
    if (streamsState.channels.includes(channel)) {
        return
    }

    streamsState.streams.push({
        channelName: channel,
        displayPosition: streamsState.streams.length,
    })
}

export const removeStream = (channel: string) => {
    const indexToRemove = streamsState.streams.findIndex((stream) => stream.channelName === channel)
    if (indexToRemove !== -1) {
        streamsState.streams.splice(indexToRemove, 1)
    }
}

export const selectChatChannel = (channel: string) => {
    if (channel === streamsState.selectedChatChannel) {
        streamsState.selectedChatChannel = ""
    } else {
        streamsState.selectedChatChannel = channel
    }
}

export const swapDisplayPositions = (channelName1: string, channelName2: string) => {
    console.log("+++")
    const stream1InState = streamsState.streams.find(
        (stream) => stream.channelName === channelName1
    )

    const stream2InState = streamsState.streams.find(
        (stream) => stream.channelName === channelName2
    )

    if (!(stream1InState && stream2InState)) {
        console.log("---")
        return
    }

    console.log("streams ", streamsState.streams)

    streamsState.streams = streamsState.streams.map((stream) => {
        if (stream.channelName === stream1InState.channelName) {
            return {
                channelName: stream.channelName,
                displayPosition: stream2InState.displayPosition,
            }
        }
        if (stream.channelName === stream2InState.channelName) {
            return {
                channelName: stream.channelName,
                displayPosition: stream1InState.displayPosition,
            }
        }

        return stream
    })

    console.log("streams ", streamsState.streams)
    //console.log("streams with swapped ", streamswithSwapped)
}
