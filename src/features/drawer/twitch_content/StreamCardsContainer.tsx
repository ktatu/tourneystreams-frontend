import axios from "axios"
import { useQuery } from "react-query"
import StreamCard, { FollowedStream } from "./StreamCard"
import { getCookie } from "typescript-cookie"
import { Stack } from "@mui/material"

const queryFollowedStreams = async () => {
    const twitchToken = getCookie("twitch-token")

    if (!twitchToken) {
        throw new Error("Twitch token missing")
    }

    const res = await axios.get("http://localhost:3001/api/twitch", {
        headers: { Authorization: `Bearer ${twitchToken}` },
    })

    return res.data
}

interface StreamCardsContainerProps {
    channelFilter: string
}

const StreamCardsContainer = ({ channelFilter }: StreamCardsContainerProps) => {
    const { isLoading, isError, data, error } = useQuery<FollowedStream[]>(
        "followedStreams",
        queryFollowedStreams,
        {
            retry: 1,
            cacheTime: 1000 * 100,
            staleTime: 1000 * 10 * 2,
        }
    )

    if (isLoading) {
        return <p>loading</p>
    }
    if (data) {
        return (
            <Stack
                direction="column"
                gap={5}
            >
                {data
                    .filter(
                        (followedStream) =>
                            followedStream.broadcastName
                                .toLowerCase()
                                .includes(channelFilter.toLowerCase()) ||
                            followedStream.loginName
                                .toLowerCase()
                                .includes(channelFilter.toLowerCase())
                    )
                    .map((followedStream) => (
                        <StreamCard
                            key={followedStream.loginName}
                            followedStream={followedStream}
                        />
                    ))}
            </Stack>
        )
    }

    if (isError) {
        console.log("error ", error)
    }

    return null
}

export default StreamCardsContainer
