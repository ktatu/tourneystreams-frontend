import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core"
import { SortableContext, rectSwappingStrategy } from "@dnd-kit/sortable"
import {
    restrictToHorizontalAxis,
    restrictToVerticalAxis,
    restrictToParentElement,
} from "@dnd-kit/modifiers"
import { isString } from "../../commons/typeValidation"
import { swapDisplayPositions } from "../../commons/streamsState"

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
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event

        if (over === null || !isString(active.id) || !isString(over.id)) {
            return
        }

        const channel1 = active.id as string
        const channel2 = over.id as string

        if (active.id !== over.id) {
            swapDisplayPositions(channel1, channel2)
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
                strategy={rectSwappingStrategy}
            >
                {children}
            </SortableContext>
        </DndContext>
    )
}

export default DragAndDropWrapper
