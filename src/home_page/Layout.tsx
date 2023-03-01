import { Box, Unstable_Grid2 as Grid, Stack } from "@mui/material"
import Streams from "../shared_components/Streams"
import Chats from "../shared_components/Chats"
import TourneyDrawer from "../features/tourney_drawer/TourneyDrawer"

const Layout = () => {
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
