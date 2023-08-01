import { useStreamContext } from "../../commons/streamReducer"

const Chat = () => {
    const { streamState } = useStreamContext()

    if (!streamState.selectedChannel || !streamState.chatIsVisible) {
        return null
    }

    console.log("window location host name ", window.location.hostname)

    return (
        <iframe
            src={`https://www.twitch.tv/embed/${streamState.selectedChannel}/chat?darkpopout&parent=${window.location.hostname}`}
            style={{
                display: "block",
                border: "none",
            }}
            height="100%"
            width="340px"
        ></iframe>
    )
}

export default Chat
