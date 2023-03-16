import React, { useContext, useRef } from "react"
import { Box, Button, IconButton, Paper, Typography } from "@mui/material"
import ReplayIcon from "@mui/icons-material/Replay"
import CloseIcon from "@mui/icons-material/Close"
import useChannels from "../../hooks/useChannels"
import useQueryParams from "../../hooks/useQueryParams"
import StreamContext from "../../streamReducer"

interface StreamFramesProps {
    removeStream: (stream: string) => void
    streams: Array<string>
}

const StreamFrames = ({ removeStream, streams }: StreamFramesProps) => {
    const channels = useQueryParams("channel")

    const getChannels = () => {
        return channels.getValuesAsArray()
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
            gap={1}
        >
            {streams.map((channel: string) => (
                <StreamFrameContainer
                    key={channel}
                    channel={channel}
                    removeChannel={removeStream}
                />
            ))}
        </Box>
    )
}

interface StreamFrameContainerProps {
    channel: string
    removeChannel: (channel: string) => void
}

const StreamFrameContainer = ({ channel, removeChannel }: StreamFrameContainerProps) => {
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
                        width="500px"
                        title="stream"
                        allowFullScreen
                    ></iframe>
                </Box>
            </Box>
        </Paper>
    )
}

export default StreamFrames
