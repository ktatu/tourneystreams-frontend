import { useEffect, useRef } from "react"
import { Box } from "@mui/material"
import { useStreamContext } from "../../commons/streamReducer"
import getStreamDimensions from "./streamDimensions"

import StreamFrameContainer from "./StreamFrameContainer"

const StreamFrames = () => {
    const { streamState } = useStreamContext()

    const invisibleButtonRef = useRef<HTMLButtonElement>(null)

    const STREAM_BASEWIDTH = 1500
    const STREAM_BASEHEIGHT = 875

    useEffect(() => {
        const handleStreamFocus = () => {
            if (!document.hidden && invisibleButtonRef.current) {
                invisibleButtonRef.current.focus()
            }
        }

        document.addEventListener("visibilitychange", handleStreamFocus)

        return () => {
            document.removeEventListener("visibilitychange", handleStreamFocus)
        }
    }, [])

    return (
        <Box
            display="flex"
            flexDirection="column"
            paddingLeft={1}
        >
            <button
                style={{ backgroundColor: "transparent", border: "none" }}
                ref={invisibleButtonRef}
            ></button>
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
        </Box>
    )
}

export default StreamFrames
