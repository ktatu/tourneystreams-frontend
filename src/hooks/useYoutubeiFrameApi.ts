import { useEffect, useState } from "react"

// https://developers.google.com/youtube/iframe_api_reference
const useYoutubeiFrameApi = () => {
    const [youtubeApiReady, setYoutubeApiReady] = useState(false)

    useEffect(() => {
        if (!window.YT) {
            const tag = document.createElement("script")
            tag.src = "https://www.youtube.com/iframe_api"
            document.head.appendChild(tag)
        }

        window.onYouTubeIframeAPIReady = () => {
            setYoutubeApiReady(true)
        }
    }, [])

    return {
        youtubeApiReady,
    }
}

export default useYoutubeiFrameApi
