import StreamListItem from "./StreamListItem"
import { Box, Button, Menu, Slide, Stack } from "@mui/material"
import DragAndDropWrapper, { MovementAxis } from "./DragAndDropWrapper"
import { useEffect, useLayoutEffect, useState, useRef, MouseEventHandler } from "react"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import { useStreamsState } from "../../commons/streamsState"

const StreamList = () => {
    const [showHorizontalList, setShowHorizontalList] = useState(true)
    const [showMenuButton, setShowMenuButton] = useState(false)
    const [firstComponentRender, setFirstComponentRender] = useState(true)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const { selectedChatChannel, sortedChannels } = useStreamsState()

    const slideContainerRef = useRef(null)

    // layouteffect and firstComponentRender prevent showing a swap from list to menu to user on first render
    // relevant only when the site is loaded with > 3 streams in url's search parameters
    useLayoutEffect(() => {
        if (sortedChannels.length > 3) {
            setShowHorizontalList(false)
            setShowMenuButton(true)
        }
    }, [])

    useEffect(() => {
        if (firstComponentRender || anchorEl !== null) {
            setFirstComponentRender(false)
            return
        }

        if (sortedChannels.length > 3) {
            setShowHorizontalList(false)
        } else {
            setShowMenuButton(false)
        }
    }, [sortedChannels, anchorEl])

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
                    sortableItems={[...sortedChannels]}
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
                            {sortedChannels.map((channel, index) => {
                                const channelChatIsSelected = channel === selectedChatChannel

                                return (
                                    <StreamListItem
                                        key={index}
                                        channel={channel}
                                        channelChatIsSelected={channelChatIsSelected}
                                        oneStreamOpen={sortedChannels.length === 1}
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
                                sortableItems={[...sortedChannels]}
                            >
                                <Stack direction="column">
                                    {sortedChannels.map((channel) => {
                                        const channelChatIsSelected =
                                            channel === selectedChatChannel

                                        return (
                                            <StreamListItem
                                                key={channel}
                                                channel={channel}
                                                channelChatIsSelected={channelChatIsSelected}
                                                oneStreamOpen={false}
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
