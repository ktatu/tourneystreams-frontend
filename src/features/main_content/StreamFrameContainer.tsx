import { memo, useEffect, useState } from "react"
import TwitchPlayer from "react-player/twitch"
import { removeStream } from "../../commons/streamsState"

interface StreamFrameContainerProps {
    channel: string
}

const StreamFrameContainer = ({ channel }: StreamFrameContainerProps) => {
    // Streamkey is used for reloading the stream
    const [streamKey, setStreamKey] = useState(1)
    const [streamReady, setStreamReady] = useState(false)

    useEffect(() => {
        const timeoutID = setTimeout(() => {
            if (!streamReady) {
                removeStream(channel)
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
        <TwitchPlayer
            key={streamKey}
            muted
            controls={false}
            height="100%"
            id={`${channel}-player`}
            playing={true}
            url={`https://www.twitch.tv/${channel}`}
            width="100%"
            onEnded={handleStreamReload} // Reload because sometimes ended streams freeze on ads
            onReady={handleStreamReady}
        />
    )
}

export default memo(StreamFrameContainer)
