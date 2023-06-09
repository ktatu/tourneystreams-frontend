import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core"
import {
    SortableContext,
    horizontalListSortingStrategy,
    verticalListSortingStrategy,
    arrayMove,
} from "@dnd-kit/sortable"
import {
    restrictToHorizontalAxis,
    restrictToVerticalAxis,
    restrictToParentElement,
} from "@dnd-kit/modifiers"
import { useStreamContext } from "../../commons/streamReducer"
import { isString } from "../../commons/typeValidation"

export enum MovementAxis {
    Horizontal,
    Vertical,
}

interface DragAndDropWrapperProps {
    children: JSX.Element
    movementAxis: MovementAxis
    sortableItems: Array<string>
}

const DragAndDropWrapper = ({ children, movementAxis, sortableItems }: DragAndDropWrapperProps) => {
    const { setStreams } = useStreamContext()

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event

        if (over === null || !isString(active.id) || !isString(over.id)) {
            return
        }

        if (active.id !== over.id) {
            const draggedStreamOldPositionIndex = sortableItems.indexOf(active.id as string)
            const draggedStreamNewPositionIndex = sortableItems.indexOf(over.id as string)

            const newStreamArray = arrayMove(
                sortableItems,
                draggedStreamOldPositionIndex,
                draggedStreamNewPositionIndex
            )

            setStreams(newStreamArray)
        }
    }

    return (
        <DndContext
            collisionDetection={closestCenter}
            modifiers={[
                movementAxis === MovementAxis.Horizontal
                    ? restrictToHorizontalAxis
                    : restrictToVerticalAxis,
                restrictToParentElement,
            ]}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={sortableItems}
                strategy={
                    movementAxis === MovementAxis.Horizontal
                        ? horizontalListSortingStrategy
                        : verticalListSortingStrategy
                }
            >
                {children}
            </SortableContext>
        </DndContext>
    )
}

export default DragAndDropWrapper
