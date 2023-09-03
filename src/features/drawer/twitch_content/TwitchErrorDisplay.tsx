import { Box, Typography } from "@mui/material"
import { BACKEND_BASE_URL } from "../../../envConfig"
import ExternalLinkButton from "../shared_components/ExternalLinkButton"

interface TwitchErrorDisplayProps {
    error: unknown
}

const TwitchErrorDisplay = ({ error }: TwitchErrorDisplayProps) => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            gap={2}
        >
            <Typography>Connect your Twitch account to see your followed channels</Typography>
            <ExternalLinkButton
                href={`${BACKEND_BASE_URL}/twitch/auth${window.location.search}`}
                text="Connect"
            />
        </Box>
    )
}

export default TwitchErrorDisplay
