import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import CloseIcon from "@mui/icons-material/Close"
import CommentIcon from "@mui/icons-material/Comment"
import SwapHorizIcon from "@mui/icons-material/SwapHoriz"
import { Box, IconButton, Paper, Tooltip } from "@mui/material"
import { memo } from "react"
import { removeStream, selectChatChannel } from "../../commons/streamsState"
import { Stream } from "../../types"
import StreamName from "./StreamName"

interface StreamListItemProps {
    stream: Stream
    channelChatIsSelected: boolean
    oneStreamOpen: boolean
}

const StreamListItem = ({ stream, channelChatIsSelected, oneStreamOpen }: StreamListItemProps) => {
    const streamId = stream.id
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: streamId,
    })

    const zIndex = isDragging ? 1000 : 1

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex,
        position: "relative",
    } as React.CSSProperties

    const handleRemoveStream = () => {
        removeStream(streamId)
    }

    const handleSelectChatChannel = () => {
        selectChatChannel(streamId)
    }

    return (
        <Paper
            ref={setNodeRef}
            style={style}
            sx={{ minWidth: 200, height: 50, textAlign: "center" }}
            variant="outlined"
            {...attributes}
        >
            <Box
                alignItems="center"
                display="flex"
                height="100%"
                paddingLeft={1}
                paddingRight={1}
                width="100%"
            >
                <StreamName
                    streamId={stream.id}
                    streamSource={stream.streamSource}
                />
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
                        sx={{ padding: 0.5 }}
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

export default memo(StreamListItem)
