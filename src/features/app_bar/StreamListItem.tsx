import { Paper, Box, Typography, IconButton, Tooltip } from "@mui/material"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import CloseIcon from "@mui/icons-material/Close"
import SwapHorizIcon from "@mui/icons-material/SwapHoriz"
import CommentIcon from "@mui/icons-material/Comment"
import { removeStream, selectChatChannel } from "../../commons/streamsState"
import { memo } from "react"

interface StreamListItemProps {
    channel: string
    channelChatIsSelected: boolean
    oneStreamOpen: boolean
}

const StreamListItem = ({ channel, channelChatIsSelected, oneStreamOpen }: StreamListItemProps) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: channel,
    })

    const zIndex = isDragging ? 1000 : 1

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex,
        position: "relative",
    } as React.CSSProperties

    const handleRemoveStream = () => {
        removeStream(channel)
    }

    const handleSelectChatChannel = () => {
        selectChatChannel(channel)
    }

    /*
    useEffect(() => {
        setThisChannelIsSelected(streamsState.selectedChatChannel === channel)

        const unsubscribe = subscribeKey(streamsState, "selectedChatChannel", (selectedChannel) => {
            if (selectedChannel === channel) {
                console.log("setting selected ", channel)
                setThisChannelIsSelected(true)
            }
        })

        return unsubscribe
    }, [])*/

    return (
        <Paper
            variant="outlined"
            sx={{ minWidth: 200, height: 50, textAlign: "center" }}
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
                <Box display="flex">
                    {!oneStreamOpen && (
                        <IconButton
                            size="large"
                            {...listeners}
                            sx={{ padding: 0.5 }}
                        >
                            <Tooltip title="Move stream (hold and drag)">
                                <SwapHorizIcon fontSize="medium" />
                            </Tooltip>
                        </IconButton>
                    )}
                    <IconButton
                        size="large"
                        sx={{ opacity: channelChatIsSelected ? 1 : 0.3, padding: 0.5 }}
                        onClick={handleSelectChatChannel}
                    >
                        <Tooltip title="Show chat">
                            <CommentIcon fontSize="medium" />
                        </Tooltip>
                    </IconButton>
                    <IconButton
                        size="large"
                        onClick={handleRemoveStream}
                        sx={{ padding: 0.5 }}
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

export default memo(StreamListItem)
