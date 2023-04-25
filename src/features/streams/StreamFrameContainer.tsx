import { Box, ButtonBase, Tooltip } from "@mui/material"
import { useState, useEffect, useRef } from "react"
import TwitchPlayer from "react-player/twitch"
import { useStreamContext } from "../../commons/streamReducer"
import TailSpinner from "./TailSpinner"

import ReplayIcon from "@mui/icons-material/Replay"
import CloseIcon from "@mui/icons-material/Close"
import PanToolOutlinedIcon from "@mui/icons-material/PanToolOutlined"

interface StreamFrameContainerProps {
    channel: string
    frameSize: { width: number; height: number }
}

const StreamFrameContainer = ({ channel, frameSize }: StreamFrameContainerProps) => {
    // Streamkey is used for reloading the stream
    const [streamKey, setStreamKey] = useState(1)
    const [streamReady, setStreamReady] = useState(false)
    const [showControlsOverlay, setShowControlsOverlay] = useState(false)

    const { removeStream, streamState } = useStreamContext()

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

    const handleStreamClose = () => {
        removeStream(channel)
    }

    const handleStreamReload = () => {
        setStreamReady(false)
        setStreamKey((streamKey) => streamKey + 1)
    }

    const handleStreamReady = () => {
        setStreamReady(true)
    }

    const timeoutRef = useRef<number>()

    const handleMouseMove = () => {
        clearTimeout(timeoutRef.current)
        setShowControlsOverlay(true)

        // Typescript infers timeoutId without window. as type NodeJS.Timeout
        const timeoutId = window.setTimeout(() => {
            setShowControlsOverlay(false)
        }, 5000)

        timeoutRef.current = timeoutId
    }

    const handleMouseLeave = () => {
        clearTimeout(timeoutRef.current)

        setShowControlsOverlay(false)
    }

    // box maxwidth 500px maxheight 340px
    // player height 300px width 500px
    /*
                    height={`${width * 0.5625}px`}
                    width={`${width}px`}
    */

    const twitchPlayerRef = useRef<TwitchPlayer>(null)

    return (
        <Box
            alignContent="center"
            justifyContent="center"
        >
            <div hidden={!streamReady}>
                <div
                    style={{
                        position: "relative",
                        display: "flex",
                        height: frameSize.height,
                        width: frameSize.width,
                    }}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
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
                        controls={false}
                        onEnded={handleStreamReload} // Reload because sometimes ended streams freeze on ads
                        ref={twitchPlayerRef}
                    />

                    <Box
                        display="flex"
                        position="absolute"
                        width="100%"
                        minHeight="10%"
                        top="0%"
                        justifyContent="center"
                        gap={2}
                        onMouseMove={handleMouseMove}
                    >
                        <div hidden={!showControlsOverlay ? true : false}>
                            <Box
                                position="relative"
                                display="flex"
                                padding={1}
                                gap={3}
                                border="10px double white"
                            >
                                <div>
                                    <ButtonBase
                                        disableRipple
                                        sx={{ padding: 2 }}
                                        onClick={handleStreamReload}
                                    >
                                        <Tooltip title="Reload stream">
                                            <ReplayIcon
                                                fontSize="large"
                                                sx={{ transform: "scale(2.0)" }}
                                            />
                                        </Tooltip>
                                    </ButtonBase>
                                </div>
                                <div>
                                    {streamState.streams.length > 1 ? (
                                        <ButtonBase
                                            disableRipple
                                            sx={{ padding: 2 }}
                                        >
                                            <Tooltip title="Move stream (hold and drag)">
                                                <PanToolOutlinedIcon
                                                    fontSize="large"
                                                    sx={{
                                                        transform: "scale(1.5)",
                                                        "&hover": {
                                                            backgroundColor: "transparent",
                                                        },
                                                    }}
                                                />
                                            </Tooltip>
                                        </ButtonBase>
                                    ) : null}
                                </div>
                                <div>
                                    <ButtonBase
                                        disableRipple
                                        sx={{ padding: 2 }}
                                        onClick={handleStreamClose}
                                    >
                                        <Tooltip title="Close stream">
                                            <CloseIcon
                                                fontSize="large"
                                                sx={{ transform: "scale(2.0)" }}
                                            />
                                        </Tooltip>
                                    </ButtonBase>
                                </div>
                            </Box>
                        </div>
                    </Box>
                </div>
            </div>
            <div hidden={streamReady}>
                <StreamFramePlaceholder frameSize={frameSize} />
            </div>
        </Box>
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

export default StreamFrameContainer
