import React, { useReducer, useRef, useState } from "react"
import { Box, Button, IconButton, Skeleton, Typography } from "@mui/material"
import ReplayIcon from "@mui/icons-material/Replay"
import CloseIcon from "@mui/icons-material/Close"
import { useSelector } from "react-redux"
import { ChannelState } from "../reducers/channelReducer"
import useChannels from "../hooks/useChannels"
import { TwitchPlayer } from "react-twitch-embed"
import { TwitchPlayerInstance } from "react-twitch-embed/dist/types"
import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "../store"

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
            gap="10px"
        >
            {channels.map((channel: string, index: number) => (
                <StreamContainer
                    key={channel}
                    channel={channel}
                    closeStream={handleStreamClose}
                    id={index.toString()}
                />
            ))}
        </Box>
    )
}

const makeSelectChannel = () =>
    createSelector(
        (state: RootState) => state.channels.selectedChannels,
        (_: any, channelName: string) => channelName,
        (selectedChannels, channelName) =>
            selectedChannels.find((channel: string) => channel === channelName)
    )

const StreamContainer = ({
    channel,
    closeStream,
    id,
}: {
    channel: string
    closeStream: EventHandler
    id: string
}) => {
    const [streamStatus, setStreamStatus] = useState<StreamStatus>(StreamStatus.Unknown)
    const [_, forceUpdate] = useReducer((x) => x + 1, 0)
    const playerRef = useRef<TwitchPlayerInstance>()

    const channelsHook = useChannels()

    const handleStreamClose: EventHandler = (channel) => {
        channelsHook.removeStream(channel)
    }

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

    /*
    if (streamStatus === "OFFLINE") {
        closeStream(channel)
        return null
    }*/

    return (
        <Box>
            <Box display={streamStatus === "UNKNOWN" ? "flex" : "none"}>
                <Skeleton
                    variant="rectangular"
                    width="532px"
                    height="300px"
                />
            </Box>
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
                    <IconButton onClick={() => handleStreamClose(channel)}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Box>
                    <TwitchPlayer
                        id={id}
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
        </Box>
    )
}

export default Streams
