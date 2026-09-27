import { memo } from "react"
import ReactTwitchPlayer from "react-player/twitch"
import { removeStream } from "../../commons/streamsState"
import { Stream } from "../../types"

interface TwitchPlayerProps {
    stream: Stream
}

const TwitchPlayer = (props: TwitchPlayerProps) => {
    const { id } = props.stream

    const handleCloseStream = () => {
        const autoCloseEndedStream = localStorage.getItem("autocloseEndedStreams") === "true"

        if (autoCloseEndedStream) {
            removeStream(id)
        }
    }

    return (
        <ReactTwitchPlayer
            key={id}
            muted
            controls={false}
            height="100%"
            id={`${id}-player`}
            playing={true}
            url={`https://www.twitch.tv/${id}`}
            width="100%"
            onEnded={handleCloseStream}
        />
    )
}

export default memo(TwitchPlayer)
