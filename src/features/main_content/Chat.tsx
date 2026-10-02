import { Box } from "@mui/material"
import { useStreamsState } from "../../commons/streamsState"

const Chat = () => {
    const streamsState = useStreamsState()
    const selectedChat = streamsState.selectedChat
    if (!selectedChat) {
        return null
    }

    const { id, streamSource } = selectedChat

    const chatUrl =
        streamSource === "youtube"
            ? `https://youtube.com/live_chat?v=${id}&embed_domain=${window.location.hostname}&dark_theme=1`
            : `https://www.twitch.tv/embed/${id}/chat?darkpopout&parent=${window.location.hostname}`

    return (
        <Box
            height="100%"
            position="relative"
            width="350px"
        >
            <iframe
                height="100%"
                src={chatUrl}
                width="100%"
                style={{
                    display: "block",
                    border: "none",
                }}
            ></iframe>
        </Box>
    )
}

export default Chat
