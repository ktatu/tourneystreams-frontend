import { useEffect } from "react"

type YoutubePlayerProps = {
    youtubeApiReady: boolean
    videoId: string
}

const YoutubePlayer = (props: YoutubePlayerProps) => {
    useEffect(() => {
        if (!props.youtubeApiReady) {
            return
        }

        new window.YT.Player(props.videoId, {
            videoId: props.videoId,
            height: "100%",
            width: "100%",
            events: {
                onReady: (event) => {
                    event.target.playVideo()
                },
            },
        })
    }, [props.youtubeApiReady])

    return <div id={props.videoId} />
}

export default YoutubePlayer
