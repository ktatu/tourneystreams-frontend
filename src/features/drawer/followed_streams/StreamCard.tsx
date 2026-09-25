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
                    display="flex"
                    flexDirection="row"
                >
                    <Box
                        alignItems="flex-start"
                        display="flex"
                        flexDirection="column"
                        gap={1}
                        flex={1}
                        minWidth={0}
                        position="relative"
                    >
                        <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                            minWidth={0}
                        >
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
                                    position="relative"
                                    paddingRight={3}
                                    variant="h6"
                                >
                                    {followedStream.broadcastName}
                                    <OpenInNewIcon
                                        fontSize="small"
                                        color="primary"
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
                                fontSize={12}
                                color="text.secondary"
                            >
                                {followedStream.category},{" "}
                                {parseViewerCount(followedStream.viewerCount)}
                            </Typography>
                        )}
                        <Typography>{followedStream.title}</Typography>
                    </Box>
                    <Box
                        alignItems="center"
                        alignSelf="center"
                        display="flex"
                        justifyContent="center"
                        width="20%"
                        flexShrink={0}
                    >
                        {streamIsPlaying ? (
                            <Tooltip title="Close stream">
                                <IconButton
                                    onClick={handleRemoveStream}
                                    sx={{ width: 64, height: 64 }}
                                    color="secondary"
                                >
                                    <Cancel sx={{ fontSize: 48 }} />
                                </IconButton>
                            </Tooltip>
                        ) : (
                            <Tooltip title="Play stream">
                                <IconButton
                                    onClick={handleAddStream}
                                    sx={{ width: 64, height: 64 }}
                                    color="primary"
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
