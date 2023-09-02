import { Box, Stack } from "@mui/material"
import FilterByField from "./FilterByField"
import SortBySelect from "./SortBySelect"
import StreamCard, { FollowedStream } from "./StreamCard"
import useStreamsFilterAndSort from "./useStreamsFilterAndSort"

interface FollowedStreamsProps {
    followedStreams: Array<FollowedStream>
}

const FollowedStreams = ({ followedStreams }: FollowedStreamsProps) => {
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
            gap={3}
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
                    sortValue={sortValue}
                />
                <FilterByField
                    filterType={filterType}
                    filterValue={filterValue}
                    setFilterType={setFilterType}
                    setFilterValue={setFilterValue}
                />
            </Box>
            <Stack
                direction="column"
                gap={5}
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

export default FollowedStreams
