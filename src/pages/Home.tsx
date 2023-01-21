/* eslint-disable react/no-unknown-property */

import React, {
    useCallback,
    useEffect,
    useState,
    useRef,
    MutableRefObject,
} from "react"
//import Grid from "@mui/material/Unstable_Grid2"
import {
    Box,
    Button,
    Checkbox,
    ListItemIcon,
    MenuItem,
    MenuList,
    ListItemText,
    Stack,
} from "@mui/material"

import { TourneyListEntry } from "../components/TourneyListEntry"

import { useLoaderData } from "react-router-dom"
import { TourneyCardProps } from "../types"

import tourneyEntriesService from "../services/tourneyEntries"
import OutlinedCard from "../components/BasicCard"
import TourneyCard from "../components/TourneyCard"

import chunk from "lodash.chunk"

import useEmblaCarousel from "embla-carousel-react"
import "./Home.css"

import SettingsIcon from "@mui/icons-material/Settings"
import PopupMenu from "../components/PopupMenu"

import useCheckbox from "../hooks/useCheckbox"

import Stream from "../components/Stream"

export const homeLoader = async () => {
    //return await tourneyEntriesService.getAll()
    return null
}

interface TestProps {
    text: string
}

const Home = () => {
    const [cardProps, setCardProps] = useState<TestProps[]>([
        { text: "test1" },
        { text: "test2" },
        { text: "test3" },
        { text: "test4" },
        { text: "test5" },
        { text: "test3" },
        { text: "test3" },
    ])

    return (
        <Stack spacing={1}>
            <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
            >
                <Box flexGrow={1} />
                <PopupMenu
                    menuIcon={<SettingsIcon sx={{ marginTop: "5px" }} />}
                    menuContent={<GameOptionsMenuContent />}
                />
            </Box>
            <Carousel />
            <Stream />
        </Stack>
    )
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
    )
}

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

export default Home
