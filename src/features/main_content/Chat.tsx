import { Box } from "@mui/material"
import { useStreamsState } from "../../commons/streamsState"

const Chat = () => {
    const streamsState = useStreamsState()
    /*
    if (!streamsStateSnap.selectedChatId) {
        return null
    }*/

    const ytVideoId = "t2X3bMgXpIc"

    return (
        <Box
            height="100%"
            position="relative"
            width="100%"
        >
            {/*
            <iframe
                height="100%"
                src={`https://www.twitch.tv/embed/${streamsStateSnap.selectedChatId}/chat?darkpopout&parent=${window.location.hostname}`}
                width="100%"
                style={{
                    display: "block",
                    border: "none",
                }}
            ></iframe>*/}
            <iframe
                height="100%"
                width="100%"
                src={`https://youtube.com/live_chat?v=${ytVideoId}&embed_domain=${window.location.hostname}&dark_theme=1`}
                style={{
                    display: "block",
                    border: "none",
                }}
            ></iframe>
        </Box>
    )
}

export default Chat
