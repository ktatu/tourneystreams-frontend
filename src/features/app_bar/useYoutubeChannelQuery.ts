import axios from "axios"
import { useQuery } from "react-query"
import { BACKEND_BASE_URL } from "../../envConfig"
import { StreamSource } from "../../types"

const useYoutubeChannelQuery = (streamId: string, streamSource: StreamSource) => {
    const queryResult = useQuery<string>(
        ["youtubeChannel", streamId],
        () => queryYoutubeChannel(streamId),
        {
            retry: 1,
            cacheTime: Infinity,
            staleTime: Infinity,
            enabled: streamSource === "youtube",
        },
    )

    return queryResult
}

const queryYoutubeChannel = async (streamId: string) => {
    const res = await axios.get(`${BACKEND_BASE_URL}/youtube/channelname/${streamId}`)

    return res.data.channel
}

export default useYoutubeChannelQuery
