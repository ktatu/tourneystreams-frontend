import Drawer from "./features/drawer/Drawer"
import AppBar from "./features/app_bar/AppBar"
import Streams from "./features/main_content/MainContent"
import { useState } from "react"
import { Alert, Box, Stack, Toolbar } from "@mui/material"
import { DrawerContentType } from "./features/drawer/DrawerContentSwitch"

const App = () => {
    const [drawerContent, setDrawerContent] = useState(DrawerContentType.None)

    return (
        <Box
            width="100vw"
            height="100vh"
        >
            <AppBar
                drawerContentType={drawerContent}
                setDrawerContentType={setDrawerContent}
            />
            <Drawer
                drawerContent={drawerContent}
                handleDrawerClose={() => setDrawerContent(DrawerContentType.None)}
            />
            <Stack
                bgcolor="black"
                height="100%"
            >
                <Toolbar />
                <Streams />
            </Stack>
        </Box>
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
