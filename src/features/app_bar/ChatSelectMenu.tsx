import { MenuList, MenuItem } from "@mui/material"
import { useStreamContext } from "../../commons/streamReducer"

interface ChatSelectMenuProps {
    handleMenuClose: () => void
}

const ChatSelectMenu = ({ handleMenuClose }: ChatSelectMenuProps) => {
    const { streamState, selectChatChannel, getChannelNames } = useStreamContext()

    const handleChatChange = (newChannel: string): void => {
        selectChatChannel(newChannel)
        handleMenuClose()
    }

    return (
        <MenuList>
            {getChannelNames().map((channel) => {
                return (
                    <MenuItem
                        key={channel}
                        selected={channel === streamState.selectedChannel}
                        onClick={() => handleChatChange(channel)}
                    >
                        {channel}
                    </MenuItem>
                )
            })}
        </MenuList>
    )
}

export default ChatSelectMenu
