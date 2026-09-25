import { Box, Stack } from "@mui/material"
import { TwitchStream } from "../../../types"
import FilterByField from "../shared_components/FilterByField"
import SortBySelect from "../shared_components/SortBySelect"
import StreamCard from "./StreamCard"
import useStreamsFilterAndSort from "./hooks/useStreamsFilterAndSort"

interface FollowedStreamsProps {
    followedStreams: Array<TwitchStream>
}

const FollowedStreamsList = ({ followedStreams }: FollowedStreamsProps) => {
    const {
        filterType,
        filterValue,
        setFilterType,
        setFilterValue,
        setSortValue,
        sortValue,
        streams,
    } = useStreamsFilterAndSort(followedStreams)

    return (
        <Stack
            direction="column"
            gap={1}
        >
            <Box
                alignItems="center"
                display="flex"
                gap={3}
                paddingBottom={5}
                paddingTop={2}
            >
                <SortBySelect
                    setSortValue={setSortValue}
                    sortOptions={[
                        { label: "category", value: "category" },
                        { label: "viewer count", value: "viewerCount" },
                    ]}
                    sortValue={sortValue}
                />
                <FilterByField
                    filterType={filterType}
                    filterValue={filterValue}
                    setFilterType={(filterBy) =>
                        setFilterType(filterBy === "channelName" ? "channel name" : filterBy)
                    }
                    setFilterValue={setFilterValue}
                    filterOptions={[
                        { label: "category", value: "category" },
                        { label: "channel name", value: "channelName" },
                        { label: "title", value: "title" },
                    ]}
                />
            </Box>
            <Stack
                direction="column"
                gap={3}
            >
                {streams.map((stream) => (
                    <StreamCard
                        key={stream.loginName}
                        followedStream={stream}
                    />
                ))}
            </Stack>
        </Stack>
    )
}

export default FollowedStreamsList
