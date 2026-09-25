import axios from "axios"
import { useQuery } from "react-query"
import { getCookie } from "typescript-cookie"
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
    const twitchToken = getCookie("twitch-token")

    if (!twitchToken) {
        throw new Error("Twitch token missing")
    }

    const res = await axios.get(`${BACKEND_BASE_URL}/twitch`, {
        headers: { Authorization: `Bearer ${twitchToken}` },
    })

    return res.data.streams
}

export default useFollowedStreamsQuery
