import { useEffect, useRef, useState } from "react"
import { Box, IconButton, Tooltip, Typography } from "@mui/material"
import { useStreamContext } from "../../commons/streamReducer"
import TwitchPlayer from "react-player/twitch"
import TailSpinner from "./TailSpinner"

import ReplayIcon from "@mui/icons-material/Replay"
import CloseIcon from "@mui/icons-material/Close"
import PanToolIcon from "@mui/icons-material/PanTool"

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

interface StreamFrameContainerProps {
    channel: string
    frameSize: { width: number; height: number }
}

const StreamFrameContainer = ({ channel, frameSize }: StreamFrameContainerProps) => {
    // Streamkey is used for reloading the stream
    const [streamKey, setStreamKey] = useState(Math.random())
    const [streamReady, setStreamReady] = useState(false)
    const [showControlsOverlay, setShowControlsOverlay] = useState(false)

    const { removeStream, streamState } = useStreamContext()

    const handleMouseEnterAndLeave = () => {
        setShowControlsOverlay((prevValue) => !prevValue)
    }

    useEffect(() => {
        let timeoutId

        if (showControlsOverlay) {
            timeoutId = setTimeout(() => {
                setShowControlsOverlay(false)
            }, 5000)
        }
    }, [showControlsOverlay])

    useEffect(() => {
        const timeoutID = setTimeout(() => {
            if (!streamReady) {
                removeStream(channel)
            }
        }, 10000)

        return () => {
            clearTimeout(timeoutID)
        }
    }, [streamReady])

    const handleStreamReload = () => {
        setStreamReady(false)
        setStreamKey((streamKey) => streamKey + 1)
    }

    const handleStreamReady = () => {
        setStreamReady(true)
    }

    const handleStreamEnded = () => {
        // reload because sometimes ended stream gets frozen on ads
        handleStreamReload()
        // TODO: notification to user
    }

    // box maxwidth 500px maxheight 340px
    // player height 300px width 500px
    /*
                    height={`${width * 0.5625}px`}
                    width={`${width}px`}
    */

    return (
        <Box
            alignContent="center"
            justifyContent="center"
        >
            <div hidden={!streamReady}>
                <div
                    style={{ position: "relative", display: "flex" }}
                    onMouseMove={() => null}
                    onMouseEnter={handleMouseEnterAndLeave}
                    onMouseLeave={handleMouseEnterAndLeave}
                >
                    <TwitchPlayer
                        key={streamKey}
                        id={`${channel}-player`}
                        url={`https://www.twitch.tv/${channel}`}
                        height={frameSize.height}
                        width={frameSize.width}
                        playing={true}
                        onReady={handleStreamReady}
                        volume={0}
                        controls={true}
                        onEnded={handleStreamEnded}
                    />
                    {showControlsOverlay ? (
                        <Box
                            display="flex"
                            position="absolute"
                            width="100%"
                            top="0%"
                            justifyContent="center"
                            gap={2}
                        >
                            <Box
                                display="flex"
                                paddingTop={2}
                                gap={5}
                            >
                                <IconButton>
                                    <Tooltip title="Reload stream">
                                        <ReplayIcon
                                            fontSize="large"
                                            sx={{ transform: "scale(2.0)" }}
                                        />
                                    </Tooltip>
                                </IconButton>
                                {streamState.streams.length > 1 ? (
                                    <IconButton>
                                        <Tooltip title="Move stream (hold and drag)">
                                            <PanToolIcon
                                                fontSize="large"
                                                sx={{ transform: "scale(1.5)" }}
                                            />
                                        </Tooltip>
                                    </IconButton>
                                ) : null}
                                <IconButton>
                                    <Tooltip title="Close stream">
                                        <CloseIcon
                                            fontSize="large"
                                            sx={{ transform: "scale(2.0)" }}
                                        />
                                    </Tooltip>
                                </IconButton>
                            </Box>
                        </Box>
                    ) : null}
                </div>
            </div>
            <div hidden={streamReady}>
                <StreamFramePlaceholder frameSize={frameSize} />
            </div>
        </Box>
    )
}

interface StreamFrameWrapperProps {
    children: JSX.Element
}

const StreamFrameWrapper = ({ children }: StreamFrameWrapperProps) => {
    const [mouseEntered, setMouseEntered] = useState(false)

    const handleMouseEnterAndLeave = () => {
        setMouseEntered((prevValue) => !prevValue)
    }

    return (
        <div
            style={{ position: "relative" }}
            onMouseEnter={() => handleMouseEnterAndLeave}
            onMouseLeave={() => handleMouseEnterAndLeave}
        >
            {children}
        </div>
    )
}

interface StreamPlaceholderProps {
    frameSize: { width: number; height: number }
}

const StreamFramePlaceholder = ({ frameSize }: StreamPlaceholderProps) => {
    return (
        <Box
            bgcolor="black"
            display="flex"
            height={frameSize.height}
            width={frameSize.width}
        >
            <TailSpinner
                color="#FFFFFF"
                spinnerWidth="5px"
                containerHeight={`${frameSize.height}px`}
                containerWidth={`${frameSize.width}px`}
            />
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
