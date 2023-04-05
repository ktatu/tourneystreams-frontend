import { styled, ThemeProvider } from "@mui/material/styles"
import theme from "./theme"
import CssBaseline from "@mui/material/CssBaseline"
import { StreamContextProvider, streamReducer } from "./commons/streamReducer"

import TourneyDrawer from "./features/tourney_drawer"
import AppBar from "./features/app_bar"
import Streams from "./features/streams"
import { useState } from "react"
import { Alert } from "@mui/material"

const App = () => {
    const [tourneyDrawerOpen, setTourneyDrawerOpen] = useState(true)

    const handleTourneyDrawerOpen = () => {
        setTourneyDrawerOpen(true)
    }

    const handleTourneyDrawerClose = () => {
        setTourneyDrawerOpen(false)
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <StreamContextProvider reducer={streamReducer}>
                <>
                    <AppBar handleTourneyDrawerOpen={handleTourneyDrawerOpen} />
                    <TourneyDrawer
                        open={tourneyDrawerOpen}
                        handleTourneyDrawerClose={handleTourneyDrawerClose}
                    />
                    <Streams />
                </>
            </StreamContextProvider>
        </ThemeProvider>
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

/*
import * as React from "react"
import { styled, ThemeProvider, useTheme } from "@mui/material/styles"
import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import CssBaseline from "@mui/material/CssBaseline"
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"

import appTheme from "./theme"
import TourneyDrawer from "./features/tourney_drawer"

import AppBar from "./features/app_bar"
import Streams from "./features/streams"
import { StreamContextProvider, streamReducer } from "./commons/streamReducer"

const drawerWidth = 240

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
    open?: boolean
}>(({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}))

interface AppBarProps extends MuiAppBarProps {
    open?: boolean
}

const TopMenu = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}))

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
}))

export default function PersistentDrawerLeft() {
    const theme = useTheme()
    const [open, setOpen] = React.useState(true)

    const handleDrawerOpen = () => {
        setOpen(true)
    }

    const handleDrawerClose = () => {
        setOpen(false)
    }

    return (
        <ThemeProvider theme={appTheme}>
            <CssBaseline />
            <StreamContextProvider reducer={streamReducer}>
                <Box sx={{ display: "flex" }}>
                    <CssBaseline />
                    <TopMenu
                        position="fixed"
                        open={open}
                    >
                        <AppBar handleTourneyDrawerOpen={handleDrawerOpen} />
                    </TopMenu>
                    <Drawer
                        sx={{
                            width: drawerWidth,
                            "& .MuiDrawer-paper": {
                                width: drawerWidth,
                                boxSizing: "border-box",
                            },
                        }}
                        variant="persistent"
                        anchor="left"
                        open={open}
                    >
                        <DrawerHeader>
                            <IconButton onClick={handleDrawerClose}>
                                {theme.direction === "ltr" ? (
                                    <ChevronLeftIcon />
                                ) : (
                                    <ChevronRightIcon />
                                )}
                            </IconButton>
                        </DrawerHeader>
                    </Drawer>
                    <Main open={open}>
                        <Streams />
                    </Main>
                </Box>
            </StreamContextProvider>
        </ThemeProvider>
    )
}
*/
/*
<IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: "none" }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                    >
                        Persistent drawer
                    </Typography>

*/
