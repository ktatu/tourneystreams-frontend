import { useSnapshot } from "valtio"
import { streamsState } from "../commons/streamsState"

const streams = useSnapshot(streamsState)

const useStreams = () => {
    const addStream = (channel: string) => {
        if (streamsState.channels.includes(channel)) {
            return
        }

        streamsState.streams.push({
            channelName: channel,
            displayPosition: streamsState.streams.length,
        })
    }

    const removeStream = (channel: string) => {
        const indexToRemove = streamsState.streams.findIndex(
            (stream) => stream.channelName === channel
        )
        if (indexToRemove !== -1) {
            streamsState.streams.splice(indexToRemove, 1)
        }
    }

    const selectChatChannel = (channel: string) => {
        if (channel === streamsState.selectedChatChannel) {
            streamsState.selectedChatChannel = ""
        } else {
            streamsState.selectedChatChannel = channel
        }
    }

    const swapDisplayPositions = (channelName1: string, channelName2: string) => {
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

    return {
        streams,
        actions: { addStream, removeStream, selectChatChannel, swapDisplayPositions },
    }
}

export default useStreams
