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
    FormGroup,
    FormControlLabel,
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
                <h2>Tournaments</h2>
                <PopupMenu
                    menuIcon={<SettingsIcon sx={{ marginTop: "5px" }} />}
                    menuContent={<GameOptionsMenuContent />}
                />
            </Box>
            <Carousel />
            <TourneyCard tourneyName="Tourney 1" />
        </Stack>
    )
}

const GameOptionsMenuContent = () => {
    const apexRef = useRef() as any

    const handleCheckboxToggle = (refName: string) => {
        if (refName === "apex") {
            console.log(apexRef.current)
        }
    }

    return (
        <MenuList>
            <MenuItem onClick={() => handleCheckboxToggle("apex")}>
                <ListItemIcon>
                    <SettingsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Apex Legends</ListItemText>
                <Checkbox ref={apexRef} />
            </MenuItem>
            <MenuItem>
                <ListItemIcon>
                    <SettingsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>StarCraft 2</ListItemText>
                <Checkbox />
            </MenuItem>
        </MenuList>
    )
}

const Carousel = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel()
    const [cardProps, setCardProps] = useState<TestProps[]>([
        { text: "test1" },
        { text: "test2" },
        { text: "test3" },
        { text: "test4" },
        { text: "test5" },
        { text: "test3" },
        { text: "test3" },
    ])
    const [scrollNextEnabled, setSCrollNextEnabled] = useState(false)

    const scrollNext = useCallback(() => {
        return emblaApi && emblaApi.scrollNext()
    }, [emblaApi])

    return (
        <Box bgcolor="red">
            <div
                className="carousel"
                ref={emblaRef}
            >
                <div className="carousel_container">
                    {chunk(cardProps, 3).map((propArray, mapIndex) => (
                        <Box
                            className="carousel_slide"
                            key={mapIndex}
                        >
                            <CarouselSlideBox cardProps={propArray} />
                        </Box>
                    ))}
                </div>
            </div>
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
                    <OutlinedCard
                        key={mapIndex}
                        text={props.text}
                    />
                )
            })}
        </Box>
    )
}

export default Home
