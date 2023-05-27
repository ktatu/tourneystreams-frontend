import { Box } from "@mui/material"
import { useState, useEffect, useRef } from "react"
import TwitchPlayer from "react-player/twitch"
import { useStreamContext } from "../../commons/streamReducer"
import TailSpinner from "./TailSpinner"

interface StreamFrameContainerProps {
    channel: string
    frameSize: { width: number; height: number }
}

const StreamFrameContainer = ({ channel, frameSize }: StreamFrameContainerProps) => {
    // Streamkey is used for reloading the stream
    const [streamKey, setStreamKey] = useState(1)
    const [streamReady, setStreamReady] = useState(false)

    const { removeStream } = useStreamContext()

    useEffect(() => {
        const timeoutID = setTimeout(() => {
            if (!streamReady) {
                removeStream(channel)
            }
        }, 10000)

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
        <Box
            alignContent="center"
            justifyContent="center"
        >
            <div hidden={!streamReady}>
                <div
                    style={{
                        position: "relative",
                        display: "flex",
                        height: frameSize.height,
                        width: frameSize.width,
                    }}
                >
                    <TwitchPlayer
                        key={streamKey}
                        id={`${channel}-player`}
                        url={`https://www.twitch.tv/${channel}`}
                        height={frameSize.height}
                        width={frameSize.width}
                        playing={true}
                        onReady={handleStreamReady}
                        volume={0}
                        controls={false}
                        onEnded={handleStreamReload} // Reload because sometimes ended streams freeze on ads
                    />
                </div>
            </div>
            <div hidden={streamReady}>
                <StreamFramePlaceholder frameSize={frameSize} />
            </div>
        </Box>
    )
}

interface StreamPlaceholderProps {
    frameSize: { width: number; height: number }
}

const StreamFramePlaceholder = ({ frameSize }: StreamPlaceholderProps) => {
    return (
        <Box
            bgcolor="black"
            display="flex"
            height={frameSize.height}
            width={frameSize.width}
        >
            <TailSpinner
                color="#FFFFFF"
                spinnerWidth="5px"
                containerHeight={`${frameSize.height}px`}
                containerWidth={`${frameSize.width}px`}
            />
        </Box>
    )
}

export default StreamFrameContainer
