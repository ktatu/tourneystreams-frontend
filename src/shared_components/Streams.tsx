import React, { useRef } from "react"
import { Box, Button, IconButton, Typography } from "@mui/material"
import ReplayIcon from "@mui/icons-material/Replay"
import CloseIcon from "@mui/icons-material/Close"
import { ChannelState } from "../reducers/channelReducer"
import useChannels from "../hooks/useChannels"
import { useAppSelector } from "../hooks/reduxHooks"

const Streams = () => {
    const channels = useAppSelector(({ channels }: { channels: ChannelState }) => {
        return channels.selectedChannels
    })

    return (
        <Box
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            gap="10px"
        >
            {channels.map((channel: string) => (
                <StreamContainer
                    key={channel}
                    channel={channel}
                />
            ))}
        </Box>
    )
}

const StreamContainer = ({ channel }: { channel: string }) => {
    const iframeRef = useRef<HTMLIFrameElement>(null)
    const channelsHook = useChannels()

    const handleStreamReload = () => {
        if (iframeRef.current) {
            // https://stackoverflow.com/questions/86428/what-s-the-best-way-to-reload-refresh-an-iframe/4062084#4062084
            // eslint-disable-next-line no-self-assign
            iframeRef.current.src = iframeRef.current.src
        }
    }

    const handleStreamClose = (channel: string) => {
        channelsHook.removeStream(channel)
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
                <IconButton onClick={handleStreamReload}>
                    <ReplayIcon />
                </IconButton>
                <IconButton onClick={() => handleStreamClose(channel)}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <Box>
                <iframe
                    ref={iframeRef}
                    src={`https://player.twitch.tv/?channel=${channel}&muted=true&parent=localhost`}
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
