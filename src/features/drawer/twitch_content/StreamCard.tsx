import { Cancel, PlayCircle } from "@mui/icons-material"
import OpenInNewIcon from "@mui/icons-material/OpenInNew"
import { Box, Button, Card, CardContent, IconButton, Tooltip, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { addStream, removeStream, useStreamsState } from "../../../commons/streamsState"
import { StreamSource } from "../../../types"
import StreamCardThumbnail from "./StreamCardThumbnail"

export interface FollowedStream {
    category: string
    title: string
    loginName: string
    broadcastName: string
    viewerCount: number
}

const StreamCard = ({ followedStream }: { followedStream: FollowedStream }) => {
    const [streamIsPlaying, setStreamIsPlaying] = useState(false)
    const { identifiers: channels } = useStreamsState()

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
        <Card sx={{ width: 350, position: "relative" }}>
            <StreamCardThumbnail
                streamName={followedStream.loginName}
                category={followedStream.category}
                viewerCount={followedStream.viewerCount}
            />
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
                        overflow="hidden"
                    >
                        <Button
                            href={`https://twitch.tv/${followedStream.loginName}`}
                            referrerPolicy="no-referrer"
                            sx={{ padding: 0, color: "white" }}
                            target="_blank"
                        >
                            <Typography
                                position="relative"
                                paddingRight={3}
                                variant="h5"
                            >
                                {followedStream.broadcastName}
                                <OpenInNewIcon
                                    fontSize="small"
                                    sx={{
                                        position: "absolute",
                                        right: 0,
                                        top: 0,
                                    }}
                                />
                            </Typography>
                        </Button>
                        <Typography id="123">{followedStream.title}</Typography>
                    </Box>
                    <Box
                        alignItems="center"
                        alignSelf="center"
                        display="flex"
                        justifyContent="center"
                        width="25%"
                    >
                        {streamIsPlaying ? (
                            <Tooltip title="Close stream">
                                <IconButton
                                    onClick={handleRemoveStream}
                                    sx={{ width: 64, height: 64 }}
                                >
                                    <Cancel sx={{ fontSize: 48 }} />
                                </IconButton>
                            </Tooltip>
                        ) : (
                            <Tooltip title="Play stream">
                                <IconButton
                                    onClick={handleAddStream}
                                    sx={{ width: 64, height: 64 }}
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
