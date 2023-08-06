import { Unstable_Grid2 as Grid } from "@mui/material"
import Chat from "./Chat"
import StreamFrames from "./StreamFrames"

const Streams = () => {
    return (
        <Grid
            container
            height="100%"
        >
            <Grid xs>
                <StreamFrames />
            </Grid>
            <Grid xs="auto">
                <Chat />
            </Grid>
        </Grid>
    )
}

export default Streams
