import { Box, Typography } from "@mui/material"
import { useStreamsState } from "../../commons/streamsState"

const Chat = () => {
    const streamsStateSnap = useStreamsState()

    if (!streamsStateSnap.selectedChatChannel || !streamsStateSnap.chatIsVisible) {
        return null
    }

    return (
        <Box
            width="340px"
            height="100%"
            position="relative"
        >
            <iframe
                src={`https://www.twitch.tv/embed/${streamsStateSnap.selectedChatChannel}/chat?darkpopout&parent=${window.location.hostname}`}
                style={{
                    display: "block",
                    border: "none",
                }}
                height="100%"
                width="100%"
            ></iframe>
            <Box
                alignContent="center"
                alignItems="center"
                bottom={0}
                display="flex"
                height={50}
                maxWidth={100}
                position="absolute"
                right={100}
            >
                <Typography
                    overflow="hidden"
                    whiteSpace="nowrap"
                    textOverflow="ellipsis"
                >
                    {streamsStateSnap.selectedChatChannel}
                </Typography>
            </Box>
        </Box>
    )
}

export default Chat
