import { Box } from "@mui/material"
import { memo } from "react"
import { useStreamsState } from "../../commons/streamsState"
import useYoutubeiFrameApi from "../../hooks/useYoutubeiFrameApi"
import TwitchPlayer from "./TwitchPlayer"
import getVideoDimensions from "./videoDimensions"
import YoutubePlayer from "./YoutubePlayer"

const VideoPlayers = () => {
    const { streams } = useStreamsState()
    const youtubeApiReady = useYoutubeiFrameApi().youtubeApiReady

    return (
        <Box
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            height="100%"
            overflow="auto"
        >
            {streams.map((stream, index) => {
                const { width, height } = getVideoDimensions(streams.length, stream.displayPosition)

                return (
                    <Box
                        key={index}
                        height={`${height}%`}
                        order={stream.displayPosition}
                        overflow="hidden"
                        width={`${width}%`}
                    >
                        {stream.streamSource === "twitch" ? (
                            <TwitchPlayer stream={stream} />
                        ) : (
                            <YoutubePlayer
                                videoId={stream.id}
                                youtubeApiReady={youtubeApiReady}
                            />
                        )}
                    </Box>
                )
            })}
        </Box>
    )
}

export default memo(VideoPlayers)
