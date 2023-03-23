import React, { useEffect, useState, useRef } from "react"
import { Box, MenuList, MenuItem, Paper, Typography } from "@mui/material"
import PopupMenu, { PopupMenuClose } from "../../commons/PopupMenu"
import useQueryParams from "../../hooks/useQueryParams"
import { useStreamContext } from "../../commons/streamReducer"

type ChangeChannelHandler = (newChannel: string) => void

const Chat = () => {
    //const [selectedChannel, setSelectedChannel] = useState("")
    const { streamState } = useStreamContext()
    const streams = streamState.streams
    const selectedChannel = streamState.selectedChannel

    /*
    useEffect(() => {
        if (!streams.includes(selectedChannel)) {
            setSelectedChannel(streams[0] || "")
        }
    }, [streams])*/

    /*
    const handleChatChange: ChangeChannelHandler = (newChannel: string): void => {
        setSelectedChannel(newChannel)
        if (chatMenuRef.current) {
            chatMenuRef.current.handleClose()
        }
    }*/

    const chatMenuRef = useRef<PopupMenuClose>(null)

    if (!selectedChannel) {
        return null
    }

    return (
        <iframe
            src={`https://www.twitch.tv/embed/${selectedChannel}/chat?darkpopout&parent=localhost`}
            style={{ border: "none" }}
            width="320px"
        ></iframe>
    )
}

const ChatMenuContent = ({
    channels,
    selectedChannel,
    handleClick,
}: {
    channels: string[]
    selectedChannel: string
    handleClick: ChangeChannelHandler
}) => {
    return (
        <MenuList>
            {channels.map((channel) => {
                return (
                    <MenuItem
                        key={channel}
                        selected={channel === selectedChannel}
                        onClick={(event) => handleClick(channel)}
                    >
                        {channel}
                    </MenuItem>
                )
            })}
        </MenuList>
    )
}

export default Chat

/*
            <Box>
                <PopupMenu
                    buttonProps={{
                        buttonText: selectedChannel,
                        buttonIcon: <KeyboardArrowDownIcon />,
                    }}
                    menuContent={
                        <ChatMenuContent
                            channels={streams}
                            selectedChannel={selectedChannel}
                            handleClick={handleChatChange}
                        />
                    }
                    ref={chatMenuRef}
                />
            </Box>
*/
