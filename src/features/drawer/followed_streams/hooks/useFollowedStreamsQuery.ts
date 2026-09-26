import axios from "axios"
import { useQuery } from "react-query"
import { BACKEND_BASE_URL } from "../../../../envConfig"
import { TwitchStream } from "../../../../types"

const useFollowedStreamsQuery = () => {
    const queryResult = useQuery<TwitchStream[]>("followedStreams", queryFollowedStreams, {
        retry: 1,
        cacheTime: 1000 * 100,
        staleTime: 1000 * 10 * 2,
    })

    return queryResult
}

const queryFollowedStreams = async () => {
    const res = await axios.get(`${BACKEND_BASE_URL}/twitch`, {
        withCredentials: true,
    })

    return res.data.streams
}

export default useFollowedStreamsQuery
