import { Box, Button, IconButton, Input, Typography } from "@mui/material"
import LaunchIcon from "@mui/icons-material/Launch"
import { startTransition, useEffect, useState } from "react"
import "../Drawer.css"
import StreamCardsContainer from "./StreamCardsContainer"
import DrawerHeader from "../shared_components/DrawerHeader"
import { getCookie } from "typescript-cookie"
import CloseIcon from "@mui/icons-material/Close"

interface TwitchContentProps {
    handleDrawerClose: () => void
}
const TwitchContent = ({ handleDrawerClose }: TwitchContentProps) => {
    useEffect(() => {
        console.log("cookies ", document.cookie)
    }, [])

    const [filter, setFilter] = useState("jokerdtv")

    const userHasTwitchToken = getCookie("twitch-token")

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        startTransition(() => {
            setFilter(event.target.value)
        })
    }

    return (
        <Box className="drawer">
            <DrawerHeader
                title="Twitch streams"
                handleDrawerClose={handleDrawerClose}
            >
                <>
                    {userHasTwitchToken ? (
                        <Input
                            disabled={false}
                            placeholder="Channel"
                            onChange={handleFilterChange}
                            value={filter}
                            endAdornment={
                                <IconButton
                                    onClick={() => setFilter("")}
                                    sx={{
                                        visibility: filter ? "visible" : "hidden",
                                    }}
                                >
                                    <CloseIcon />
                                </IconButton>
                            }
                        />
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
            {userHasTwitchToken ? <StreamCardsContainer channelFilter={filter} /> : null}
        </Box>
    )
}

export default TwitchContent
