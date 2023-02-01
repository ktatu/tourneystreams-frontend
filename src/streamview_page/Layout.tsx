import { Box, Unstable_Grid2 as Grid } from "@mui/material"
import Chats from "../shared_components/Chats"
import Streams from "../shared_components/Streams"

const Layout = () => {
    return (
        <Grid
            container
            marginTop="50px"
        >
            <Grid xs={10}>
                <Box
                    overflow="auto"
                    height="700px"
                    display="flex"
                    justifyContent="center"
                    bgcolor="Purple"
                >
                    <Streams />
                </Box>
            </Grid>
            <Grid xs={2}>
                <Chats />
            </Grid>
        </Grid>
    )
}

export default Layout
