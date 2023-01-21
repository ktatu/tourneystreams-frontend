import React, {
    useState,
    createRef,
    forwardRef,
    useRef,
    MutableRefObject,
} from "react"
import { Box, Button, Typography } from "@mui/material"

interface EventHandler {
    (argument: string): void
}

const Stream = () => {
    const [channels, setChannels] = useState(["thijs"])

    const handleStreamClose: EventHandler = (channelName) => {
        setChannels(channels.filter((channel) => channel !== channelName))
    }

    return (
        <Box>
            {channels.map((channel: string) => (
                <StreamBox
                    key={channel}
                    channel={channel}
                    closeStream={handleStreamClose}
                />
            ))}
        </Box>
    )
}

const StreamBox = ({
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
                <Typography sx={{ flexGrow: 1 }}>{channel}</Typography>
                <Button onClick={reloadStream}>Reload</Button>
                <Button onClick={() => closeStream(channel)}>Close</Button>
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

export default Stream
