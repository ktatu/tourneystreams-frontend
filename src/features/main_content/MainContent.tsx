import { Unstable_Grid2 as Grid } from "@mui/material"
import useYoutubeiFrameApi from "../../hooks/useYoutubeiFrameApi"
import Chat from "./Chat"
import VideoFrames from "./VideoFrames"

const Streams = () => {
    // TODO: move to VideoFrames?
    const youtubeApiReady = useYoutubeiFrameApi().youtubeApiReady

    return (
        <Grid
            container
            height="100%"
        >
            <Grid xs>
                <VideoFrames />
            </Grid>
            <Grid xs="auto">
                <Chat />
            </Grid>
        </Grid>
    )
}

/*
                <Box
                    width="500px"
                    height="500px"
                >
                    <YoutubeTest />
                </Box>
*/

export default Streams
