import LaunchIcon from "@mui/icons-material/Launch"
import { Box, Button, Typography } from "@mui/material"
import { BACKEND_BASE_URL } from "../../../envConfig"

const TwitchConnect = ({ message }: { message: string }) => {
    return (
        <Box
            sx={{
                alignItems: "center",
                display: "flex",
                flexDirection: "row",
                gap: 1
            }}>
            <Box sx={{
                flex: 1
            }}>
                {" "}
                <Button
                    endIcon={<LaunchIcon />}
                    href={`${BACKEND_BASE_URL}/twitch/auth${window.location.search}`}
                    variant="outlined"
                >
                    Connect
                </Button>
            </Box>
            <Typography>{message}</Typography>
        </Box>
    )
}

export default TwitchConnect
