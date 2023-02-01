import { Box, Unstable_Grid2 as Grid, Stack } from "@mui/material"
import TourneyCarousel from "./TourneyCarousel"
import Streams from "../shared_components/Streams"
import Chats from "../shared_components/Chats"

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
                <Box
                    overflow="auto"
                    height="750px"
                >
                    <Stack spacing={5}>
                        <TourneyCarousel />
                        <Streams />
                    </Stack>
                </Box>
            </Grid>
            <Grid xs={3}>
                <Chats />
            </Grid>
        </Grid>
    )
}

export default Layout
