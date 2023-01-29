import React, { useReducer, useRef, useState } from "react"
import { Box, Button, IconButton, Typography } from "@mui/material"
import ReplayIcon from "@mui/icons-material/Replay"
import CloseIcon from "@mui/icons-material/Close"
import { useSelector } from "react-redux"
import { ChannelState } from "../reducers/channelReducer"
import useChannels from "../hooks/useChannels"
import { TwitchPlayer } from "react-twitch-embed"
import { TwitchPlayerInstance } from "react-twitch-embed/dist/types"

interface EventHandler {
    (argument: string): void
}

enum StreamStatus {
    Online = "ONLINE",
    Offline = "OFFLINE",
    Unknown = "UNKNOWN",
}

const Streams = () => {
    const channels = useSelector(({ channels }: { channels: ChannelState }) => {
        return channels.selectedChannels
    })
    const channelsHook = useChannels()

    const handleStreamClose: EventHandler = (channelName) => {
        channelsHook.removeStream(channelName)
    }

    return (
        <Box
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
        >
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
    const [streamStatus, setStreamStatus] = useState<StreamStatus>(StreamStatus.Unknown)
    const [_, forceUpdate] = useReducer((x) => x + 1, 0)
    const playerRef = useRef<TwitchPlayerInstance>()

    const reloadStream = () => {
        // https://reactjs.org/docs/hooks-faq.html#is-there-something-like-forceupdate
        // I haven't found a way to reload the actual stream using TwitchPlayer, so rerender the component instead
        forceUpdate()
    }

    const handlePlayerReady = (playerInstance: TwitchPlayerInstance) => {
        playerRef.current = playerInstance
    }

    const handleChannelStatus = (newStatus: StreamStatus) => {
        if (playerRef.current) {
            setStreamStatus(newStatus)
        }
    }

    if (streamStatus === "OFFLINE") {
        closeStream(channel)
        return null
    }

    return (
        <Box
            display={streamStatus === "ONLINE" ? "flex" : "none"}
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
                <TwitchPlayer
                    width={532}
                    height={300}
                    channel={channel}
                    muted
                    onOffline={() => handleChannelStatus(StreamStatus.Offline)}
                    onOnline={() => handleChannelStatus(StreamStatus.Online)}
                    onReady={handlePlayerReady}
                />
            </Box>
        </Box>
    )
}

export default Streams

/*
                <iframe
                    ref={iframeRef}
                    src={`https://player.twitch.tv/?channel=${channel}&muted=true&parent=localhost`}
                    style={{ border: 0 }}
                    height="300"
                    width="532"
                    title="stream"
                    allowFullScreen
                ></iframe>


const StreamContainer = ({
    channel,
    closeStream,
}: {
    channel: string
    closeStream: EventHandler
}) => {
    //const iframeRef = useRef<HTMLIFrameElement>(null)
    
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
                <TwitchPlayer channel={channel} muted onReady={}
            </Box>
        </Box>
    )
}

*/
