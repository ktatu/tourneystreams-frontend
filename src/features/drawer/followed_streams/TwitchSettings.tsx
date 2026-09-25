import LaunchIcon from "@mui/icons-material/Launch"
import { Box, Button, Typography } from "@mui/material"
import "../Drawer.css"

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
                    Connection to Tourneystreams can be removed on Twitch&apos;s Connections page
                </Typography>
                <Button
                    endIcon={<LaunchIcon />}
                    href="https://www.twitch.tv/settings/connections"
                    variant="outlined"
                >
                    Disconnect on Twitch
                </Button>
            </Box>
        </Box>
    )
}

export default TwitchSettings
