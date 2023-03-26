import { useStreamContext } from "../../commons/streamReducer"

const Chat = () => {
    const { streamState } = useStreamContext()

    if (!streamState.selectedChannel || !streamState.chatIsVisible) {
        return null
    }

    return (
        <iframe
            src={`https://www.twitch.tv/embed/${streamState.selectedChannel}/chat?darkpopout&parent=localhost`}
            style={{ border: "none" }}
            width="320px"
        ></iframe>
    )
}

export default Chat
