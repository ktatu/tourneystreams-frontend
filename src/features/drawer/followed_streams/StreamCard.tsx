// AI-assisted by Claude Sonnet 5.5 (GitHub Copilot): moved MUI system props into sx, as part of the Vite/dependency migration.
import { Cancel, PlayCircle } from "@mui/icons-material"
import OpenInNewIcon from "@mui/icons-material/OpenInNew"
import {
    Box,
    Button,
    Card,
    CardContent,
    IconButton,
    Stack,
    Tooltip,
    Typography,
} from "@mui/material"
import { useEffect, useState } from "react"
import { addStream, removeStream, useStreamsState } from "../../../commons/streamsState"
import { StreamSource, TwitchStream } from "../../../types"
import StreamCardThumbnail from "./StreamCardThumbnail"
import ThumbnailInfoOverlay, { parseViewerCount } from "./ThumbnailInfoOverlay"

const StreamCard = ({ followedStream }: { followedStream: TwitchStream }) => {
    const [streamIsPlaying, setStreamIsPlaying] = useState(false)
    const { identifiers: channels } = useStreamsState()

    const hideThumbnail = localStorage.getItem("hideStreamThumbnails") === "true"
    const STREAMCARD_WIDTH = 375

    const handleAddStream = () => {
        addStream(followedStream.loginName, StreamSource.TWITCH)
    }

    const handleRemoveStream = () => {
        removeStream(followedStream.loginName)
    }

    useEffect(() => {
        setStreamIsPlaying(channels.includes(followedStream.loginName))
    }, [channels])

    return (
        <Card sx={{ width: STREAMCARD_WIDTH, position: "relative" }}>
            {!hideThumbnail && (
                <StreamCardThumbnail
                    streamName={followedStream.loginName}
                    thumbnailWidth={STREAMCARD_WIDTH}
                    overlay={
                        <ThumbnailInfoOverlay
                            category={followedStream.category}
                            viewerCount={followedStream.viewerCount}
                        />
                    }
                />
            )}
            <CardContent
                sx={{
                    boxSizing: "border-box",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row"
                    }}>
                    <Box
                        sx={{
                            alignItems: "flex-start",
                            display: "flex",
                            flex: 1,
                            flexDirection: "column",
                            gap: 1,
                            minWidth: 0,
                            position: "relative"
                        }}>
                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{
                                alignItems: "center",
                                minWidth: 0
                            }}>
                            <Box
                                component="img"
                                src={followedStream.profileImageUrl}
                                sx={{ width: "30px", height: "30px" }}
                            />
                            <Button
                                href={`https://twitch.tv/${followedStream.loginName}`}
                                referrerPolicy="no-referrer"
                                sx={{ padding: 0, color: "white", minWidth: 0 }}
                                target="_blank"
                            >
                                <Typography
                                    variant="h6"
                                    sx={{
                                        paddingRight: 3,
                                        position: "relative"
                                    }}>
                                    {followedStream.broadcastName}
                                    <OpenInNewIcon
                                        color="primary"
                                        fontSize="small"
                                        sx={{
                                            position: "absolute",
                                            right: 0,
                                            top: 0,
                                        }}
                                    />
                                </Typography>
                            </Button>
                        </Stack>
                        {hideThumbnail && (
                            <Typography
                                sx={{
                                    color: "text.secondary",
                                    fontSize: 12
                                }}>
                                {followedStream.category},{" "}
                                {parseViewerCount(followedStream.viewerCount)}
                            </Typography>
                        )}
                        <Typography>{followedStream.title}</Typography>
                    </Box>
                    <Box
                        sx={{
                            alignItems: "center",
                            alignSelf: "center",
                            display: "flex",
                            flexShrink: 0,
                            justifyContent: "center",
                            width: "20%"
                        }}>
                        {streamIsPlaying ? (
                            <Tooltip title="Close stream">
                                <IconButton
                                    color="secondary"
                                    sx={{ width: 64, height: 64 }}
                                    onClick={handleRemoveStream}
                                >
                                    <Cancel sx={{ fontSize: 48 }} />
                                </IconButton>
                            </Tooltip>
                        ) : (
                            <Tooltip title="Play stream">
                                <IconButton
                                    color="primary"
                                    sx={{ width: 64, height: 64 }}
                                    onClick={handleAddStream}
                                >
                                    <PlayCircle sx={{ fontSize: 48 }} />
                                </IconButton>
                            </Tooltip>
                        )}
                    </Box>
                </Box>
            </CardContent>
        </Card>
    )
}

export default StreamCard
