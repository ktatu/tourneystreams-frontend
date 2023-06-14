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
    const { swapStreamPositions } = useStreamContext()

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event

        console.log("active id ", active.id)
        console.log("over id ", over?.id)

        if (over === null || !isString(active.id) || !isString(over.id)) {
            return
        }

        const channel1 = active.id as string
        const channel2 = over.id as string

        if (active.id !== over.id) {
            /*
            const draggedStreamOldPositionIndex = sortableItems.indexOf(active.id as string)
            const draggedStreamNewPositionIndex = sortableItems.indexOf(over.id as string)

            const newStreamArray = arrayMove(
                sortableItems,
                draggedStreamOldPositionIndex,
                draggedStreamNewPositionIndex
            )

            setStreams(newStreamArray)
            */
            console.log("swapping positions")
            swapStreamPositions(channel1, channel2)
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
