// AI-assisted by Claude Sonnet 5.5 (GitHub Copilot): moved MUI system props into sx, as part of the Vite/dependency migration.
import LaunchIcon from "@mui/icons-material/Launch"
import { Box, Button, Typography } from "@mui/material"
import { BACKEND_BASE_URL } from "../../../envConfig"
import { AxiosError } from "axios"

const TwitchConnectError = ({ error }: { error: Error }) => {
    if (error instanceof AxiosError) {
        if (error.status === 401) {
            return (
                <Box
                    sx={{
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "row",
                        gap: 1,
                    }}
                >
                    <Box>
                        <Button
                            endIcon={<LaunchIcon />}
                            href={`${BACKEND_BASE_URL}/twitch/auth${window.location.search}`}
                            variant="outlined"
                        >
                            Connect
                        </Button>
                    </Box>
                    <Typography>Twitch connection required</Typography>
                </Box>
            )
        }
        if (error.status && error.status >= 500) {
            return <Typography variant="h6">Unexpected server error. Try again later</Typography>
        }
        if (
            error.code === "ECONNABORTED" ||
            error.code === "ETIMEDOUT" ||
            error.code === "ERR_NETWORK"
        ) {
            return <Typography variant="h6">Unable to reach the server. Try again later</Typography>
        }
    }

    return <Typography variant="h6">Unexpected error. Try again later</Typography>
}

export default TwitchConnectError
