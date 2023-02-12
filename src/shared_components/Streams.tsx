import React, { useRef } from "react"
import { Box, Button, IconButton, Paper, Typography } from "@mui/material"
import ReplayIcon from "@mui/icons-material/Replay"
import CloseIcon from "@mui/icons-material/Close"
import { ChannelState } from "../reducers/channelReducer"
import useChannels from "../hooks/useChannels"
import { useAppSelector } from "../hooks/reduxHooks"
import useQueryParams from "../hooks/useQueryParams"

const Streams = () => {
    const channels = useQueryParams("channel")

    const getChannels = () => {
        return channels.getValues()
    }
    const removeChannel = (channel: string) => {
        channels.removeValue(channel)
    }

    return (
        <Box
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            paddingLeft={5}
            gap="5px"
        >
            {getChannels().map((channel: string) => (
                <StreamContainer
                    key={channel}
                    channel={channel}
                    removeChannel={removeChannel}
                />
            ))}
        </Box>
    )
}

interface StreamContainerProps {
    channel: string
    removeChannel: (channel: string) => void
}

const StreamContainer = ({ channel, removeChannel }: StreamContainerProps) => {
    const iframeRef = useRef<HTMLIFrameElement>(null)

    const handleStreamReload = () => {
        if (iframeRef.current) {
            // https://stackoverflow.com/questions/86428/what-s-the-best-way-to-reload-refresh-an-iframe/4062084#4062084
            // eslint-disable-next-line no-self-assign
            iframeRef.current.src = iframeRef.current.src
        }
    }

    const handleStreamClose = (channel: string) => {
        removeChannel(channel)
    }

    return (
        <Paper
            elevation={10}
            sx={{ height: "max-content" }}
        >
            <Box
                display="flex"
                flexDirection="column"
                maxWidth="520px"
                height="340px"
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
                    <IconButton onClick={() => handleStreamClose(channel)}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Box>
                    <iframe
                        ref={iframeRef}
                        src={`https://player.twitch.tv/?channel=${channel}&muted=true&parent=localhost`}
                        style={{ border: 0 }}
                        height="300px"
                        width="520px"
                        title="stream"
                        allowFullScreen
                    ></iframe>
                </Box>
            </Box>
        </Paper>
    )
}

export default Streams
