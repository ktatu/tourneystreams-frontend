import { memo } from "react"
import { default as ReactTwitchPlayer } from "react-player/twitch"
import { Stream } from "../../types"

interface TwitchPlayerProps {
    stream: Stream
}
// the 1st twitch stream won't autoplay in chrome, works in firefox
// possibly related (suggestions didn't work): https://github.com/cookpete/react-player/issues/460
const TwitchPlayer = (props: TwitchPlayerProps) => {
    const { id } = props.stream

    return (
        <ReactTwitchPlayer
            key={id}
            muted
            controls={true}
            height="100%"
            id={`${id}-player`}
            playing={true}
            url={`https://www.twitch.tv/${id}`}
            width="100%"
            playsinline
        />
    )
}

export default memo(TwitchPlayer)
