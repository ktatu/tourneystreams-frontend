/* eslint-disable react/no-unknown-property */

import React, { useCallback, useEffect, useState, useRef, MutableRefObject } from "react"
//import Grid from "@mui/material/Unstable_Grid2"
import {
    Box,
    Button,
    Checkbox,
    Collapse,
    IconButton,
    ListItemIcon,
    MenuItem,
    MenuList,
    ListItemText,
    Stack,
} from "@mui/material"

import { TourneyListEntry } from "../shared_components/TourneyListEntry"

import MinimizeIcon from "@mui/icons-material/Minimize"
import MaximizeIcon from "@mui/icons-material/Maximize"

import { useLoaderData } from "react-router-dom"
import { TourneyCardProps } from "../types"

import tourneyEntriesService from "../services/tourneyEntries"
import OutlinedCard from "../shared_components/BasicCard"
import TourneyCard from "../shared_components/TourneyCard"

import chunk from "lodash.chunk"

import useEmblaCarousel from "embla-carousel-react"
import "./TourneyCarousel.css"

import UnfoldLessIcon from "@mui/icons-material/UnfoldLess"
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore"

import SettingsIcon from "@mui/icons-material/Settings"
import PopupMenu from "../shared_components/PopupMenu"

import useCheckbox from "../hooks/useCheckbox"

import Streams from "../shared_components/Streams"
import Chats from "../shared_components/Chats"

export const homeLoader = async () => {
    //return await tourneyEntriesService.getAll()
    return null
}

interface TestProps {
    text: string
}

enum CollapseStatus {
    Maximized = "MAX",
    Minimized = "MIN",
}

const TourneyCarousel = () => {
    const [carouselVisible, setCarouselVisibility] = useState(true)
    const [collapseStatus, setCollapseStatus] = useState<CollapseStatus>(CollapseStatus.Maximized)
    const [emblaRef, emblaApi] = useEmblaCarousel()
    const [slides, setSlides] = useState(chunk(cardProps, 3))
    const [scrollNextEnabled, setSCrollNextEnabled] = useState(false)

    const scrollNext = useCallback(() => {
        return emblaApi && emblaApi.scrollNext()
    }, [emblaApi])

    const scrollPrev = useCallback(() => {
        return emblaApi && emblaApi.scrollPrev()
    }, [emblaApi])

    const handleCollapse = () => {
        setCarouselVisibility((prevValue) => !prevValue)
    }

    const handleCarouselIconsVisibility = () => {
        if (collapseStatus === "MAX") {
            setCollapseStatus(CollapseStatus.Minimized)
        } else {
            setCollapseStatus(CollapseStatus.Maximized)
        }
    }

    return (
        <Stack
            spacing={1}
            marginTop="20px"
            paddingLeft="10px"
        >
            <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
            >
                <Box
                    display={collapseStatus === CollapseStatus.Maximized ? "flex" : "none"}
                    flexDirection="row"
                    flexGrow={1000}
                >
                    <Box
                        display="flex"
                        flexDirection="row"
                    >
                        <Button
                            variant="contained"
                            onClick={scrollPrev}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="contained"
                            onClick={scrollNext}
                        >
                            next
                        </Button>
                    </Box>
                    <Box flexGrow={1} />
                    <Box>
                        <PopupMenu
                            buttonProps={{
                                buttonIcon: <SettingsIcon sx={{ marginTop: "5px" }} />,
                            }}
                            menuContent={<GameOptionsMenuContent />}
                        />
                    </Box>
                </Box>
                <Box flexGrow={1} />
                <IconButton onClick={handleCollapse}>
                    <CollapseIcon collapseStatus={collapseStatus} />
                </IconButton>
            </Box>
            <Collapse
                in={carouselVisible}
                onExited={handleCarouselIconsVisibility}
                onEntered={handleCarouselIconsVisibility}
            >
                <Box>
                    <div
                        className="carousel"
                        ref={emblaRef}
                    >
                        <div className="carousel_container">
                            {slides.map((slideArray, mapIndex) => {
                                return (
                                    <Box
                                        className="carousel_slide"
                                        key={mapIndex}
                                    >
                                        <CarouselSlideBox cardProps={slideArray} />
                                    </Box>
                                )
                            })}
                        </div>
                    </div>
                </Box>
            </Collapse>
        </Stack>
    )
}

const CollapseIcon = ({ collapseStatus }: { collapseStatus: CollapseStatus }) => {
    if (collapseStatus === "MAX") {
        return <UnfoldLessIcon sx={{ marginTop: "5px" }} />
    }
    return <UnfoldMoreIcon sx={{ marginTop: "5px" }} />
}

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

const cardProps = [
    { text: "test1" },
    { text: "test2" },
    { text: "test3" },
    { text: "test4" },
    { text: "test5" },
    { text: "test6" },
    { text: "test7" },
]

const Carousel = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel()
    const [slides, setSlides] = useState(chunk(cardProps, 3))
    const [scrollNextEnabled, setSCrollNextEnabled] = useState(false)

    const scrollNext = useCallback(() => {
        return emblaApi && emblaApi.scrollNext()
    }, [emblaApi])

    const scrollPrev = useCallback(() => {
        return emblaApi && emblaApi.scrollPrev()
    }, [emblaApi])

    return (
        <Box>
            <div
                className="carousel"
                ref={emblaRef}
            >
                <div className="carousel_container">
                    {slides.map((slideArray, mapIndex) => {
                        return (
                            <Box
                                className="carousel_slide"
                                key={mapIndex}
                            >
                                <CarouselSlideBox cardProps={slideArray} />
                            </Box>
                        )
                    })}
                </div>
            </div>
        </Box>
    )
}

/*

        <Box
            bgcolor="purple"
            display="flex"
            justifyContent="center"
            flexDirection="column"
            gap={3}
        >



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
*/

// <Button onClick={scrollNext} enabled={scrollNextEnabled}>next</Button>

const CarouselSlideBox = ({ cardProps }: { cardProps: TestProps[] }) => {
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

export default TourneyCarousel
