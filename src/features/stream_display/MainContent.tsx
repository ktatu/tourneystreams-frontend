import { Unstable_Grid2 as Grid } from "@mui/material"
import Chat from "./Chat"
import VideoPlayers from "./VideoPlayers"

const Streams = () => {
    return (
        <Grid
            container
            height="100%"
        >
            <Grid xs>
                <VideoPlayers />
            </Grid>
            <Grid xs="auto">
                <Chat />
            </Grid>
        </Grid>
    )
}

export default Streams
