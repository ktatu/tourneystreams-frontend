import { MenuList, MenuItem } from "@mui/material"
import { useStreamContext } from "../../commons/streamReducer"

interface ChatSelectMenuProps {
    handleMenuClose: () => void
}

const ChatSelectMenu = ({ handleMenuClose }: ChatSelectMenuProps) => {
    const { streamState, selectChatChannel } = useStreamContext()

    const handleChatChange = (newChannel: string): void => {
        selectChatChannel(newChannel)
        handleMenuClose()
    }

    return (
        <MenuList>
            {streamState.streams.map((channel) => {
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
