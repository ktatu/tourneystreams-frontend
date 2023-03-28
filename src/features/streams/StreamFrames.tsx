import { useEffect, useRef } from "react"
import { Box, IconButton, Paper, TextField, Typography } from "@mui/material"
import ReplayIcon from "@mui/icons-material/Replay"
import CloseIcon from "@mui/icons-material/Close"
import { useStreamContext } from "../../commons/streamReducer"
import TwitchPlayer from "react-player/twitch"
import { stubTrue } from "lodash"

const StreamFrames = () => {
    const { streamState } = useStreamContext()

    return (
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
    )
}

interface StreamFrameContainerProps {
    channel: string
}

const StreamFrameContainer = ({ channel }: StreamFrameContainerProps) => {
    const { removeStream } = useStreamContext()
    const iframeRef = useRef<HTMLIFrameElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const playerRef = useRef<TwitchPlayer>(null)
    const boxRef = useRef<HTMLDivElement>(null)

    const handleStreamReload = () => {
        if (iframeRef.current) {
            // https://stackoverflow.com/questions/86428/what-s-the-best-way-to-reload-refresh-an-iframe/4062084#4062084
            // eslint-disable-next-line no-self-assign
            iframeRef.current.src = iframeRef.current.src
        }
    }

    const handleStreamClose = () => {
        removeStream(channel)
    }

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (!document.hidden && inputRef.current) {
                inputRef.current.focus()
            }
            //playerRef.current?.getInternalPlayer().blur()
        }

        document.addEventListener("visibilitychange", handleVisibilityChange)

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange)
        }
    }, [])

    return (
        <Paper elevation={10}>
            <Box
                display="flex"
                flexDirection="column"
                maxWidth="500px"
                maxHeight="340px"
                ref={boxRef}
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
                <Box>
                    <div onKeyDown={() => console.log("click")}>
                        <TwitchPlayer
                            url={`https://www.twitch.tv/${channel}`}
                            height="300px"
                            width="500px"
                            playing={true}
                            ref={playerRef}
                            controls={true}
                        />
                    </div>
                    <input
                        type="text"
                        ref={inputRef}
                    />
                </Box>
            </Box>
        </Paper>
    )
}

export default StreamFrames

/*
                    <iframe
                        ref={iframeRef}
                        src={`https://player.twitch.tv/?channel=${channel}&muted=true&parent=localhost`}
                        style={{ border: 0 }}
                        height="300px"
                        width="500px"
                        title="stream"
                        allowFullScreen
                        onBlur={() => console.log("blur")}
                        onFocus={() => console.log("focus")}
                    ></iframe>

*/
