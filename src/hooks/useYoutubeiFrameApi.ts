import { useCallback, useState } from "react"

// https://developers.google.com/youtube/iframe_api_reference
const useYoutubeiFrameApi = () => {
    const [youtubeApiReady, setYoutubeApiReady] = useState(Boolean(window.YT))

    const loadYoutubeIframeApi = useCallback(() => {
        if (window.YT) {
            setYoutubeApiReady(true)
            return
        }

        if (document.querySelector("script[src='https://www.youtube.com/iframe_api']")) {
            return
        }

        const tag = document.createElement("script")
        tag.src = "https://www.youtube.com/iframe_api"
        document.head.appendChild(tag)

        window.onYouTubeIframeAPIReady = () => {
            setYoutubeApiReady(true)
        }
    }, [])

    return {
        loadYoutubeIframeApi,
        youtubeApiReady,
    }
}

export default useYoutubeiFrameApi
