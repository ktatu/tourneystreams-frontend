import { Box, CircularProgress } from "@mui/material"
import { useEffect, useState } from "react"

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
                    event.target.playVideo()
                },
            },
        })
    }, [youtubeApiReady])

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
            {" "}
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
