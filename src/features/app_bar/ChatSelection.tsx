// AI-generated fix by GitHub Copilot (Claude Sonnet 4.5): switched from Menu/Popover to Popper so opening this dropdown no longer aria-hides (and thus pauses autoplay on) the embedded Twitch player elsewhere on the page.
import { Comment, KeyboardArrowDown } from "@mui/icons-material"
import { Button, ClickAwayListener, MenuItem, MenuList, Paper, Popper } from "@mui/material"
import { bindPopper, bindTrigger, usePopupState } from "material-ui-popup-state/hooks"
import { useStreamsState } from "../../commons/streamsState"

const ChatSelection = () => {
    const { selectedChat, streams } = useStreamsState()
    const popupState = usePopupState({ variant: "popper", popupId: "chatSelectionMenu" })

    return (
        <>
            <Button
                endIcon={<KeyboardArrowDown fontSize="large" />}
                startIcon={<Comment fontSize="large" />}
                {...bindTrigger(popupState)}
                variant="contained"
            >
                {selectedChat ? selectedChat.id : "None"}
            </Button>
            <Popper
                {...bindPopper(popupState)}
                placement="bottom-start"
                sx={{ zIndex: (theme) => theme.zIndex.modal }}
            >
                <ClickAwayListener onClickAway={() => popupState.close()}>
                    <Paper>
                        <MenuList>
                            {streams.map((stream, index) => (
                                <MenuItem
                                    key={index}
                                    onClick={popupState.close}
                                >
                                    {stream.id}
                                </MenuItem>
                            ))}
                        </MenuList>
                    </Paper>
                </ClickAwayListener>
            </Popper>
        </>
    )
}

export default ChatSelection
