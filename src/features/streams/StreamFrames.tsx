import { useEffect, useRef, useState } from "react"
import { Box, IconButton, Paper, Typography } from "@mui/material"
import ReplayIcon from "@mui/icons-material/Replay"
import CloseIcon from "@mui/icons-material/Close"
import { useStreamContext } from "../../commons/streamReducer"
import TwitchPlayer from "react-player/twitch"
import TailSpinner from "./TailSpinner"

const StreamFrames = () => {
    const { streamState } = useStreamContext()

    const invisibleButtonRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (!document.hidden && invisibleButtonRef.current) {
                invisibleButtonRef.current.focus()
            }
        }

        document.addEventListener("visibilitychange", handleVisibilityChange)

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange)
        }
    }, [])

    return (
        <Box
            display="flex"
            flexDirection="column"
        >
            <button
                style={{ backgroundColor: "transparent", border: "none" }}
                ref={invisibleButtonRef}
            ></button>
            <Box
                display="flex"
                flexDirection="row"
                flexWrap="wrap"
                paddingLeft={1}
                gap={1}
            >
                {streamState.streams.map((channel: string) => (
                    <StreamFrameContainer
                        key={channel}
                        channel={channel}
                    />
                ))}
            </Box>
        </Box>
    )
}

interface StreamFrameContainerProps {
    channel: string
}

const StreamFrameContainer = ({ channel }: StreamFrameContainerProps) => {
    const [streamReady, setStreamReady] = useState(false)
    const { removeStream } = useStreamContext()

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

    const iframeRef = useRef<HTMLIFrameElement>(null)

    const handleStreamReload = () => {
        if (iframeRef.current) {
            // https://stackoverflow.com/questions/86428/what-s-the-best-way-to-reload-refresh-an-iframe/4062084#4062084
            // eslint-disable-next-line no-self-assign
            iframeRef.current.src = iframeRef.current.src
        }
    }

    const handleStreamReady = () => {
        setStreamReady(true)
    }

    const handleStreamClose = () => {
        removeStream(channel)
    }

    return (
        <Paper elevation={10}>
            <Box
                display="flex"
                flexDirection="column"
                maxWidth="500px"
                maxHeight="340px"
            >
                <Box
                    display="flex"
                    flexDirection="row"
                    height="40px"
                >
                    <Typography
                        marginLeft={1}
                        marginTop={1}
                        sx={{ flexGrow: 1 }}
                    >
                        {channel}
                    </Typography>
                    <IconButton onClick={handleStreamReload}>
                        <ReplayIcon />
                    </IconButton>
                    <IconButton onClick={handleStreamClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <>
                    <div hidden={!streamReady}>
                        <TwitchPlayer
                            id={`${channel}-player`}
                            url={`https://www.twitch.tv/${channel}`}
                            height="300px"
                            width="500px"
                            playing={true}
                            onReady={handleStreamReady}
                            volume={0}
                            controls={true}
                        />
                    </div>
                    <div hidden={streamReady}>
                        <StreamFramePlaceholder />
                    </div>
                </>
            </Box>
        </Paper>
    )
}

const StreamFramePlaceholder = () => {
    return (
        <Box
            bgcolor="black"
            display="flex"
            alignContent="center"
            justifyContent="center"
            width="500px"
            height="300px"
        >
            <TailSpinner
                color="#FFFFFF"
                spinnerWidth="5px"
                containerWidth="300px"
                containerHeight="300px"
            />
        </Box>
    )
}

export default StreamFrames
