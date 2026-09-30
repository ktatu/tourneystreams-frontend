import { useQuery } from "react-query"
import { fetch } from "../../../../commons/authRequests"
import { TwitchStream } from "../../../../types"

const useFollowedStreamsQuery = () => {
    const queryResult = useQuery<Array<TwitchStream>>("followedStreams", queryFollowedStreams, {
        retry: 1,
        cacheTime: 1000 * 100,
        staleTime: 1000 * 10 * 2,
    })

    return queryResult
}

const queryFollowedStreams = async () => {
    const res = await fetch<{ streams: Array<TwitchStream> }>("twitch")

    return res.data.streams
}

export default useFollowedStreamsQuery
