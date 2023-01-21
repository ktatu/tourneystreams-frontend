import React, { useState, createRef, forwardRef } from "react"
import { Box, Button } from "@mui/material"

interface EventHandler {
    (argument: string): void
}

const Stream = () => {
    const [channels, setChannels] = useState(["imaqtpie"])

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
    return (
        <Box
            display="flex"
            flexDirection="column"
        >
            <Box>
                <Button onClick={() => closeStream(channel)}>Click</Button>
            </Box>
            <Box>
                <iframe
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
