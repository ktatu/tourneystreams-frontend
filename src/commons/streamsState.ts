import { proxy, subscribe, useSnapshot } from "valtio"
import { Stream, StreamSource } from "../types"
import useSearchParams from "./useSearchParams"

interface StreamsState {
    selectedChat: Stream | null
    streams: Array<Stream>
    readonly identifiers: Array<string>
    readonly identifiersSortedByPos: Array<string>
}

const searchParams = useSearchParams("streams")

const parseStreamFromParam = (param: string) => {
    const [parsedSource, id] = param.split(":")
    const streamSource: StreamSource =
        parsedSource === "twitch" ? StreamSource.TWITCH : StreamSource.YOUTUBE

    return { id, streamSource }
}

const initialStreams = searchParams.getAll().map((param, index) => {
    const { id, streamSource } = parseStreamFromParam(param)
    return { id, streamSource, displayPosition: index }
})

export const streamsState = proxy<StreamsState>({
    selectedChat: null,
    streams: initialStreams,
    get identifiers() {
        return this.streams.map((stream: Stream) => stream.id)
    },
    get identifiersSortedByPos() {
        return this.streams
            .sort(
                (stream1: Stream, stream2: Stream) =>
                    stream1.displayPosition - stream2.displayPosition,
            )
            .map((stream: Stream) => stream.id)
    },
})

export const useStreamsState = () => useSnapshot(streamsState)

export const addStream = (id: string, streamSource: StreamSource) => {
    if (streamsState.identifiers.includes(id)) {
        return
    }

    streamsState.streams.push({
        id,
        streamSource,
        displayPosition: streamsState.streams.length,
    })
}

export const removeStream = (id: string) => {
    const indexToRemove = streamsState.streams.findIndex((stream) => stream.id === id)
    if (indexToRemove !== -1) {
        streamsState.streams.splice(indexToRemove, 1)
    }
}

export const selectChatChannel = (streamId: string) => {
    if (streamId === streamsState.selectedChat?.id) {
        streamsState.selectedChat = null
    } else {
        streamsState.selectedChat =
            streamsState.streams.find((stream) => stream.id === streamId) || null
    }
}

export const swapDisplayPositions = (id1: string, id2: string) => {
    const stream1 = streamsState.streams.find((stream) => stream.id === id1)
    const stream2 = streamsState.streams.find((stream) => stream.id === id2)

    if (!(stream1 && stream2)) {
        return
    }

    console.log("aaaa")

    const stream1Clone = JSON.parse(JSON.stringify(stream1))
    const stream2Clone = JSON.parse(JSON.stringify(stream2))

    stream1.displayPosition = stream2Clone.displayPosition
    stream2.displayPosition = stream1Clone.displayPosition
}

subscribe(streamsState.streams, () => {
    const streamsAsParams = streamsState.streams.map(
        (stream) => `${stream.streamSource}:${stream.id}`,
    )
    searchParams.setParams(streamsAsParams)

    if (
        streamsState.selectedChat &&
        !streamsState.identifiers.includes(streamsState.selectedChat.id)
    ) {
        streamsState.selectedChat = null
    }
})
