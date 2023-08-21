import { proxy } from "valtio"
import { Stream } from "./streamReducer"

interface StreamsState {
    chatIsVisible: boolean
    selectedChatChannel: string
    streams: Array<Stream>
    readonly channels: Array<string>
    readonly sortedChannels: Array<string>
}

export const streamsState = proxy<StreamsState>({
    chatIsVisible: true,
    selectedChatChannel: "",
    streams: [
        { channelName: "k3soju", displayPosition: 0 },
        { channelName: "JokerdTV", displayPosition: 1 },
    ],
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
    //eslint-disable-next-line
    console.log("remove stream")
    streamsState.streams = streamsState.streams.filter((stream) => stream.channelName !== channel)
}

export const selectChatChannel = (channel: string) => {
    streamsState.selectedChatChannel === channel
}
