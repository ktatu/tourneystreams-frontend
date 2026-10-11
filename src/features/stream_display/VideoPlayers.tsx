// AI-assisted by Claude Sonnet 5.5 (GitHub Copilot): moved MUI system props into sx, as part of the Vite/dependency migration.
import { Box } from "@mui/material"
import { useEffect, useMemo, useState } from "react"
import { useStreamsState } from "../../commons/streamsState"
import { useCookiesConsent } from "../../CookiesConsent"
import { Stream } from "../../types"
import TwitchPlayer from "./TwitchPlayer"
import useYoutubeiFrameApi from "./useYoutubeiFrameApi"
import getVideoDimensions from "./videoDimensions"
import YoutubePlayer from "./YoutubePlayer"
import UserSettings from "../drawer/settings/UserSettings"

// page just means a single screen of streams
const MAX_STREAMS_PER_PAGE = UserSettings.get("maxStreams")

const VideoPlayers = () => {
    const [openPage, setOpenPage] = useState(0)
    const { streams } = useStreamsState()
    const { loadYoutubeIframeApi, youtubeApiReady } = useYoutubeiFrameApi()
    const youtubeChoice = useCookiesConsent("youtube")

    useEffect(() => {
        if (youtubeChoice === "accept") {
            loadYoutubeIframeApi()
        }
    }, [loadYoutubeIframeApi, youtubeChoice])

    const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, clientHeight } = event.currentTarget

        if (clientHeight > 0) {
            setOpenPage(Math.round(scrollTop / clientHeight))
        }
    }

    const streamsAsPages = useMemo(() => {
        return streams.reduce((pageArray: Array<Array<Stream>>, currStream, currIndex) => {
            if (currIndex % MAX_STREAMS_PER_PAGE === 0) {
                const newStreamPage: Array<Stream> = []

                newStreamPage.push(currStream)
                pageArray.push(newStreamPage)
            } else {
                const pageWithRoom = pageArray[pageArray.length - 1]

                pageWithRoom.push(currStream)
            }

            return pageArray
        }, [])
    }, [streams])

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                height: "100%",
                overflow: "auto",
                scrollSnapType: "y mandatory",
                scrollSnapStop: "always",
            }}
            onScroll={handleScroll}
        >
            {streamsAsPages.map((pageStreams, index) => (
                <VideoPage
                    key={index}
                    pageOpen={openPage === index}
                    streams={pageStreams}
                    youtubeApiReady={youtubeApiReady}
                />
            ))}
        </Box>
    )
}

const VideoPage = ({
    streams,
    youtubeApiReady,
    pageOpen,
}: {
    streams: Array<Stream>
    youtubeApiReady: boolean
    pageOpen: boolean
}) => {
    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                height: "100%",
                scrollSnapAlign: "start",
                scrollSnapStop: "always",
            }}
        >
            {pageOpen &&
                streams.map((stream) => {
                    const { width, height } = getVideoDimensions(
                        streams.length,
                        stream.displayPosition,
                    )

                    return (
                        <Box
                            key={`${stream.id}-${stream.displayPosition}`}
                            sx={{
                                height: `${height}%`,
                                order: stream.displayPosition,
                                overflow: "hidden",
                                width: `${width}%`,
                            }}
                        >
                            {stream.streamSource === "twitch" ? (
                                <TwitchPlayer
                                    id={stream.id}
                                    playing={pageOpen}
                                />
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
