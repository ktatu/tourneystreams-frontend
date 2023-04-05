import { Stack, Toolbar, Unstable_Grid2 as Grid, useTheme } from "@mui/material"
import Chat from "./Chat"
import StreamFrames from "./StreamFrames"

const Streams = () => {
    const theme = useTheme()

    return (
        <Stack
            height="100vh"
            bgcolor="black"
        >
            <Toolbar />
            <Grid
                container
                justifyContent="space-between"
                sx={{ height: `calc(100% - ${theme.mixins.toolbar.minHeight}px)` }}
            >
                <Grid
                    xs
                    overflow="hidden"
                    height="100%"
                >
                    <StreamFrames />
                </Grid>
                <Grid xs="auto">
                    <Chat />
                </Grid>
            </Grid>
        </Stack>
    )
}

export default Streams
