import { memo, useEffect, useRef } from "react"
import { Box } from "@mui/material"
import { useStreamContext } from "../../commons/streamReducer"
import getStreamDimensions from "./streamDimensions"

import StreamFrameContainer from "./StreamFrameContainer"

const StreamFrames = () => {
    const { streamState } = useStreamContext()

    const STREAM_BASEWIDTH = 1500
    const STREAM_BASEHEIGHT = 875

    return (
        <Box
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="center"
            alignContent="center"
            bgcolor="red"
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
                    >
                        <StreamFrameContainer
                            key={index}
                            channel={stream.channelName}
                            frameWidth={width}
                            frameHeight={height}
                        />
                    </Box>
                )
            })}
        </Box>
    )
}

export default memo(StreamFrames)
