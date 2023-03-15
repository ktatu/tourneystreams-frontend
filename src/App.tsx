import { useState } from "react"

import { createTheme, ThemeOptions, ThemeProvider } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import theme from "./theme"
import CssBaseline from "@mui/material/CssBaseline"
import { StreamContextProvider } from "./streamReducer"

import TourneyDrawer from "./features/tourney_drawer"
import Toolbar from "./Toolbar"
import Streams from "./features/streams"

const App = () => {
    //const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")
    // TODO: moving stream state handling to useReducer + context
    const [liveStreams, setLiveStreams] = useState<Array<string>>([])

    const handleAddStream = (stream: string) => {
        setLiveStreams(liveStreams.concat(stream))
    }

    const handleRemoveStream = (stream: string) => {
        setLiveStreams(liveStreams.filter((streamInState) => streamInState !== stream))
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Toolbar addStream={handleAddStream} />
            <TourneyDrawer />
            <Streams
                streams={liveStreams}
                removeStream={handleRemoveStream}
            />
        </ThemeProvider>
    )
}

export default App
