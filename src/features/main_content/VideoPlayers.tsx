import { Box } from "@mui/material"
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
            {streams.map((stream) => {
                const { width, height } = getVideoDimensions(streams.length, stream.displayPosition)
                /*
                console.log("---")
                console.log("width ", width)
                console.log("height ", height)
                console.log("id ", stream.id)
                console.log("---")
                */
                return (
                    <Box
                        key={`${stream.id}-${stream.displayPosition}`}
                        height={`${height}%`}
                        order={stream.displayPosition}
                        overflow="hidden"
                        width={`${width}%`}
                    >
                        {stream.streamSource === "twitch" ? (
                            <TwitchPlayer id={stream.id} />
                        ) : (
                            <YoutubePlayer
                                id={stream.id}
                                youtubeApiReady={youtubeApiReady}
                            />
                        )}
                    </Box>
                )
            })}
        </Box>
    )
}

export default VideoPlayers
