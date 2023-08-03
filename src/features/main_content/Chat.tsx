import { Box } from "@mui/material"
import { useStreamContext } from "../../commons/streamReducer"

const Chat = () => {
    const { streamState } = useStreamContext()

    if (!streamState.selectedChannel || !streamState.chatIsVisible) {
        return null
    }

    return (
        <Box
            width="340px"
            height="100%"
            position="relative"
        >
            <iframe
                src={`https://www.twitch.tv/embed/${streamState.selectedChannel}/chat?darkpopout&parent=${window.location.hostname}`}
                style={{
                    display: "block",
                    border: "none",
                }}
                height="100%"
                width="100%"
            ></iframe>
            <Box
                position="absolute"
                bottom={0}
                right={100}
                width={100}
                height={50}
                display="flex"
                alignContent="center"
                alignItems="center"
            >
                {streamState.selectedChannel}
            </Box>
        </Box>
    )
}

export default Chat
