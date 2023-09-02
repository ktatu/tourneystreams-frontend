import { Box, Stack, Toolbar } from "@mui/material"
import { useState } from "react"
import AppBar from "./features/app_bar/AppBar"
import Drawer from "./features/drawer/Drawer"
import { DrawerContentType } from "./features/drawer/DrawerContentSwitch"
import Streams from "./features/main_content/MainContent"

const App = () => {
    const [drawerContent, setDrawerContent] = useState(DrawerContentType.None)

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
