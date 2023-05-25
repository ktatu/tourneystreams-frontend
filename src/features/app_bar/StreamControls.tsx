import { Box, TextField, Button, Typography, Paper, IconButton, Tooltip } from "@mui/material"
import { useState } from "react"
import { useStreamContext } from "../../commons/streamReducer"
import CloseIcon from "@mui/icons-material/Close"
import PanToolIcon from "@mui/icons-material/PanTool"

const StreamControls = () => {
    const { streamState, addStream } = useStreamContext()
    const [addStreamFieldValue, setAddStreamFieldValue] = useState("")

    const handleAddStream = () => {
        if (!addStreamFieldValue) {
            return
        }
        addStream(addStreamFieldValue)
        setAddStreamFieldValue("")
    }

    const handleStreamField = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddStreamFieldValue(event.target.value)
    }

    return (
        <Box
            display="flex"
            gap={1}
            alignItems="center"
        >
            <TextField
                label="Add stream"
                placeholder="Channel name"
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
            <Box paddingRight={10} />
            {streamState.streams.map((channel) => (
                <StreamPaper
                    key={channel}
                    channel={channel}
                />
            ))}
        </Box>
    )
}

interface StreamPaperProps {
    channel: string
}

const StreamPaper = ({ channel }: StreamPaperProps) => {
    const { removeStream } = useStreamContext()

    const handleRemoveStream = () => {
        removeStream(channel)
    }

    return (
        <Paper
            elevation={10}
            variant="outlined"
            sx={{ width: 200, height: 50, textAlign: "center" }}
        >
            <Box
                width="100%"
                height="100%"
                display="flex"
                alignItems="center"
                paddingLeft={1}
                paddingRight={1}
            >
                <Typography
                    variant="button"
                    sx={{ userSelect: "none" }}
                >
                    {channel}
                </Typography>
                <Box flexGrow={1} />
                <Box
                    display="flex"
                    gap={1}
                >
                    <IconButton
                        size="large"
                        sx={{ padding: 0 }}
                    >
                        <Tooltip title="Move stream (hold and drag)">
                            <PanToolIcon fontSize="medium" />
                        </Tooltip>
                    </IconButton>
                    <IconButton
                        size="large"
                        sx={{ padding: 0 }}
                        onClick={handleRemoveStream}
                    >
                        <Tooltip title="Close stream">
                            <CloseIcon fontSize="medium" />
                        </Tooltip>
                    </IconButton>
                </Box>
            </Box>
        </Paper>
    )
}

export default StreamControls
