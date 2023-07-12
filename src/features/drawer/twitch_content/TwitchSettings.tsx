import { Box, Button, Typography } from "@mui/material"
import "../Drawer.css"
import LaunchIcon from "@mui/icons-material/Launch"

const TwitchSettings = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
        >
            <Box
                display="flex"
                flexDirection="column"
                gap={1}
            >
                <Typography>
                    Tourneystreams can be disconnected from your Twitch account on Twitch&apos;s
                    connections page
                </Typography>
                <Button
                    variant="outlined"
                    href="https://www.twitch.tv/settings/connections"
                    endIcon={<LaunchIcon />}
                >
                    Disconnect
                </Button>
            </Box>
        </Box>
    )
}

export default TwitchSettings
