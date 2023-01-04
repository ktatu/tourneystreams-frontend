import React, { useState } from "react"

import { Box, Button, Card, CardActions, CardMedia, CardContent, Divider, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2"
import { ArrowCircleRightOutlined, ArrowForward, HomeOutlined, MoreHoriz } from "@mui/icons-material"
import TourneyCard from "./components/TourneyCard"

const TestPage = () => {
    return (
        <Grid container marginTop={30} spacing={5}>
            <Grid>
                <TourneyCard tourneyName="Tourney 2"/>
            </Grid>
        </Grid>
    )
}
// Esports Arena: Series E Season 6 Pro Tournament #4

const DotsMenuItem = () => {

    return (
        <MenuItem></MenuItem>
    )
}

export default TestPage

/*
                    <CardContent>
                        <Grid2 container spacing={1}>
                            <Grid2 xs={9}>
                                <Typography gutterBottom variant="h6" component="div">
                                    Esports Arena: Series E Season 6 Pro Tournament #4
                                </Typography>
                            </Grid2>
                            <Grid2 xs={3} justifyContent="right">
                                <Typography gutterBottom variant="h6" component="div">
                                    Test
                                </Typography>
                            </Grid2>
                        </Grid2>
                    </CardContent>


                    <a href="https://liquipedia.net/apexlegends/Main_Page" rel="noreferrer" target="_blank">
                        <img src={require("./assets/liquipedia.png")} width={25} height={20} />
                    </a>

*/