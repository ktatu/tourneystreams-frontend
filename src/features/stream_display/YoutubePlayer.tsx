// AI-assisted by Claude Sonnet 5.5 (GitHub Copilot): moved MUI system props into sx, as part of the Vite/dependency migration.
import { Box, CircularProgress, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { addAlert } from "../../commons/alertState"
import { removeStream } from "../../commons/streamsState"
import { useCookiesConsent } from "../../CookiesConsent"

interface YoutubePlayerProps {
    id: string
    youtubeApiReady: boolean
}

const YoutubePlayer = ({ id, youtubeApiReady }: YoutubePlayerProps) => {
    const [playerReady, setPlayerReady] = useState(false)
    const cookieChoice = useCookiesConsent("youtube")

    useEffect(() => {
        if (!youtubeApiReady || cookieChoice !== "accept") {
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
            playerVars: {},
        })
    }, [cookieChoice, youtubeApiReady])

    useEffect(() => {
        if (playerReady || cookieChoice !== "accept") {
            return
        }

        const timeoutId = setTimeout(() => {
            addAlert("Unable to load YouTube player", "error")
            removeStream(id)
        }, 5000)

        return () => clearTimeout(timeoutId)
    }, [cookieChoice, playerReady])

    if (cookieChoice !== "accept") {
        return (
            <Box
                sx={{
                    alignItems: "center",
                    display: "flex",
                    height: "100%",
                    justifyContent: "center",
                    padding: "1px",
                    position: "relative",
                    width: "100%",
                }}
            >
                <Typography variant="h5">Allow YouTube cookies to show this stream</Typography>
            </Box>
        )
    }

    return (
        <Box
            sx={{
                alignItems: "center",
                display: "flex",
                height: "100%",
                justifyContent: "center",
                padding: "1px",
                position: "relative",
                width: "100%",
            }}
        >
            {!playerReady && (
                <Box
                    sx={{
                        alignItems: "center",
                        bgcolor: "black",
                        display: "flex",
                        height: "100%",
                        justifyContent: "center",
                        position: "absolute",
                        width: "100%",
                    }}
                >
                    <CircularProgress size="10%" />
                </Box>
            )}
            <div id={id} />
        </Box>
    )
}

export default YoutubePlayer
