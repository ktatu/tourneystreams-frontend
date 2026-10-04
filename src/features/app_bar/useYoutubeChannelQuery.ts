import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { BACKEND_BASE_URL } from "../../envConfig"
import { StreamSource } from "../../types"

const useYoutubeChannelQuery = (streamId: string, streamSource: StreamSource) => {
    const queryResult = useQuery<string>({
        queryKey: ["youtubeChannel", streamId],
        queryFn: () => queryYoutubeChannel(streamId),
        retry: 1,
        gcTime: Infinity,
        staleTime: Infinity,
        enabled: streamSource === "youtube",
    })

    return queryResult
}

const queryYoutubeChannel = async (streamId: string) => {
    const res = await axios.get(`${BACKEND_BASE_URL}/youtube/channelname/${streamId}`)

    return res.data.channel
}

export default useYoutubeChannelQuery
