import { Box, CircularProgress } from "@mui/material"
import { useEffect, useState } from "react"
import { addAlert } from "../../commons/alertState"
import { removeStream } from "../../commons/streamsState"

interface YoutubePlayerProps {
    id: string
    youtubeApiReady: boolean
}

const YoutubePlayer = ({ id, youtubeApiReady }: YoutubePlayerProps) => {
    const [playerReady, setPlayerReady] = useState(false)

    useEffect(() => {
        if (!youtubeApiReady) {
            return
        }

        new window.YT.Player(id, {
            videoId: id,
            height: "100%",
            width: "100%",
            events: {
                onReady: (event) => {
                    setPlayerReady(true)
                    event.target.mute()
                    event.target.playVideo()
                },
            },
        })
    }, [youtubeApiReady])

    useEffect(() => {
        if (playerReady) {
            return
        }

        const timeoutId = setTimeout(() => {
            addAlert("Unable to load YouTube player", "error")
            removeStream(id)
        }, 5000)

        return () => clearTimeout(timeoutId)
    }, [playerReady])

    return (
        <Box
            alignItems="center"
            display="flex"
            height="100%"
            justifyContent="center"
            padding="1px" // seems to prevent player pausing on chrome in some situations
            position="relative"
            width="100%"
        >
            {!playerReady && (
                <Box
                    alignItems="center"
                    bgcolor="black"
                    display="flex"
                    height="100%"
                    justifyContent="center"
                    position="absolute"
                    width="100%"
                >
                    <CircularProgress size="10%" />
                </Box>
            )}
            <div id={id} />
        </Box>
    )
}

export default YoutubePlayer
