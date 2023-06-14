import { Unstable_Grid2 as Grid, useTheme } from "@mui/material"
import Chat from "./Chat"
import StreamFrames from "./StreamFrames"

const Streams = () => {
    const theme = useTheme()

    return (
        <Grid
            container
            justifyContent="space-between"
            sx={{ height: `calc(100% - ${theme.mixins.toolbar.minHeight}px)` }}
        >
            <Grid
                xs
                overflow="auto"
                height="100%"
                bgcolor="red"
            >
                <StreamFrames />
            </Grid>
            <Grid xs="auto">
                <Chat />
            </Grid>
        </Grid>
    )
}

export default Streams
