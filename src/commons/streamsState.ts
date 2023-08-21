import { proxy } from "valtio"
import { Stream } from "./streamReducer"
import searchParams from "./searchParams"

interface StreamsState {
    chatIsVisible: boolean
    selectedChatChannel: string
    streams: Array<Stream>
    readonly channels: Array<string>
    readonly sortedChannels: Array<string>
}

const initialStreamsFromParams: Array<Stream> = searchParams("streams")
    .getAll()
    .map((channel, index) => ({ channelName: channel, displayPosition: index }))

export const streamsState = proxy<StreamsState>({
    chatIsVisible: true,
    selectedChatChannel: initialStreamsFromParams[0].channelName || "",
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
    streamsState.streams = streamsState.streams.filter((stream) => stream.channelName !== channel)
}

export const selectChatChannel = (channel: string) => {
    streamsState.selectedChatChannel === channel
}
