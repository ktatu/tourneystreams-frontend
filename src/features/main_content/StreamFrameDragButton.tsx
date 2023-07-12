import { Box, ButtonBase, Tooltip } from "@mui/material"
import PanToolOutlinedIcon from "@mui/icons-material/PanToolOutlined"
import { useState } from "react"

interface StreamFrameDragProps {
    dragButtonVisible: boolean
}

const StreamFrameDragButton = ({ dragButtonVisible }: StreamFrameDragProps) => {
    const [isDragging, setIsDragging] = useState(false)
    const [dragBoxPosition, setDragBoxPosition] = useState({ x: 0, y: 0 })
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })

    const handleMouseMove = (event: React.MouseEvent) => {
        if (isDragging) {
            setDragBoxPosition({
                x: event.clientX - dragOffset.x,
                y: event.clientY - dragOffset.y,
            })
        }
    }

    const handleMouseDown = (event: React.MouseEvent) => {
        setIsDragging(true)

        const { left, top } = event.currentTarget.getBoundingClientRect()
        setDragOffset({ x: event.clientX - left, y: event.clientY - top })
    }

    if (!dragButtonVisible) {
        return null
    }

    return (
        <div onMouseMove={handleMouseMove}>
            <ButtonBase
                disableRipple
                sx={{ padding: 2 }}
            >
                <Tooltip title="Move stream (hold and drag)">
                    <PanToolOutlinedIcon
                        fontSize="large"
                        sx={{
                            transform: "scale(1.5)",
                            "&hover": {
                                backgroundColor: "transparent",
                            },
                        }}
                    />
                </Tooltip>
            </ButtonBase>
        </div>
    )
}

export default StreamFrameDragButton
