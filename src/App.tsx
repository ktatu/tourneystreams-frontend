import Drawer from "./features/drawer"
import AppBar from "./features/app_bar"
import Streams from "./features/streams"
import { useState } from "react"
import { Alert, Box, Stack, Toolbar } from "@mui/material"
import { useStreamContext } from "./commons/streamReducer"
import WelcomeContent from "./WelcomeContent"
import { DrawerContentType } from "./features/drawer/DrawerContent"

const App = () => {
    const [drawerContent, setDrawerContent] = useState(DrawerContentType.None)
    const { streamState } = useStreamContext()

    return (
        <>
            <AppBar
                drawerContentType={drawerContent}
                setDrawerContentType={setDrawerContent}
            />
            <Drawer drawerContent={drawerContent} />
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
