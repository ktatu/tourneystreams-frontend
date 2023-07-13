import { memo } from "react"
import { Box } from "@mui/material"
import { useStreamContext } from "../../commons/streamReducer"
import getStreamDimensions from "./streamDimensions"

import StreamFrameContainer from "./StreamFrameContainer"

const StreamFrames = () => {
    const { streamState } = useStreamContext()

    const STREAM_BASEWIDTH = 100
    const STREAM_BASEHEIGHT = 100

    return (
        <Box
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="center"
            alignContent="center"
            height="100%"
        >
            {streamState.streams.map((stream, index) => {
                const { width, height } = getStreamDimensions(
                    streamState.streams.length,
                    stream.displayPosition,
                    STREAM_BASEWIDTH,
                    STREAM_BASEHEIGHT
                )

                return (
                    <Box
                        key={index}
                        order={stream.displayPosition}
                        height={`${height}%`}
                        width={`${width}%`}
                        overflow="hidden"
                    >
                        <StreamFrameContainer channel={stream.channelName} />
                    </Box>
                )
            })}
        </Box>
    )
}

export default memo(StreamFrames)
