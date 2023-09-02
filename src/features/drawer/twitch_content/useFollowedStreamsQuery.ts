import axios from "axios"
import { useQuery } from "react-query"
import { getCookie, setCookie } from "typescript-cookie"
import { BACKEND_BASE_URL } from "../../../envConfig"
import { FollowedStream } from "./StreamCard"

const useFollowedStreamsQuery = () => {
    const queryResult = useQuery<FollowedStream[]>("followedStreams", queryFollowedStreams, {
        retry: 1,
        cacheTime: 1000 * 100, // 10 minutes
        staleTime: 1000 * 10 * 2, // 2 minutes
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

    if (res.data.newToken) {
        setCookie("twitch-token", res.data.newToken)
    }

    return res.data.streams
}

export default useFollowedStreamsQuery
