import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import { Box, Button, Menu, Slide, Stack } from "@mui/material"
import { MouseEventHandler, useEffect, useLayoutEffect, useRef, useState } from "react"
import { useStreamsState } from "../../commons/streamsState"
import DragAndDropWrapper, { MovementAxis } from "./DragAndDropWrapper"
import StreamListItem from "./StreamListItem"

const StreamList = () => {
    const [showHorizontalList, setShowHorizontalList] = useState(true)
    const [showMenuButton, setShowMenuButton] = useState(false)
    const [firstComponentRender, setFirstComponentRender] = useState(true)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const { selectedChat, sortedStreams } = useStreamsState()

    const slideContainerRef = useRef(null)

    // layouteffect and firstComponentRender prevent showing a swap from list to menu to user on first render
    // relevant only when the site is loaded with > 3 streams in url's search parameters
    useLayoutEffect(() => {
        if (sortedStreams.length > 3) {
            setShowHorizontalList(false)
            setShowMenuButton(true)
        }
    }, [])

    useEffect(() => {
        if (firstComponentRender || anchorEl !== null) {
            setFirstComponentRender(false)
            return
        }

        if (sortedStreams.length > 3) {
            setShowHorizontalList(false)
        } else {
            setShowMenuButton(false)
        }
    }, [sortedStreams, anchorEl])

    const handleMenuOpen: MouseEventHandler = (event: React.MouseEvent<HTMLElement>): void => {
        setAnchorEl(event.currentTarget)
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
    }

    return (
        <Box
            ref={slideContainerRef}
            minHeight="50px"
            minWidth="800px"
            overflow="hidden"
            position="relative"
        >
            <Box
                display="flex"
                height="50px"
                position="absolute"
                width="700px"
            >
                <DragAndDropWrapper
                    movementAxis={MovementAxis.Horizontal}
                    sortableItems={sortedStreams.map((stream) => stream.id)}
                >
                    <Slide
                        appear={false}
                        container={slideContainerRef.current}
                        direction="right"
                        in={showHorizontalList}
                        timeout={firstComponentRender ? 0 : 500}
                        onExited={() => setShowMenuButton(true)}
                    >
                        <Box
                            display="flex"
                            gap={2}
                        >
                            {sortedStreams.map((stream, index) => {
                                const channelChatIsSelected = stream.id === selectedChat?.id

                                return (
                                    <StreamListItem
                                        key={index}
                                        channelChatIsSelected={channelChatIsSelected}
                                        oneStreamOpen={sortedStreams.length === 1}
                                        stream={stream}
                                    />
                                )
                            })}
                        </Box>
                    </Slide>
                </DragAndDropWrapper>
            </Box>
            <Box
                display="flex"
                height="50px"
                position="absolute"
                width="200px"
            >
                <Slide
                    appear={false}
                    container={slideContainerRef.current}
                    direction="right"
                    in={showMenuButton}
                    timeout={firstComponentRender ? 0 : 500}
                    onExited={() => setShowHorizontalList(true)}
                >
                    <Box
                        alignItems="center"
                        display="flex"
                    >
                        <Button
                            endIcon={<KeyboardArrowDownIcon />}
                            variant="contained"
                            onClick={handleMenuOpen}
                        >
                            Streams
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={anchorEl !== null}
                            onClose={handleMenuClose}
                        >
                            <DragAndDropWrapper
                                movementAxis={MovementAxis.Vertical}
                                sortableItems={sortedStreams.map((stream) => stream.id)}
                            >
                                <Stack direction="column">
                                    {sortedStreams.map((stream) => {
                                        const channelChatIsSelected = stream.id === selectedChat?.id

                                        return (
                                            <StreamListItem
                                                key={stream.id}
                                                channelChatIsSelected={channelChatIsSelected}
                                                oneStreamOpen={false}
                                                stream={stream}
                                            />
                                        )
                                    })}
                                </Stack>
                            </DragAndDropWrapper>
                        </Menu>
                    </Box>
                </Slide>
            </Box>
        </Box>
    )
}

export default StreamList
