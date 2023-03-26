import { Box, IconButton } from "@mui/material"
import { useState, useRef } from "react"
import PopupMenu, { PopupMenuClose } from "../../commons/PopupMenu"
import { useStreamContext } from "../../commons/streamReducer"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import VisibilityIcon from "@mui/icons-material/Visibility"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import ChatSelectMenu from "./ChatSelectMenu"

const ChatControls = () => {
    const { streamState, setChatVisibility } = useStreamContext()

    const chatMenuRef = useRef<PopupMenuClose>(null)

    const handleChatVisibilityChange = (newValue: boolean) => {
        setChatVisibility(newValue)
    }

    if (streamState.streams.length === 0) {
        return null
    }

    return (
        <>
            {streamState.selectedChannel && streamState.chatIsVisible && (
                <>
                    <PopupMenu
                        buttonProps={{
                            buttonText: streamState.selectedChannel,
                            buttonIcon: <KeyboardArrowDownIcon />,
                        }}
                        menuContent={<ChatSelectMenu />}
                        ref={chatMenuRef}
                    />
                </>
            )}
            <Box paddingLeft={5}>
                {streamState.chatIsVisible ? (
                    <IconButton onClick={() => handleChatVisibilityChange(false)}>
                        <VisibilityOffIcon />
                    </IconButton>
                ) : (
                    <IconButton onClick={() => handleChatVisibilityChange(true)}>
                        <VisibilityIcon />
                    </IconButton>
                )}
            </Box>
        </>
    )
}

export default ChatControls
