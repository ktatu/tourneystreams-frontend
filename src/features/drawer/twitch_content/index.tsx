import { Box, Button, Typography } from "@mui/material"
import LaunchIcon from "@mui/icons-material/Launch"
import { useEffect } from "react"
import "../Drawer.css"
import StreamCardsContainer from "./StreamCardsContainer"
import DrawerHeader from "../shared_components/DrawerHeader"
import { getCookie, removeCookie } from "typescript-cookie"

interface TwitchContentProps {
    handleDrawerClose: () => void
}
const TwitchContent = ({ handleDrawerClose }: TwitchContentProps) => {
    useEffect(() => {
        console.log("cookies ", document.cookie)
    }, [])

    const userHasTwitchToken = getCookie("twitch-token")

    return (
        <Box className="drawer">
            <DrawerHeader
                title="Twitch streams"
                handleDrawerClose={handleDrawerClose}
            >
                <>
                    {userHasTwitchToken ? (
                        <p>filters</p>
                    ) : (
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
                    )}
                </>
            </DrawerHeader>
            {userHasTwitchToken ? <StreamCardsContainer /> : null}
        </Box>
    )
}

/*
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
*/

export default TwitchContent
