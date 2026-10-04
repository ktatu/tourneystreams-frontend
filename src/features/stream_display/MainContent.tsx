import { Grid } from "@mui/material"
import Chat from "./Chat"
import VideoPlayers from "./VideoPlayers"

const Streams = () => {
    return (
        <Grid
            container
            sx={{ height: "100%" }}
        >
            <Grid size="grow">
                <VideoPlayers />
            </Grid>
            <Grid size="auto">
                <Chat />
            </Grid>
        </Grid>
    )
}

export default Streams
