import React, { useState } from "react"
//import Grid from "@mui/material/Unstable_Grid2"
import { Box, Stack } from "@mui/material"

import { TourneyListEntry } from "../components/TourneyListEntry"

import { useLoaderData } from "react-router-dom"
import { TourneyCardProps } from "../types"

import tourneyEntriesService from "../services/tourneyEntries"
import OutlinedCard from "../components/BasicCard"
import TourneyCard from "../components/TourneyCard"

import Carousel from "react-material-ui-carousel"

import chunk from "lodash.chunk"

export const homeLoader = async () => {
    //return await tourneyEntriesService.getAll()
    return null
}

interface TestProps {
    text: string
}

const Home = () => {
    const [cardProps, setCardProps] = useState<TestProps[]>([{ text: "test1" }, { text: "test2" }, { text: "test3" }, { text: "test4" }, { text: "test5" }])

    const CardCarousel = () => {
        return (
            <Carousel sx={{ maxWidth: "50vw" }  }
                animation="fade"
                duration={200}
                autoPlay={false}
                cycleNavigation={false}
                navButtonsAlwaysVisible={true}
                swipe={false}
            >
                {chunk(cardProps, 3).map((propArray, mapIndex) => <CarouselSlideBox key={mapIndex} cardProps={propArray} />)}
            </Carousel>
        )
    }
    
    const CarouselSlideBox = ({ cardProps }: { cardProps: TestProps[] }) => {
        return (
            <Box padding={20} display="flex" flexDirection="row" gap={10}>
                {cardProps.map((props: TestProps, mapIndex) => {
                    return (
                        <OutlinedCard key={mapIndex} text={props.text} />
                    )
                })}
            </Box>
        )
    }


    return (
        <Stack spacing={3}>
            <h2>Tournaments</h2>
            <CardCarousel />
        </Stack>
    )
}


export default Home