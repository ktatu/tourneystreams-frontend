import { Box } from "@mui/material"
import Chats from "./Chats"
import StreamFrames from "./StreamFrames"

const Streams = () => {
    return (
        <Box
            marginLeft="24%"
            width="75%"
            paddingTop={2}
        >
            <Box
                display="flex"
                flexDirection="row"
            >
                <Box
                    overflow="auto"
                    height="875px"
                >
                    <StreamFrames />
                </Box>
                <Box flexGrow={1} />
                <Box
                    paddingLeft={1}
                    paddingRight={2}
                >
                    <Chats />
                </Box>
            </Box>
        </Box>
    )
}

export default Streams
