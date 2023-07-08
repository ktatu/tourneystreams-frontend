import axios, { AxiosError } from "axios"
import { useQuery } from "react-query"
import StreamCard, { FollowedStream } from "./StreamCard"
import { Stack } from "@mui/material"
import { getCookie, setCookie } from "typescript-cookie"
import { FilterBy, SortBy } from "."
import orderBy from "lodash.orderby"

const queryFollowedStreams = async () => {
    const twitchToken = getCookie("twitch-token")

    if (!twitchToken) {
        throw new Error("Twitch token missing")
    }

    try {
        const res = await axios.get("http://localhost:3001/api/twitch", {
            headers: { Authorization: `Bearer ${twitchToken}` },
        })

        if (res.data.newToken) {
            setCookie("twitch-token", res.data.newToken)
        }

        return res.data.streams
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            // TODO: need to expect and handle at least 2 error types: too many requests to twitch (429)
            // and various server-side errors (500)
            console.error("Error in query followed streams: ", error)
            //removeCookie("twitch-token")
        }
    }
}

interface StreamCardsContainerProps {
    filterType: FilterBy
    filterValue: string
    sortValue: SortBy
}

const StreamCardsContainer = ({
    filterType,
    filterValue,
    sortValue,
}: StreamCardsContainerProps) => {
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
        const sortedStreams =
            sortValue === "viewerCount"
                ? orderBy(data, ["viewerCount"], ["desc"])
                : orderBy(data, ["category", "viewerCount"], ["asc", "desc"])

        const filteredStreams = sortedStreams.filter((followedStream) => {
            if (filterType === "channel name") {
                return (
                    followedStream.broadcastName
                        .toLowerCase()
                        .includes(filterValue.toLowerCase()) ||
                    followedStream.loginName.toLowerCase().includes(filterValue.toLowerCase())
                )
            }

            return followedStream.category.toLowerCase().includes(filterValue.toLowerCase())
        })

        return (
            <Stack
                direction="column"
                gap={5}
            >
                {filteredStreams.map((followedStream) => (
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
