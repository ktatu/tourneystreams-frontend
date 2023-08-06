import { useStreamContext } from "../../commons/streamReducer"
import StreamListItem from "./StreamListItem"
import { Box, Button, Menu, Slide, Stack } from "@mui/material"
import DragAndDropWrapper, { MovementAxis } from "./DragAndDropWrapper"
import { useEffect, useLayoutEffect, useState, useRef, MouseEventHandler } from "react"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"

const StreamList = () => {
    const { streamState } = useStreamContext()

    const sortedChannels = streamState.streams
        .sort((stream1, stream2) => stream1.displayPosition - stream2.displayPosition)
        .map((stream) => stream.channelName)

    return (
        <>
            <Box
                width="700px"
                height="50px"
                display="flex"
            >
                <DragAndDropWrapper
                    movementAxis={MovementAxis.Horizontal}
                    sortableItems={sortedChannels}
                >
                    <Box
                        display="flex"
                        gap={2}
                    >
                        {sortedChannels.map((channel) => (
                            <StreamListItem
                                key={channel}
                                channel={channel}
                                oneStreamOpen={streamState.streams.length === 1}
                            />
                        ))}
                    </Box>
                </DragAndDropWrapper>
            </Box>
        </>
    )
}

export default StreamList
