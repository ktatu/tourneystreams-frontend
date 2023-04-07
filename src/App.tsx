import TourneyDrawer from "./features/tourney_drawer"
import AppBar from "./features/app_bar"
import Streams from "./features/streams"
import { useState, useEffect } from "react"
import { Alert, Box, Stack, Toolbar } from "@mui/material"
import { useStreamContext } from "./commons/streamReducer"
import WelcomeContent from "./WelcomeContent"

const App = () => {
    const [tourneyDrawerOpen, setTourneyDrawerOpen] = useState(false)
    const { streamState } = useStreamContext()

    useEffect(() => {
        if (streamState.streams.length === 0) {
            setTourneyDrawerOpen(true)
        }
    }, [])

    const handleTourneyDrawerOpen = () => {
        setTourneyDrawerOpen(true)
    }

    const handleTourneyDrawerClose = () => {
        setTourneyDrawerOpen(false)
    }

    return (
        <>
            <AppBar handleTourneyDrawerOpen={handleTourneyDrawerOpen} />
            <TourneyDrawer
                open={tourneyDrawerOpen}
                handleTourneyDrawerClose={handleTourneyDrawerClose}
            />
            <Stack
                height="100vh"
                bgcolor="black"
            >
                <Toolbar />
                {streamState.streams.length === 0 ? (
                    <Box marginLeft="27%">
                        <WelcomeContent />
                    </Box>
                ) : (
                    <Streams />
                )}
            </Stack>
        </>
    )
}

export default App

enum NotificationType {
    INFO = "info",
    ERROR = "error",
}

interface NotificationProps {
    notificationType: NotificationType
    message: string
}

const Notification = ({ notificationType, message }: NotificationProps) => {
    return (
        <Alert
            severity={notificationType}
            sx={{ width: "100%" }}
        >
            {message}
        </Alert>
    )
}
