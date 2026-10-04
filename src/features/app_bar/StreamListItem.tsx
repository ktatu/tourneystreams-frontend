// AI-assisted by Claude Sonnet 5.5 (GitHub Copilot): moved MUI system props into sx, as part of the Vite/dependency migration.
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
                sx={{
                    alignItems: "center",
                    display: "flex",
                    height: "100%",
                    paddingLeft: 1,
                    paddingRight: 1,
                    width: "100%"
                }}>
                <StreamName
                    streamId={stream.id}
                    streamSource={stream.streamSource}
                />
                <Box sx={{
                    flexGrow: 1
                }} />
                <Box sx={{
                    display: "flex"
                }}>
                    {!oneStreamOpen && (
                        <IconButton
                            size="large"
                            {...listeners}
                            sx={{ padding: 0.5 }}
                        >
                            <Tooltip
                                placement="right"
                                title="Move stream (hold and drag)"
                            >
                                <SwapHorizIcon fontSize="medium" />
                            </Tooltip>
                        </IconButton>
                    )}
                    <IconButton
                        size="large"
                        sx={{ opacity: channelChatIsSelected ? 1 : 0.3, padding: 0.5 }}
                        onClick={handleSelectChatChannel}
                    >
                        <CommentIcon fontSize="medium" />
                    </IconButton>
                    <IconButton
                        size="large"
                        sx={{ padding: 0.5 }}
                        onClick={handleRemoveStream}
                    >
                        <CloseIcon fontSize="medium" />
                    </IconButton>
                </Box>
            </Box>
        </Paper>
    )
}

export default memo(StreamListItem)
