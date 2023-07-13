import { useState, useEffect } from "react"
import TwitchPlayer from "react-player/twitch"
import { useStreamContext } from "../../commons/streamReducer"

interface StreamFrameContainerProps {
    channel: string
}

const StreamFrameContainer = ({ channel }: StreamFrameContainerProps) => {
    // Streamkey is used for reloading the stream
    const [streamKey, setStreamKey] = useState(1)
    const [streamReady, setStreamReady] = useState(false)

    const { removeStream } = useStreamContext()

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
            id={`${channel}-player`}
            url={`https://www.twitch.tv/${channel}`}
            height="100%"
            width="100%"
            playing={true}
            muted
            onReady={handleStreamReady}
            controls={false}
            onEnded={handleStreamReload} // Reload because sometimes ended streams freeze on ads
        />
    )
}

export default StreamFrameContainer
