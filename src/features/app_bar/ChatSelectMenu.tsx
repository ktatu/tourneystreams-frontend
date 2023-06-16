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
        <MenuList sx={{ display: "flex", flexDirection: "column" }}>
            {streamState.streams.map((stream) => {
                return (
                    <MenuItem
                        key={stream.channelName}
                        selected={stream.channelName === streamState.selectedChannel}
                        onClick={() => handleChatChange(stream.channelName)}
                        sx={{ order: stream.displayPosition }}
                    >
                        {stream.channelName}
                    </MenuItem>
                )
            })}
        </MenuList>
    )
}

export default ChatSelectMenu
