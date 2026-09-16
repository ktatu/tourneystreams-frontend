import { proxy, subscribe, useSnapshot } from "valtio"
import { Stream, StreamSource, StreamUserInput } from "../types"
import useSearchParams from "./useSearchParams"

interface StreamsState {
    selectedChatId: string
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
    selectedChatId: "",
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

export const addStream = (streamInput: StreamUserInput) => {
    if (streamsState.identifiers.includes(streamInput.id)) {
        return
    }

    streamsState.streams.push({
        ...streamInput,
        displayPosition: streamsState.streams.length,
    })
}

export const removeStream = (id: string) => {
    const indexToRemove = streamsState.streams.findIndex((stream) => stream.id === id)
    if (indexToRemove !== -1) {
        streamsState.streams.splice(indexToRemove, 1)
    }
}

export const selectChatChannel = (channel: string) => {
    if (channel === streamsState.selectedChatId) {
        streamsState.selectedChatId = ""
    } else {
        streamsState.selectedChatId = channel
    }
}

export const swapDisplayPositions = (id1: string, id2: string) => {
    const stream1 = streamsState.streams.find((stream) => stream.id === id1)
    const stream2 = streamsState.streams.find((stream) => stream.id === id2)

    if (!(stream1 && stream2)) {
        return
    }

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

    if (!streamsState.identifiers.includes(streamsState.selectedChatId)) {
        selectChatChannel(streamsState.identifiers[0] || "")
    }
})
