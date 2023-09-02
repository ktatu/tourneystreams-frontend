import orderBy from "lodash.orderby"
import { useState } from "react"
import { streamsState } from "../../../commons/streamsState"
import { FollowedStream } from "./StreamCard"

export type FilterBy = "category" | "channel name" | "title"

export type SortBy = "viewerCount" | "category"

const useStreamsFilterAndSort = (followedStreams: Array<FollowedStream>) => {
    const [filterType, setFilterType] = useState<FilterBy>("channel name")
    const [filterValue, setFilterValue] = useState("")
    const [sortValue, setSortValue] = useState<SortBy>("viewerCount")

    const filteredStreams = followedStreams.filter((followedStream) => {
        if (filterType === "channel name") {
            return (
                followedStream.broadcastName.toLowerCase().includes(filterValue.toLowerCase()) ||
                followedStream.loginName.toLowerCase().includes(filterValue.toLowerCase())
            )
        } else if (filterType === "title") {
            return followedStream.title.toLowerCase().includes(filterValue.toLowerCase())
        }

        return followedStream.category.toLowerCase().includes(filterValue.toLowerCase())
    })

    const sortedStreams =
        sortValue === "viewerCount"
            ? orderBy(filteredStreams, [streamIsCurrentlyWatched, "viewerCount"], ["desc", "desc"])
            : orderBy(
                  filteredStreams,
                  [streamIsCurrentlyWatched, "category", "viewerCount"],
                  ["desc", "asc", "desc"]
              )

    return {
        filterType,
        filterValue,
        setFilterType,
        setFilterValue,
        setSortValue,
        sortValue,
        streams: sortedStreams,
    }
}

const streamIsCurrentlyWatched = (followedStream: FollowedStream) => {
    return streamsState.channels.includes(followedStream.loginName)
}

export default useStreamsFilterAndSort
