import { useStreamContext } from "../../commons/streamReducer"
import StreamListItem from "./StreamListItem"
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core"
import { SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable"
import { restrictToHorizontalAxis, restrictToParentElement } from "@dnd-kit/modifiers"
import { Box } from "@mui/material"

const StreamList = () => {
    const { streamState } = useStreamContext()

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event

        if (over !== null && active.id !== over.id) {
            return null
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
