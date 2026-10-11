// AI-assisted by Claude Sonnet 5.5 (GitHub Copilot): moved MUI system props into sx, as part of the Vite/dependency migration.
import { Box, CircularProgress, Typography } from "@mui/material"
import { useState } from "react"
import type ReactPlayer from "react-player"
import ReactTwitchPlayer from "react-player/twitch"
import { removeStream } from "../../commons/streamsState"
import { useCookiesConsent } from "../../CookiesConsent"
import UserSettings from "../drawer/settings/UserSettings"
import { addAlert } from "../../commons/alertState"

export interface VideoPlayerProps {
    id: string
    playing: boolean
}

const autoCloseEndedStream = UserSettings.get("autocloseEndedStreams")

const TwitchPlayer = ({ id, playing }: VideoPlayerProps) => {
    const [playerReady, setPlayerReady] = useState(false)

    const cookieChoice = useCookiesConsent("twitch")

    const handleCloseStream = () => {
        if (autoCloseEndedStream) {
            removeStream(id)
            addAlert(`Closed offline stream: ${id}`, "info")
        }
    }

    // because onEnded doesn't trigger for streams that were already offline when added
    const handleReady = (player: ReactPlayer) => {
        player
            .getInternalPlayer()
            .addEventListener("offline", () => setTimeout(handleCloseStream, 5000))
        setPlayerReady(true)
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
                controls={false}
                height="100%"
                id={`${id}-player`}
                muted={true}
                playing={playing}
                stopOnUnmount={true}
                url={`https://www.twitch.tv/${id}`}
                width="100%"
                onEnded={handleCloseStream}
                onReady={handleReady}
            />
        </Box>
    )
}

export default TwitchPlayer
