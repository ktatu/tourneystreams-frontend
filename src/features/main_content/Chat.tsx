import { Box, Typography } from "@mui/material"
import { useStreamsState } from "../../commons/streamsState"

const Chat = () => {
    const streamsStateSnap = useStreamsState()

    if (!streamsStateSnap.selectedChatChannel) {
        return null
    }

    return (
        <Box
            height="100%"
            position="relative"
            width="340px"
        >
            <iframe
                height="100%"
                src={`https://www.twitch.tv/embed/${streamsStateSnap.selectedChatChannel}/chat?darkpopout&parent=${window.location.hostname}`}
                width="100%"
                style={{
                    display: "block",
                    border: "none",
                }}
            ></iframe>
            <Box
                alignContent="center"
                alignItems="center"
                bottom={0}
                display="flex"
                height={50}
                maxWidth={100}
                position="absolute"
                right={95}
            >
                <Typography
                    overflow="hidden"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                >
                    {streamsStateSnap.selectedChatChannel}
                </Typography>
            </Box>
        </Box>
    )
}

export default Chat
