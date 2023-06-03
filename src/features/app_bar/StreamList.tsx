import { useStreamContext } from "../../commons/streamReducer"
import StreamListItem from "./StreamListItem"
import { Box, Slide } from "@mui/material"
import DragAndDropWrapper, { MovementAxis } from "./DragAndDropWrapper"
import { useEffect, useState, useRef } from "react"

const StreamList = () => {
    const [horizontalListChecked, setHorizontalListChecked] = useState(true)

    const { streamState } = useStreamContext()

    const slideContainerRef = useRef(null)

    useEffect(() => {
        if (horizontalListChecked && streamState.streams.length > 3) {
            setHorizontalListChecked(false)
        }
    }, [streamState.streams])

    return (
        <DragAndDropWrapper
            movementAxis={MovementAxis.Horizontal}
            sortableItems={streamState.streams}
        >
            <Box
                display="flex"
                gap={1}
                ref={slideContainerRef}
                overflow="hidden"
            >
                <Slide
                    appear={false}
                    direction="right"
                    in={horizontalListChecked}
                    container={slideContainerRef.current}
                    timeout={500}
                >
                    <Box
                        display="flex"
                        gap={1}
                    >
                        {streamState.streams.map((channel) => (
                            <StreamListItem
                                key={channel}
                                channel={channel}
                                oneStreamOpen={streamState.streams.length === 1}
                            />
                        ))}
                    </Box>
                </Slide>
            </Box>
        </DragAndDropWrapper>
    )
}

export default StreamList
