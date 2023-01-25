import { Box, Unstable_Grid2 as Grid, Stack } from "@mui/material"
import TourneyCarousel from "./TourneyCarousel"
import Streams from "../shared_components/Streams"

const Layout = () => {
    return (
        <Grid
            container
            spacing={2}
            marginTop="20px"
        >
            <Grid xs={2}>
                <Box
                    flexGrow={1}
                    bgcolor="red"
                    height="50vh"
                />
            </Grid>
            <Grid xs>
                <Stack spacing={5}>
                    <TourneyCarousel />
                    <Streams />
                </Stack>
            </Grid>
            <Grid xs={3}>
                <Box
                    flexGrow={1}
                    bgcolor="blue"
                    height="50vh"
                />
            </Grid>
        </Grid>
    )
}

export default Layout
