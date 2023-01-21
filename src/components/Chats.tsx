import { useState } from "react"
import { Box } from "@mui/material"

const Chats = () => {
    const [channels, setChannels] = useState([])
    const [selectedChannel, setSelectedChannel] = useState<string>("tfue")

    return (
        <Box
            display="flex"
            flexDirection="column"
        >
            <Box></Box>
            <Box>
                <iframe
                    src={`https://www.twitch.tv/embed/${selectedChannel}/chat?parent=localhost`}
                    style={{ border: 0 }}
                    height="800"
                    width="350"
                ></iframe>
            </Box>
        </Box>
    )
}

export default Chats
