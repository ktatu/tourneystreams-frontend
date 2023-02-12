import { useEffect, useState, useRef } from "react"
import { Box, MenuList, MenuItem, Paper } from "@mui/material"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import PopupMenu, { PopupMenuClose } from "./PopupMenu"
import { useAppSelector } from "../hooks/reduxHooks"
import { ChannelState } from "../reducers/channelReducer"
import useQueryParams from "../hooks/useQueryParams"

type ChangeChannelHandler = (newChannel: string) => void

const Chats = () => {
    const [selectedChannel, setSelectedChannel] = useState<string>("")

    const useChannels = useQueryParams("channel")
    const channels = useChannels.getValues()

    useEffect(() => {
        if (!channels.includes(selectedChannel)) {
            setSelectedChannel(channels[0] || "")
        }
    }, [channels])

    const getChannels = () => {
        return useChannels.getValues()
    }

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
                            channels={channels}
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
