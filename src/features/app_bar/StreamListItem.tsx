import { Paper, Box, Typography, IconButton, Tooltip, useTheme } from "@mui/material"
import { useStreamContext } from "../../commons/streamReducer"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import CloseIcon from "@mui/icons-material/Close"
import SwapHorizIcon from "@mui/icons-material/SwapHoriz"

interface StreamListItemProps {
    channel: string
    oneStreamOpen: boolean
}

const StreamListItem = ({ channel, oneStreamOpen }: StreamListItemProps) => {
    const { removeStream } = useStreamContext()

    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: channel,
    })

    const theme = useTheme()

    const zIndex = isDragging ? theme.zIndex.appBar + 1 : 1

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex,
        position: "relative",
    } as React.CSSProperties

    const handleRemoveStream = () => {
        removeStream(channel)
    }

    return (
        <Paper
            variant="outlined"
            sx={{ width: 200, height: 50, textAlign: "center" }}
            ref={setNodeRef}
            style={style}
            {...attributes}
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
                    {!oneStreamOpen ? (
                        <IconButton
                            size="large"
                            sx={{ padding: 0 }}
                            {...listeners}
                        >
                            <Tooltip title="Move stream (hold and drag)">
                                <SwapHorizIcon fontSize="medium" />
                            </Tooltip>
                        </IconButton>
                    ) : null}
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

export default StreamListItem
