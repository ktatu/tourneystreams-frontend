import { Box, Stack, Toolbar } from "@mui/material"
import Chat from "./Chat"
import StreamFrames from "./StreamFrames"

const Streams = () => {
    return (
        <Stack height="100vh">
            <Toolbar />
            <Box
                display="flex"
                flexDirection="row"
                height="100%"
            >
                <Box
                    height="100%"
                    overflow="auto"
                    paddingTop={3}
                >
                    <StreamFrames />
                </Box>
                <Box flexGrow={1} />
                <Chat />
            </Box>
        </Stack>
    )
}

export default Streams
