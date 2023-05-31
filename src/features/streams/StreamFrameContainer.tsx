import { Box } from "@mui/material"
import { useState, useEffect } from "react"
import TwitchPlayer from "react-player/twitch"
import { useStreamContext } from "../../commons/streamReducer"
import TailSpinner from "./TailSpinner"

interface StreamFrameContainerProps {
    channel: string
    frameWidth: number
    frameHeight: number
}

const StreamFrameContainer = ({ channel, frameWidth, frameHeight }: StreamFrameContainerProps) => {
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
                        height: frameHeight,
                        width: frameWidth,
                    }}
                >
                    <TwitchPlayer
                        key={streamKey}
                        id={`${channel}-player`}
                        url={`https://www.twitch.tv/${channel}`}
                        height={frameHeight}
                        width={frameWidth}
                        playing={true}
                        onReady={handleStreamReady}
                        controls={false}
                        onEnded={handleStreamReload} // Reload because sometimes ended streams freeze on ads
                    />
                </div>
            </div>
            <div hidden={streamReady}>
                <StreamFramePlaceholder
                    frameWidth={frameWidth}
                    frameHeight={frameHeight}
                />
            </div>
        </Box>
    )
}

interface StreamPlaceholderProps {
    frameWidth: number
    frameHeight: number
}

const StreamFramePlaceholder = ({ frameWidth, frameHeight }: StreamPlaceholderProps) => {
    return (
        <Box
            bgcolor="black"
            display="flex"
            height={frameHeight}
            width={frameWidth}
        >
            <TailSpinner
                color="#FFFFFF"
                spinnerWidth="5px"
                containerHeight={`${frameHeight}px`}
                containerWidth={`${frameWidth}px`}
            />
        </Box>
    )
}

export default StreamFrameContainer
