import { memo, useEffect, useState } from "react"
import { default as ReactTwitchPlayer } from "react-player/twitch"
import { removeStream } from "../../commons/streamsState"
import { Stream } from "../../types"

interface TwitchPlayerProps {
    stream: Stream
}

const TwitchPlayer = (props: TwitchPlayerProps) => {
    // Streamkey is used for reloading the stream
    const [streamKey, setStreamKey] = useState(1)
    const [streamReady, setStreamReady] = useState(false)

    const { id } = props.stream

    useEffect(() => {
        const timeoutID = setTimeout(() => {
            if (!streamReady) {
                removeStream(id)
            }
        }, 20000)

        return () => {
            clearTimeout(timeoutID)
        }
    }, [streamReady])

    const handleStreamReload = () => {
        setStreamReady(false)
        setStreamKey((streamKey) => streamKey + 1)
    }

    const handleStreamReady = () => {
        setStreamReady(true)
    }

    return (
        <ReactTwitchPlayer
            key={streamKey}
            muted
            controls={false}
            height="100%"
            id={`${id}-player`}
            playing={true}
            url={`https://www.twitch.tv/${id}`}
            width="100%"
            onEnded={handleStreamReload} // Reload because sometimes ended streams freeze on ads
            onReady={handleStreamReady}
        />
    )
}

export default memo(TwitchPlayer)
