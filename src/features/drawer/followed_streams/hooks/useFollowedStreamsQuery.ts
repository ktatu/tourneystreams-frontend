// AI-assisted by Claude Sonnet 5.5 (GitHub Copilot): switched to TanStack Query v5 syntax, as part of the Vite/dependency migration.
import { useQuery } from "@tanstack/react-query"
import { get } from "../../../../commons/authRequests"
import { TwitchStream } from "../../../../types"

const useFollowedStreamsQuery = () => {
    const queryResult = useQuery<Array<TwitchStream>>({
        queryKey: ["followedStreams"],
        queryFn: queryFollowedStreams,
        retry: 1,
        gcTime: 1000 * 100,
        staleTime: 1000 * 10 * 2,
    })

    return queryResult
}

const queryFollowedStreams = async () => {
    const res = await get<{ streams: Array<TwitchStream> }>("twitch")

    return res.data.streams
}

export default useFollowedStreamsQuery
