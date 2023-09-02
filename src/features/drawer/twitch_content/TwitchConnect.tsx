import { Box, Typography, Button } from "@mui/material"
import LaunchIcon from "@mui/icons-material/Launch"
import { BACKEND_BASE_URL } from "../../../envConfig"

const TwitchConnect = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            gap={2}
        >
            <Typography>Connect your Twitch account to see your followed channels</Typography>
            <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                gap={5}
            >
                <Button
                    variant="outlined"
                    endIcon={<LaunchIcon />}
                    href={`${BACKEND_BASE_URL}/twitch/auth${window.location.search}`}
                >
                    Connect
                </Button>
            </Box>
        </Box>
    )
}

export default TwitchConnect
