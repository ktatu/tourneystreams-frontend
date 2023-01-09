import React, { useState, useRef } from "react"

import { Stack, Box, Button, Card, CardActions, CardMedia, CardContent, Divider, IconButton, Menu, MenuItem, Tooltip, Typography, FormControlLabel, Switch, Slide, Container } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2"
import { ArrowCircleRightOutlined, ArrowForward, HomeOutlined, MoreHoriz, ArrowBackIos, ArrowForwardIos } from "@mui/icons-material"
import TourneyCard from "./components/TourneyCard"
import OutlinedCard from "./components/BasicCard"
import { TourneyCardProps } from "./types"

const TestPage = () => {
    const [transform, setTransform] = React.useState("")
    const [tourneyCards, setTourneyCards] = React.useState<TourneyCardProps>()

    return (
        <Container maxWidth="lg">
            <Box bgcolor="yellow" display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                <Stack spacing={5} marginTop={10}>
                    <h1>Tournaments</h1>
                    <Grid container spacing={3} >
                        <Grid marginTop={7}>
                            <ArrowBackIos sx={{ transform: "scale(5.0)" }} />
                        </Grid>
                        <Grid>
                            <Box minWidth="45vw" minHeight="60vh" bgcolor="blue">
                            </Box>
                        </Grid>
                        <Grid>
                            <ArrowForwardIos sx={{ transform: "scale(5.0)" }} />
                        </Grid>
                    </Grid>
                </Stack>
            </Box>
        </Container>
    )
}
// Esports Arena: Series E Season 6 Pro Tournament #4
// <TourneyCard tourneyName="Tourney 2"/>
export default TestPage