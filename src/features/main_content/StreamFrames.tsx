import { memo } from "react"
import { Box } from "@mui/material"
import getStreamDimensions from "./streamDimensions"
import StreamFrameContainer from "./StreamFrameContainer"
import { useStreamsState } from "../../commons/streamsState"

const StreamFrames = () => {
    const { streams } = useStreamsState()

    return (
        <Box
            alignContent="center"
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="center"
            height="100%"
            overflow="hidden"
        >
            {streams.map((stream, index) => {
                const { width, height } = getStreamDimensions(
                    streams.length,
                    stream.displayPosition
                )

                return (
                    <Box
                        key={index}
                        order={stream.displayPosition}
                        minHeight={`${height}%`}
                        minWidth={`${width}%`}
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
