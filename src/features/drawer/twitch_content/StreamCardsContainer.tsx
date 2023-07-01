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

const StreamCardsContainer = () => {
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
                {data.map((followedStream) => (
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

    /*
    const { isLoading, isError, data, error } = useQuery<FollowedStream[]>(
        "followedStream",
        async () => {
            const res = await axios.get<any[]>("http://localhost:3005/api/twitch", {
                headers: { Authorization: `Bearer ${twitchToken}` },
            })

            if (res.data === undefined) {
                throw new Error("No tourneys")
            }

            const tourneyInfoFilteredByGame = useGameFilter(res.data)

            return tourneyInfoFilteredByGame
        }
    )*/

    /*
    const { isLoading, isError, data, error } = useQuery("tourneyInfo", async () => {
        const res = await axios.get("http://localhost:3001/tourneyInfos")

        if (res.data === undefined) {
            throw new Error("No tourneys")
        }

        const tourneyInfoFilteredByGame = useGameFilter(res.data)

        return tourneyInfoFilteredByGame
    })*/

    return null
}

export default StreamCardsContainer
