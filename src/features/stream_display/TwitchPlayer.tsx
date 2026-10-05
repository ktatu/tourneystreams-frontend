// AI-assisted by Claude Sonnet 5.5 (GitHub Copilot): moved MUI system props into sx, as part of the Vite/dependency migration.
import { Box, CircularProgress, Typography } from "@mui/material"
import { useState } from "react"
import ReactTwitchPlayer from "react-player/twitch"
import { removeStream } from "../../commons/streamsState"
import { useCookiesConsent } from "../../CookiesConsent"

export interface VideoPlayerProps {
    id: string
}

const TwitchPlayer = ({ id }: VideoPlayerProps) => {
    const [playerReady, setPlayerReady] = useState(false)
    const cookieChoice = useCookiesConsent("twitch")

    const handleCloseStream = () => {
        const autoCloseEndedStream = localStorage.getItem("autocloseEndedStreams") === "true"

        if (autoCloseEndedStream) {
            removeStream(id)
        }
    }

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
                <Typography variant="h5">Allow Twitch cookies to show this stream</Typography>
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
            <ReactTwitchPlayer
                key={id}
                muted
                controls={false}
                height="100%"
                id={`${id}-player`}
                playing={true}
                url={`https://www.twitch.tv/${id}`}
                width="100%"
                onEnded={handleCloseStream}
                onReady={() => setPlayerReady(true)}
            />
        </Box>
    )
}

export default TwitchPlayer
/*
        <ReactTwitchPlayer
            key={id}
            muted
            controls={false}
            height="100%"
            id={`${id}-player`}
            playing={true}
            url={`https://www.twitch.tv/${id}`}
            width="100%"
            onEnded={handleCloseStream}
            onReady={handlePlayerReady}
        />
*/
