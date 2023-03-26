import { MenuList, MenuItem } from "@mui/material"
import { useStreamContext } from "../../commons/streamReducer"

const ChatSelectMenu = () => {
    const { streamState, selectChatChannel } = useStreamContext()

    const handleChatChange = (newChannel: string): void => {
        selectChatChannel(newChannel)
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
