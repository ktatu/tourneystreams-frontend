import { useRef, useState } from "react"
import {
    AppBar as MuiAppBar,
    Button,
    Box,
    Toolbar,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    MenuItem,
    MenuList,
} from "@mui/material"
import useQueryParams from "./hooks/useQueryParams"
import { useStreamContext } from "./commons/streamReducer"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import PopupMenu, { PopupMenuClose } from "./commons/PopupMenu"
import streams from "./features/streams"

const AppBar = () => {
    const [togglePageValue, setTogglePageValue] = useState("/")
    const { streamState, selectChatChannel } = useStreamContext()

    const channels = useQueryParams("channel")
    const chatMenuRef = useRef<PopupMenuClose>(null)

    const handleChatChange: ChangeChannelHandler = (newChannel: string): void => {
        selectChatChannel(newChannel)
    }

    return (
        <Box flexGrow={1}>
            <MuiAppBar
                position="fixed"
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
                <Toolbar sx={{ gap: "50px" }}>
                    <ToggleButtonGroup
                        value={togglePageValue}
                        exclusive
                    >
                        <ToggleButton value="/">Show</ToggleButton>
                        <ToggleButton value="/streamview">Hide</ToggleButton>
                    </ToggleButtonGroup>
                    <Box flexGrow={1}>
                        <AddStreamField />
                    </Box>
                    {streamState.selectedChannel && (
                        <Box>
                            <PopupMenu
                                buttonProps={{
                                    buttonText: streamState.selectedChannel,
                                    buttonIcon: <KeyboardArrowDownIcon />,
                                }}
                                menuContent={
                                    <ChatMenuContent
                                        channels={streamState.streams}
                                        selectedChannel={streamState.selectedChannel}
                                        handleClick={handleChatChange}
                                    />
                                }
                                ref={chatMenuRef}
                            />
                        </Box>
                    )}
                </Toolbar>
            </MuiAppBar>
        </Box>
    )
}

const AddStreamField = () => {
    const [fieldValue, setFieldValue] = useState("")
    const channels = useQueryParams("channel")
    const { addStream } = useStreamContext()

    const handleAddStream = () => {
        if (fieldValue === "") {
            return
        }
        addStream(fieldValue)
    }

    return (
        <Box
            display="flex"
            marginLeft="10px"
            gap={1}
        >
            <TextField
                sx={{ bgcolor: "grey" }}
                label="channel name"
                variant="outlined"
                value={fieldValue}
                onChange={(event) => setFieldValue(event.target.value)}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleAddStream}
            >
                Add stream
            </Button>
        </Box>
    )
}

type ChangeChannelHandler = (newChannel: string) => void

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

export default AppBar
