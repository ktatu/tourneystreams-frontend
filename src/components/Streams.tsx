import React, {
    useState,
    createRef,
    forwardRef,
    useRef,
    MutableRefObject,
} from "react"
import { Box, Button, IconButton, Typography } from "@mui/material"
import ReplayIcon from "@mui/icons-material/Replay"
import CloseIcon from "@mui/icons-material/Close"

interface EventHandler {
    (argument: string): void
}

const Streams = () => {
    const [channels, setChannels] = useState(["thijs"])

    const handleStreamClose: EventHandler = (channelName) => {
        setChannels(channels.filter((channel) => channel !== channelName))
    }

    return (
        <Box>
            {channels.map((channel: string) => (
                <StreamContainer
                    key={channel}
                    channel={channel}
                    closeStream={handleStreamClose}
                />
            ))}
        </Box>
    )
}

const StreamContainer = ({
    channel,
    closeStream,
}: {
    channel: string
    closeStream: EventHandler
}) => {
    const iframeRef = useRef<HTMLIFrameElement>(null)

    const reloadStream = () => {
        if (iframeRef.current) {
            // https://stackoverflow.com/questions/86428/what-s-the-best-way-to-reload-refresh-an-iframe/4062084#4062084
            // eslint-disable-next-line no-self-assign
            iframeRef.current.src = iframeRef.current.src
        }
    }

    return (
        <Box
            display="flex"
            flexDirection="column"
            maxWidth="532px"
            bgcolor="red"
        >
            <Box
                display="flex"
                flexDirection="row"
            >
                <Typography
                    marginTop={1}
                    sx={{ flexGrow: 1 }}
                >
                    {channel}
                </Typography>
                <IconButton onClick={reloadStream}>
                    <ReplayIcon />
                </IconButton>
                <IconButton onClick={() => closeStream(channel)}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <Box>
                <iframe
                    ref={iframeRef}
                    src={`https://player.twitch.tv/?channel=${channel}&parent=localhost`}
                    style={{ border: 0 }}
                    height="300"
                    width="532"
                    title="stream"
                    allowFullScreen
                ></iframe>
            </Box>
        </Box>
    )
}

export default Streams
