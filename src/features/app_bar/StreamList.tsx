import { useStreamContext } from "../../commons/streamReducer"
import StreamListItem from "./StreamListItem"
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core"
import { SortableContext, horizontalListSortingStrategy, arrayMove } from "@dnd-kit/sortable"
import { restrictToHorizontalAxis, restrictToParentElement } from "@dnd-kit/modifiers"
import { Box } from "@mui/material"
import { isString } from "../../commons/typeValidation"

const StreamList = () => {
    const { streamState, setStreams } = useStreamContext()

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event

        if (over === null || !isString(active.id) || !isString(over.id)) {
            return
        }

        if (active.id !== over.id) {
            const draggedStreamOldPositionIndex = streamState.streams.indexOf(active.id as string)
            const draggedStreamNewPositionIndex = streamState.streams.indexOf(over.id as string)

            const newStreamArray = arrayMove(
                streamState.streams,
                draggedStreamOldPositionIndex,
                draggedStreamNewPositionIndex
            )

            setStreams(newStreamArray)
        }
    }

    return (
        <Box
            display="flex"
            gap={1}
        >
            <DndContext
                collisionDetection={closestCenter}
                modifiers={[restrictToHorizontalAxis, restrictToParentElement]}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={streamState.streams}
                    strategy={horizontalListSortingStrategy}
                >
                    {streamState.streams.map((channel) => (
                        <StreamListItem
                            key={channel}
                            channel={channel}
                            oneStreamOpen={streamState.streams.length === 1}
                        />
                    ))}
                </SortableContext>
            </DndContext>
        </Box>
    )
}

export default StreamList
