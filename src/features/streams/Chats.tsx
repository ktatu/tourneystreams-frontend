import React, { useEffect, useState, useRef } from "react"
import { Box, MenuList, MenuItem, Paper } from "@mui/material"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import PopupMenu, { PopupMenuClose } from "../../commons/PopupMenu"
import useQueryParams from "../../hooks/useQueryParams"
import { useStreamState } from "../../commons/streamReducer"

type ChangeChannelHandler = (newChannel: string) => void

const Chats = () => {
    const [selectedChannel, setSelectedChannel] = useState<string>("")
    const [{ streams }] = useStreamState()

    //const useChannels = useQueryParams("channel")

    useEffect(() => {
        if (!streams.includes(selectedChannel)) {
            setSelectedChannel(streams[0] || "")
        }
    }, [streams])

    /*
    const getChannels = () => {
        return useChannels.getValuesAsArray()
    }*/

    const handleChatChange: ChangeChannelHandler = (newChannel: string): void => {
        setSelectedChannel(newChannel)
        if (chatMenuRef.current) {
            chatMenuRef.current.handleClose()
        }
    }

    const chatMenuRef = useRef<PopupMenuClose>(null)

    if (!selectedChannel) {
        return null
    }

    return (
        <Box
            display="flex"
            flexDirection="column"
        >
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
            <Paper sx={{ height: "750px", width: "310px" }}>
                <iframe
                    src={`https://www.twitch.tv/embed/${selectedChannel}/chat?darkpopout&parent=localhost`}
                    style={{ border: 0 }}
                    height="750px"
                    width="320px"
                ></iframe>
            </Paper>
        </Box>
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

export default Chats
