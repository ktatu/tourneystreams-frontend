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
                    Connection to Tourneystreams can be removed on Twitch&apos;s Connections page
                </Typography>
                <Button
                    variant="outlined"
                    endIcon={<LaunchIcon />}
                    href="https://www.twitch.tv/settings/connections"
                >
                    Disconnect on Twitch
                </Button>
            </Box>
        </Box>
    )
}

export default TwitchSettings
