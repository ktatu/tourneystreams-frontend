import PopupMenu, { PopupMenuClose } from "../../commons/PopupMenu"
import { useRef } from "react"

const StreamsControls = () => {
    const streamsMenuRef = useRef<PopupMenuClose>(null)

    return (
        <>
            <PopupMenu
                buttonProps={{ buttonText: "Streams" }}
                ref={streamsMenuRef}
            >
                <div />
            </PopupMenu>
        </>
    )
}

export default StreamsControls
