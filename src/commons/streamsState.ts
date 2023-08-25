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

const streamsState = proxy<StreamsState>({
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

export const useStreamsState = () => useSnapshot(streamsState)

subscribe(streamsState.streams, () => {
    searchParams.setParams(streamsState.channels)

    if (!streamsState.channels.includes(streamsState.selectedChatChannel)) {
        selectChatChannel(streamsState.channels[0] || "")
    }
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
    const stream1 = streamsState.streams.find((stream) => stream.channelName === channelName1)
    const stream2 = streamsState.streams.find((stream) => stream.channelName === channelName2)

    if (!(stream1 && stream2)) {
        return
    }

    const stream1Clone = JSON.parse(JSON.stringify(stream1))
    const stream2Clone = JSON.parse(JSON.stringify(stream2))

    stream1.displayPosition = stream2Clone.displayPosition
    stream2.displayPosition = stream1Clone.displayPosition
}
