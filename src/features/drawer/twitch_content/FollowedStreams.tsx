import StreamCard, { FollowedStream } from "./StreamCard"
import { Box, Stack } from "@mui/material"
import orderBy from "lodash.orderby"
import { useState } from "react"
import FilterByField from "./FilterByField"
import SortBySelect from "./SortBySelect"
import { streamsState } from "../../../commons/streamsState"

export enum FilterBy {
    Category = "category",
    ChannelName = "channel name",
    Title = "title",
}

// enum values must match keys in FollowedStream for sorting function to work
export enum SortBy {
    ViewerCount = "viewerCount",
    Category = "category",
}

interface FollowedStreamsProps {
    followedStreams: Array<FollowedStream>
}

const FollowedStreams = ({ followedStreams }: FollowedStreamsProps) => {
    const [filterValue, setFilterValue] = useState("")
    const [filterType, setFilterType] = useState(FilterBy.ChannelName)
    const [sortValue, setSortValue] = useState(SortBy.ViewerCount)

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

    return (
        <Stack
            direction="column"
            gap={3}
        >
            <Box
                display="flex"
                gap={3}
                alignItems="center"
                paddingTop={2}
                paddingBottom={5}
            >
                <SortBySelect
                    sortValue={sortValue}
                    setSortValue={setSortValue}
                />
                <FilterByField
                    filterValue={filterValue}
                    setFilterValue={setFilterValue}
                    filterType={filterType}
                    setFilterType={setFilterType}
                />
            </Box>
            <Stack
                direction="column"
                gap={5}
            >
                {sortedStreams.map((followedStream) => (
                    <StreamCard
                        key={followedStream.loginName}
                        followedStream={followedStream}
                    />
                ))}
            </Stack>
        </Stack>
    )
}

const streamIsCurrentlyWatched = (followedStream: FollowedStream) => {
    return streamsState.channels.includes(followedStream.loginName)
}

export default FollowedStreams
