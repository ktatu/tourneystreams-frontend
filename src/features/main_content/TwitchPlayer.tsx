import { memo } from "react"
import ReactTwitchPlayer from "react-player/twitch"
import { removeStream } from "../../commons/streamsState"
import { Stream } from "../../types"

interface TwitchPlayerProps {
    stream: Stream
}
// twitch streams sometimes won't autoplay in chrome, works in firefox
// reason: no elements can be on top of the stream when it renders. if there's no marginTop, then either the Toolbar or AppBar are considered to be on top of it
// on left side, opened drawer can also be on top of the stream
// possible workaround? use interactive frames, set a timer to play the video a moment after it has rendered. https://dev.twitch.tv/docs/embed/video-and-clips/
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
