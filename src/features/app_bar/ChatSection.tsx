import { Box, IconButton, Tooltip } from "@mui/material"
import { useRef } from "react"
import PopupMenu, { PopupMenuClose } from "../../commons/PopupMenu"
import { useStreamContext } from "../../commons/streamReducer"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import ChatSelectMenu from "./ChatSelectMenu"
import CommentIcon from "@mui/icons-material/Comment"
import CommentsDisabledIcon from "@mui/icons-material/CommentsDisabled"

const ChatSection = () => {
    const { streamState, setChatVisibility } = useStreamContext()

    const chatMenuRef = useRef<PopupMenuClose>(null)

    const handleChatVisibilityChange = (newValue: boolean) => {
        setChatVisibility(newValue)
    }

    if (streamState.streams.length === 0) {
        return null
    }

    const handleMenuClose = () => {
        if (chatMenuRef.current) {
            chatMenuRef.current.handleClose()
        }
    }

    return (
        <>
            {streamState.selectedChannel &&
                streamState.chatIsVisible &&
                streamState.streams.length > 1 && (
                    <>
                        <PopupMenu
                            buttonProps={{
                                buttonText: streamState.selectedChannel,
                                buttonIcon: <KeyboardArrowDownIcon />,
                            }}
                            ref={chatMenuRef}
                        >
                            <ChatSelectMenu handleMenuClose={handleMenuClose} />
                        </PopupMenu>
                    </>
                )}
            <Box paddingLeft={5}>
                {streamState.chatIsVisible ? (
                    <IconButton onClick={() => handleChatVisibilityChange(false)}>
                        <Tooltip title="Hide chat">
                            <CommentsDisabledIcon />
                        </Tooltip>
                    </IconButton>
                ) : (
                    <IconButton onClick={() => handleChatVisibilityChange(true)}>
                        <Tooltip title="Show chat">
                            <CommentIcon />
                        </Tooltip>
                    </IconButton>
                )}
            </Box>
        </>
    )
}

export default ChatSection
