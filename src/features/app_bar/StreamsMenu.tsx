import { Box, Button, IconButton, Stack, TextField, Tooltip, Typography } from "@mui/material"
import PopupMenu, { PopupMenuClose } from "../../commons/PopupMenu"
import { useRef, useState } from "react"
import { useStreamContext } from "../../commons/streamReducer"
import CloseIcon from "@mui/icons-material/Close"

const StreamsMenu = () => {
    const streamsMenuRef = useRef<PopupMenuClose>(null)

    return (
        <>
            <PopupMenu
                buttonProps={{ buttonText: "Streams" }}
                ref={streamsMenuRef}
            >
                <StreamsMenuContent />
            </PopupMenu>
        </>
    )
}

const StreamsMenuContent = () => {
    const { streamState, addStream } = useStreamContext()
    const [addStreamFieldValue, setAddStreamFieldValue] = useState("")

    const handleAddStream = () => {
        if (!addStreamFieldValue) {
            return
        }
        addStream(addStreamFieldValue)
    }

    const handleStreamField = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddStreamFieldValue(event.target.value)
    }

    return (
        <Stack
            padding={1}
            gap={2}
        >
            <Box
                display="flex"
                gap={1}
            >
                <TextField
                    label="Channel name"
                    variant="outlined"
                    onChange={handleStreamField}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddStream}
                >
                    <Typography variant="h4">+</Typography>
                </Button>
            </Box>
            <Box
                display="flex"
                width="100%"
                justifyContent="center"
            >
                <ManageStreamBox channel="imaqtpie" />
            </Box>
        </Stack>
    )
}

interface ManageStreamBoxProps {
    channel: string
}

const ManageStreamBox = ({ channel }: ManageStreamBoxProps) => {
    const { removeStream } = useStreamContext()

    const handleRemoveStream = () => {
        removeStream(channel)
    }

    return (
        <Box
            display="flex"
            flexDirection="column"
            width={200}
            height={120}
            border={1}
        >
            <Box
                display="flex"
                justifyContent="flex-end"
                gap={1}
            >
                <IconButton
                    size="large"
                    sx={{ padding: 0 }}
                    onClick={handleRemoveStream}
                >
                    <Tooltip title="Close stream">
                        <CloseIcon fontSize="large" />
                    </Tooltip>
                </IconButton>
            </Box>
            <Box
                display="flex"
                justifyContent="center"
                alignSelf="center"
                paddingTop={1}
            >
                <Typography>{channel}</Typography>
            </Box>
        </Box>
    )
}

export default StreamsMenu
