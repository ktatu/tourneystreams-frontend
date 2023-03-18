import { useState } from "react"

import { createTheme, ThemeOptions, ThemeProvider } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import theme from "./theme"
import CssBaseline from "@mui/material/CssBaseline"
import { StreamContextProvider, streamReducer } from "./commons/streamReducer"

import TourneyDrawer from "./features/tourney_drawer"
import Toolbar from "./Toolbar"
import Streams from "./features/streams"

const App = () => {
    //const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")
    // TODO: moving stream state handling to useReducer + context
    const [liveStreams, setLiveStreams] = useState<Array<string>>([])

    const handleAddStream = (channel: string) => {
        setLiveStreams(liveStreams.concat(channel))
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <StreamContextProvider reducer={streamReducer}>
                <>
                    <Toolbar addStream={handleAddStream} />
                    <TourneyDrawer />
                    <Streams />
                </>
            </StreamContextProvider>
        </ThemeProvider>
    )
}

export default App
