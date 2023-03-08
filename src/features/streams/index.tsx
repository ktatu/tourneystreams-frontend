import { Box } from "@mui/material"
import Chats from "./Chats"
import StreamFrames from "./StreamFrames"

interface StreamsProps {
    removeStream: (stream: string) => void
    streams: Array<string>
}

const Streams = ({ removeStream, streams }: StreamsProps) => {
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
                    height="800px"
                >
                    <StreamFrames
                        streams={streams}
                        removeStream={removeStream}
                    />
                </Box>
                <Box flexGrow={1} />
                <Box
                    paddingLeft={1}
                    paddingRight={2}
                >
                    <Chats streams={streams} />
                </Box>
            </Box>
        </Box>
    )
}

export default Streams
