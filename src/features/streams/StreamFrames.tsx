import { useEffect, useRef } from "react"
import { Box } from "@mui/material"
import { useStreamContext } from "../../commons/streamReducer"

import StreamFrameContainer from "./StreamFrameContainer"

const StreamFrames = () => {
    const { streamState } = useStreamContext()

    const invisibleButtonRef = useRef<HTMLButtonElement>(null)

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
            >
                {streamState.streams.map((channel: string, index: number) => (
                    <StreamFrameContainer
                        key={channel}
                        channel={channel}
                        frameSize={getStreamFrameSize(streamState.streams.length, index)}
                    />
                ))}
            </Box>
        </Box>
    )
}

// TODO: % based sizes
const getStreamFrameSize = (streamCount: number, streamIndex: number) => {
    const baseWidth = 1500
    const baseHeight = 875

    switch (streamCount) {
        case 1:
            return { width: baseWidth, height: baseHeight }
        case 2:
            return { width: baseWidth, height: baseHeight / 2 }
        case 3:
            if (streamIndex === 0) {
                return { width: baseWidth, height: baseHeight / 2 }
            } else {
                return { width: baseWidth / 2, height: baseHeight / 2 }
            }
        case 4:
            return { width: baseWidth / 2, height: baseHeight / 2 }
        case 5:
            if (streamIndex <= 1) {
                return { width: baseWidth / 2, height: baseHeight / 2 }
            } else {
                return { width: baseWidth / 3, height: baseHeight / 2 }
            }
        case 6:
            return { width: baseWidth / 3, height: baseHeight / 2 }
        case 7:
            if (streamIndex <= 2) {
                return { width: baseWidth / 3, height: baseHeight / 2 }
            } else {
                return { width: baseWidth / 4, height: baseHeight / 3 }
            }
        case 8:
            return { width: baseWidth / 4, height: baseHeight / 2 }
        default:
            return { width: baseWidth / 3, height: baseHeight / 3 }
    }
}

export default StreamFrames
