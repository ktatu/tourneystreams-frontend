import { Box, Stack, Toolbar } from "@mui/material"
import { useState } from "react"
import Alert from "./Alert"
import { removeAlert, useAlertState } from "./commons/alertState"
import AppBar from "./features/app_bar/AppBar"
import Drawer from "./features/drawer/Drawer"
import { DrawerContent } from "./features/drawer/DrawerContentSwitch"
import Streams from "./features/main_content/MainContent"
import Welcome from "./Welcome"

const App = () => {
    const [drawerContent, setDrawerContent] = useState(DrawerContent.None)
    const firstTimeVisitor = isIfFirstTimeVisitor()
    const { message: alertMessage, severity: alertSeverity } = useAlertState()

    const handleCloseAlert = () => {
        removeAlert()
    }

    return (
        <Box
            height="100vh"
            width="100vw"
        >
            <AppBar
                drawerContentType={drawerContent}
                setDrawerContentType={setDrawerContent}
            />
            <Drawer
                drawerContent={drawerContent}
                handleDrawerClose={() => setDrawerContent(DrawerContent.None)}
            />
            <Stack
                bgcolor="black"
                height="100%"
            >
                {/*Toolbar is used to push the Streams component below the AppBar, since AppBar doesn't do it itself*/}
                <Toolbar />
                {firstTimeVisitor && <Welcome />}
                <Streams />
            </Stack>
            <Alert
                handleClose={handleCloseAlert}
                message={alertMessage}
                open={Boolean(alertMessage)}
                severity={alertSeverity}
            />
        </Box>
    )
}

const isIfFirstTimeVisitor = () => {
    const hasVisitedSiteBefore = localStorage.getItem("hasVisitedSiteBefore")

    if (!hasVisitedSiteBefore) {
        localStorage.setItem("hasVisitedSiteBefore", "true")
        return true
    }

    return false
}

export default App
