import { Box, Typography, Button } from "@mui/material"
import LaunchIcon from "@mui/icons-material/Launch"

const TwitchConnect = () => {
    return (
        <Box
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
    )
}

export default TwitchConnect
