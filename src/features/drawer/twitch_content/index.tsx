import { Box, Button, Typography } from "@mui/material"
import LaunchIcon from "@mui/icons-material/Launch"
import { useEffect } from "react"
import StreamCard from "./StreamCard"
import "../Drawer.css"
import StreamCardsContainer from "./StreamCardsContainer"

interface FollowedStream {
    game: string
    title: string
    loginName: string
    broadcastName: string
    viewerCount: number
}

const TwitchContent = () => {
    useEffect(() => {
        console.log("cookies ", document.cookie)
    }, [])

    return (
        <Box className="drawer-content">
            <Typography variant="h4">Twitch streams</Typography>
            <Box
                paddingTop={3}
                display="flex"
                flexDirection="column"
                gap={2}
            >
                <Typography variant="body1">
                    Connect your Twitch account to see your followed channels
                </Typography>
                <Box
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    gap={5}
                >
                    <Button
                        href={`http://localhost:3001/api/twitch/auth${window.location.search}`}
                        variant="outlined"
                        endIcon={<LaunchIcon />}
                    >
                        Connect
                    </Button>
                </Box>
            </Box>
            <StreamCardsContainer />
        </Box>
    )
}

export default TwitchContent
