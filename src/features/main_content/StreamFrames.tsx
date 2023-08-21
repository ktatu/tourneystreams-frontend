import { memo } from "react"
import { Box } from "@mui/material"
import getStreamDimensions from "./streamDimensions"
import StreamFrameContainer from "./StreamFrameContainer"
import { streamsState } from "../../commons/streamsState"
import { useSnapshot } from "valtio/react"

const StreamFrames = () => {
    const { streams } = useSnapshot(streamsState)

    const STREAM_BASEWIDTH = 100
    const STREAM_BASEHEIGHT = 100

    // eslint-disable-next-line
    console.log("render stream frames")

    return (
        <Box
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="center"
            alignContent="center"
            height="100%"
        >
            {streams.map((stream, index) => {
                const { width, height } = getStreamDimensions(
                    streams.length,
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
