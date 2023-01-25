import {
    Box,
    Button,
    Checkbox,
    Collapse,
    IconButton,
    ListItemIcon,
    ListItemText,
    MenuItem,
    MenuList,
    Stack,
} from "@mui/material"
import TourneyCard from "./TourneyCard"
import MinimizeIcon from "@mui/icons-material/Minimize"
import SettingsIcon from "@mui/icons-material/Settings"
import useEmblaCarousel from "embla-carousel-react"
import useCheckbox from "../hooks/useCheckbox"
import { useCallback, useState } from "react"
import chunk from "lodash.chunk"
import PopupMenu from "./PopupMenu"

const Carousel = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel()
    const [slideProps, setSlideProps] = useState(chunk(cardProps, 3))
    const [scrollNextEnabled, setSCrollNextEnabled] = useState(false)
    const [carouselVisible, setCarouselVisibility] = useState(true)

    const scrollNext = useCallback(() => {
        return emblaApi && emblaApi.scrollNext()
    }, [emblaApi])

    const scrollPrev = useCallback(() => {
        return emblaApi && emblaApi.scrollPrev()
    }, [emblaApi])

    const handleCollapse = () => {
        console.log("handle collapse")
        setCarouselVisibility((prevValue) => !prevValue)
    }

    const handleCarouselIconsVisibility = () => {
        console.log("transition end")
    }

    return (
        <Stack spacing={1}>
            <Box
                display="flex"
                flexDirection="row"
            >
                <Box flexGrow={1} />
                <Box>
                    <PopupMenu
                        buttonProps={{
                            buttonIcon: <SettingsIcon sx={{ marginTop: "5px" }} />,
                        }}
                        menuContent={<GameOptionsMenuContent />}
                    />
                </Box>
                <IconButton onClick={handleCollapse}>
                    <MinimizeIcon />
                </IconButton>
            </Box>
            <Collapse
                in={carouselVisible}
                onTransitionEnd={handleCarouselIconsVisibility}
            >
                <Box
                    bgcolor="red"
                    display="flex"
                    justifyContent="center"
                    flexDirection="column"
                    gap={3}
                >
                    <div
                        className="carousel"
                        ref={emblaRef}
                    >
                        <div className="carousel_container">
                            {slideProps.map((slideArray, mapIndex) => {
                                return (
                                    <Box
                                        className="carousel_slide"
                                        key={mapIndex}
                                    >
                                        <Slide cardProps={slideArray} />
                                    </Box>
                                )
                            })}
                        </div>
                    </div>
                    <Box
                        display="flex"
                        flexDirection="row"
                    >
                        <Box>
                            <Button onClick={scrollPrev}>Click</Button>
                        </Box>
                        <Box>
                            <Button onClick={scrollNext}>Click</Button>
                        </Box>
                    </Box>
                </Box>
            </Collapse>
        </Stack>
    )
}

// <Button onClick={scrollNext} enabled={scrollNextEnabled}>next</Button>

const Slide = ({ cardProps }: { cardProps: TestProps[] }) => {
    return (
        <Box
            display="flex"
            flexDirection="row"
            gap={5}
        >
            {cardProps.map((props: TestProps, mapIndex) => {
                return (
                    <TourneyCard
                        key={mapIndex}
                        tourneyName={props.text}
                    />
                )
            })}
        </Box>
    )
}

interface TestProps {
    text: string
}

const cardProps = [
    { text: "test1" },
    { text: "test2" },
    { text: "test3" },
    { text: "test4" },
    { text: "test5" },
    { text: "test6" },
    { text: "test7" },
]

const GameOptionsMenuContent = () => {
    const apexCheckbox = useCheckbox()
    const starcraftCheckbox = useCheckbox()

    return (
        <MenuList>
            <MenuItem onClick={apexCheckbox.handleToggle}>
                <ListItemIcon>
                    <SettingsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Apex Legends</ListItemText>
                <Checkbox checked={apexCheckbox.checked} />
            </MenuItem>
            <MenuItem onClick={starcraftCheckbox.handleToggle}>
                <ListItemIcon>
                    <SettingsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>StarCraft 2</ListItemText>
                <Checkbox checked={starcraftCheckbox.checked} />
            </MenuItem>
        </MenuList>
    )
}

export default Carousel
