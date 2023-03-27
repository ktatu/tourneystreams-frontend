import { Stack, Toolbar, Unstable_Grid2 as Grid, useTheme } from "@mui/material"
import Chat from "./Chat"
import StreamFrames from "./StreamFrames"

const Streams = () => {
    const theme = useTheme()

    return (
        <Stack
            height="100vh"
            marginLeft="27%"
        >
            <Toolbar />
            <Grid
                container
                justifyContent="space-between"
                sx={{ height: `calc(100% - ${theme.mixins.toolbar.minHeight}px)` }}
            >
                <Grid
                    xs
                    paddingRight={2}
                    paddingTop={2}
                    overflow="hidden"
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
