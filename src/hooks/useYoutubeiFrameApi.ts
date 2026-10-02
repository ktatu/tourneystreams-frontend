import { useState } from "react"

// https://developers.google.com/youtube/iframe_api_reference
const useYoutubeiFrameApi = () => {
    const [youtubeApiReady, setYoutubeApiReady] = useState(Boolean(window.YT))

    const loadYoutubeIframeApi = () => {
        if (window.YT) {
            return
        }

        const tag = document.createElement("script")
        tag.src = "https://www.youtube.com/iframe_api"
        document.head.appendChild(tag)

        window.onYouTubeIframeAPIReady = () => {
            setYoutubeApiReady(true)
        }
    }

    return {
        loadYoutubeIframeApi,
        youtubeApiReady,
    }
}

export default useYoutubeiFrameApi

// vaihdetaan singleton classiin joka tekee saman asian. otetaan appissa kutsutaan static loadia, playerissä get isLoaded
