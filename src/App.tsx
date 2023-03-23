import { useState } from "react"

import { createTheme, ThemeOptions, ThemeProvider } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import theme from "./theme"
import CssBaseline from "@mui/material/CssBaseline"
import { StreamContextProvider, streamReducer } from "./commons/streamReducer"

import TourneyDrawer from "./features/tourney_drawer"
import AppBar from "./AppBar"
import Streams from "./features/streams"
import { Box, Toolbar as MuiToolbar } from "@mui/material"

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <StreamContextProvider reducer={streamReducer}>
                <>
                    <AppBar />
                    <Streams />
                </>
            </StreamContextProvider>
        </ThemeProvider>
    )
}

export default App
