import { useState, useRef } from "react"
import { Box, MenuList, MenuItem } from "@mui/material"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import PopupMenu, { PopupMenuClose } from "./PopupMenu"

type ChangeChannelHandler = (newChannel: string) => void

const Chats = () => {
    const [channels, setChannels] = useState(["tfue", "imaqtpie", "thijs"])
    const [selectedChannel, setSelectedChannel] = useState<string>("thijs")

    const changeChatChannel: ChangeChannelHandler = (newChannel: string): void => {
        setSelectedChannel(newChannel)
        if (chatMenuRef.current) {
            chatMenuRef.current.handleClose()
        }
    }

    const chatMenuRef = useRef<PopupMenuClose>(null)

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
                            handleClick={changeChatChannel}
                        />
                    }
                    ref={chatMenuRef}
                />
            </Box>
            <Box>
                <iframe
                    src={`https://www.twitch.tv/embed/${selectedChannel}/chat?parent=localhost`}
                    style={{ border: 0 }}
                    height="800"
                    width="350"
                ></iframe>
            </Box>
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
