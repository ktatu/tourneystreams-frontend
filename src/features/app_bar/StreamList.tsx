import { useStreamContext } from "../../commons/streamReducer"
import StreamListItem from "./StreamListItem"
import { Box, Button, Slide, Stack } from "@mui/material"
import DragAndDropWrapper, { MovementAxis } from "./DragAndDropWrapper"
import { useEffect, useLayoutEffect, useState, useRef } from "react"
import PopupMenu, { PopupMenuClose } from "../../commons/PopupMenu"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"

const StreamList = () => {
    const [showHorizontalList, setShowHorizontalList] = useState(true)
    const [showMenuButton, setShowMenuButton] = useState(false)
    const [firstComponentRender, setFirstComponentRender] = useState(true)

    const { streamState } = useStreamContext()

    const slideContainerRef = useRef(null)

    // layouteffect and firstComponentRender prevent showing a swap from list to menu to user on first render
    // relevant only when the url is loaded with > 3 streams in search parameters
    useLayoutEffect(() => {
        if (streamState.streams.length > 3) {
            setShowHorizontalList(false)
            setShowMenuButton(true)
        }
    }, [])

    useEffect(() => {
        if (firstComponentRender) {
            setFirstComponentRender(false)
            return
        }

        if (streamState.streams.length > 3) {
            setShowHorizontalList(false)
        } else {
            setShowMenuButton(false)
        }
    }, [streamState.streams])

    return (
        <>
            <Box
                ref={slideContainerRef}
                overflow="hidden"
                bgcolor="red"
                position="relative"
                minWidth="800px"
                minHeight="50px"
            >
                <Box
                    width="700px"
                    height="50px"
                    bgcolor="green"
                    position="absolute"
                    display="flex"
                >
                    <DragAndDropWrapper
                        movementAxis={MovementAxis.Horizontal}
                        sortableItems={streamState.streams}
                    >
                        <Slide
                            appear={false}
                            direction="right"
                            in={showHorizontalList}
                            container={slideContainerRef.current}
                            timeout={firstComponentRender ? 0 : 500}
                            onExited={() => setShowMenuButton(true)}
                        >
                            <Box
                                display="flex"
                                gap={2}
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
                    </DragAndDropWrapper>
                    <Button onClick={() => setShowHorizontalList(false)}>click</Button>
                </Box>
                <Box
                    width="200px"
                    height="50px"
                    position="absolute"
                    display="flex"
                >
                    <Slide
                        appear={false}
                        direction="right"
                        in={showMenuButton}
                        container={slideContainerRef.current}
                        timeout={firstComponentRender ? 0 : 500}
                        onExited={() => setShowHorizontalList(true)}
                    >
                        <Box
                            display="flex"
                            alignItems="center"
                        >
                            <PopupMenu
                                buttonProps={{
                                    buttonText: "streams",
                                    buttonIcon: <KeyboardArrowDownIcon />,
                                }}
                            >
                                <DragAndDropWrapper
                                    movementAxis={MovementAxis.Vertical}
                                    sortableItems={streamState.streams}
                                >
                                    <Stack
                                        direction="column"
                                        gap={0}
                                    >
                                        {streamState.streams.map((channel) => (
                                            <StreamListItem
                                                key={channel}
                                                channel={channel}
                                                oneStreamOpen={false}
                                            />
                                        ))}
                                    </Stack>
                                </DragAndDropWrapper>
                            </PopupMenu>
                        </Box>
                    </Slide>
                </Box>
            </Box>
        </>
    )
}

export default StreamList
