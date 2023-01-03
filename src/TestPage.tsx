import React from "react"

import { Box, Card, CardActions, CardMedia, CardContent, Tooltip, Typography } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2"
import { Home } from "@mui/icons-material"

const TestPage = () => {
    return (
        <Grid container marginTop={30} justifyContent="center">
            <Card sx={{ maxWidth: 450 }}>
                <CardMedia
                    component="img"
                    height="75"
                    image={require("./assets/kingscanyon.jpg")}
                />
                <CardContent>
                    <Grid container spacing={1}>
                        <Grid container>
                            <Grid xs={8} bgcolor="red">
                                <Typography gutterBottom variant="h6" component="div">
                                    Esports Arena: Series E Season 6 Pro Tournament #4
                                </Typography>
                            </Grid>
                            <Grid xs={4} display="flex" justifyContent="flex-end" alignContent="center">
                                <Typography gutterBottom variant="h6" component="div">
                                    3d 45min
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container flexGrow={1} bgcolor="blue">
                            <Grid xs={8}>
                                <p>Test: 1</p>
                                <p>Test: 2</p>
                            </Grid>
                            <Grid xs={4}>
                                <p>test</p>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <a href="https://liquipedia.net/apexlegends/Main_Page" rel="noreferrer" target="_blank">
                        <img src={require("./assets/liquipedia.png")} width={25} height={20} />
                    </a>
                </CardActions>
            </Card>
        </Grid>
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
*/