import { ThemeProvider } from "@mui/material/styles"
import theme from "./theme"
import CssBaseline from "@mui/material/CssBaseline"
import { StreamContextProvider, streamReducer } from "./commons/streamReducer"

import TourneyDrawer from "./features/tourney_drawer"
import AppBar from "./features/app_bar"
import Streams from "./features/streams"
import { useState } from "react"

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
                    <TourneyDrawer
                        open={tourneyDrawerOpen}
                        handleTourneyDrawerClose={handleTourneyDrawerClose}
                    />
                    <AppBar handleTourneyDrawerOpen={handleTourneyDrawerOpen} />
                    <Streams />
                </>
            </StreamContextProvider>
        </ThemeProvider>
    )
}

export default App
