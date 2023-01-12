import React, { useState } from "react"
//import Grid from "@mui/material/Unstable_Grid2"
import { Box, Button, Stack } from "@mui/material"

import { TourneyListEntry } from "../components/TourneyListEntry"

import { useLoaderData } from "react-router-dom"
import { TourneyCardProps } from "../types"

import tourneyEntriesService from "../services/tourneyEntries"
import OutlinedCard from "../components/BasicCard"
import TourneyCard from "../components/TourneyCard"

import chunk from "lodash.chunk"

import useEmblaCarousel from "embla-carousel-react"
import "./Home.css"

export const homeLoader = async () => {
    //return await tourneyEntriesService.getAll()
    return null
}

interface TestProps {
    text: string
}

/*
embla-carousel.com

jos https://github.com/davidjerleke/embla-carousel/issues/387
on ongelma, niin workaround: https://stackoverflow.com/questions/6131051/is-it-possible-to-find-out-what-is-the-monitor-frame-rate-in-javascript
*/

const Home = () => {
    const [cardProps, setCardProps] = useState<TestProps[]>([{ text: "test1" }, { text: "test2" }, { text: "test3" }, { text: "test4" }, { text: "test5" }, { text: "test3" }, { text: "test3" }])


    return (
        <Stack spacing={3}>
            <h2>Tournaments</h2>
            <Carousel />
        </Stack>
    )
}
    
const Carousel = () => {
    const [carouselRef] = useEmblaCarousel()
    const [cardProps, setCardProps] = useState<TestProps[]>([{ text: "test1" }, { text: "test2" }, { text: "test3" }, { text: "test4" }, { text: "test5" }, { text: "test3" }, { text: "test3" }])
    const [scrollNextEnabled, setSCrollNextEnabled] = useState(false)

    return (
        <>
            <div className="carousel" ref={carouselRef}>
                <div className="carousel_container">
                    {chunk(cardProps, 3)
                        .map((propArray, mapIndex) =>
                            <Box
                                className="carousel_slide"
                                key={mapIndex}
                            >
                                <CarouselSlideBox cardProps={propArray} />
                            </Box>
                        )
                    }
                </div>
        </div>
      </>
    )
}

// <Button onClick={scrollNext} enabled={scrollNextEnabled} />

const CarouselSlideBox = ({ cardProps }: { cardProps: TestProps[] }) => {
    return (
        <Box
            display="flex"
            flexDirection="row"
            gap={5}
        >
            {cardProps.map((props: TestProps, mapIndex) => {
                return (
                    <OutlinedCard key={mapIndex} text={props.text} />
                )
            })}
        </Box>
    )
}


export default Home