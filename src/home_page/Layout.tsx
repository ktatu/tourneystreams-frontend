import { Box, Unstable_Grid2 as Grid, Stack } from "@mui/material"
import TourneyCarousel from "./TourneyCarousel"
import Streams from "../shared_components/Streams"
import Chats from "../shared_components/Chats"
import TourneyDrawer from "../TourneyDrawer"

const Layout = () => {
    /*
    return (
        <Grid
            container
            spacing={2}
            paddingTop={2}
            paddingRight={1}
            xs={9}
            bgcolor="red"
        >
            <Grid
                xs={10}
                bgcolor="purple"
            >
                <Box
                    overflow="auto"
                    height="800px"
                >
                    <Stack spacing={5}>
                        <Streams />
                    </Stack>
                </Box>
            </Grid>
        </Grid>
    )*/

    return (
        <Box
            display="flex"
            flexDirection="row"
        >
            <Box
                overflow="auto"
                height="800px"
            >
                <Streams />
            </Box>
            <Box flexGrow={1} />
            <Box
                paddingLeft={1}
                paddingRight={2}
            >
                <Chats />
            </Box>
        </Box>
    )
}

export default Layout
