import LaunchIcon from "@mui/icons-material/Launch"
import { Box, Button, Typography } from "@mui/material"
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
                alignItems="center"
                display="flex"
                flexDirection="row"
                gap={5}
            >
                <Button
                    endIcon={<LaunchIcon />}
                    href={`${BACKEND_BASE_URL}/twitch/auth${window.location.search}`}
                    variant="outlined"
                >
                    Connect
                </Button>
            </Box>
        </Box>
    )
}

export default TwitchConnect
