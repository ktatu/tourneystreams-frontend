import { useState } from "react"

import { createTheme, ThemeOptions, ThemeProvider } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import theme from "./theme"
import CssBaseline from "@mui/material/CssBaseline"
import { StreamContextProvider } from "./streamReducer"

import { Box } from "@mui/material"
import TourneyDrawer from "./features/tourney_drawer"
import StreamFrames from "./features/streams/StreamFrames"
import Chats from "./features/streams/Chats"
import Toolbar from "./Toolbar"
import Streams from "./features/streams"

const App = () => {
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")
    // TODO: moving stream state handling to useReducer + context
    const [streams, setStreams] = useState<Array<string>>([])

    const handleAddStream = (stream: string) => {
        setStreams(streams.concat(stream))
    }

    const handleRemoveStream = (stream: string) => {
        setStreams(streams.filter((streamInState) => streamInState !== stream))
    }

    return (
        <ThemeProvider theme={theme(prefersDarkMode)}>
            <CssBaseline />
            <Toolbar addStream={handleAddStream} />
            <TourneyDrawer />
            <Streams
                streams={streams}
                removeStream={handleRemoveStream}
            />
        </ThemeProvider>
    )
}

export default App
