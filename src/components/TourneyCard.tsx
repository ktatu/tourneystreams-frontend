import { ArrowCircleRightOutlined, HomeOutlined, MoreHoriz } from "@mui/icons-material"
import { Box, Card, CardActions, CardContent, CardMedia, Divider, IconButton, Menu, MenuItem, Typography } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2"
import React from "react"

const TourneyCard = ({ tourneyName }: { tourneyName: string }) => {

    return (
        <Card sx={{ width: 300, height: 400 }}>
            <CardMedia
                component="img"
                height="100"
                image={require("../assets/kingscanyon.jpg")}
            />
            <CardContent>
                <Box display="flex" flexDirection="row" justifyContent="space-between" height={150}>
                    <Typography gutterBottom variant="h6" component="div" paddingRight={5}>
                        {tourneyName}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div" display="flex" justifyContent="flex-end">
                        3d 45min
                    </Typography>
                </Box>
                <Box display="flex" flexDirection="row" justifyContent="space-between">
                    <Typography variant="body2">
                        Region / country: Europe
                    </Typography>
                    <IconButton disabled={false}>
                        <ArrowCircleRightOutlined sx={{ transform: "scale(3.0)"}} />
                    </IconButton>
                </Box>
            </CardContent>
            <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
                <DotsMenu />
            </CardActions>
        </Card>
    )
}

const DotsMenu = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

    const isOpen = Boolean(anchorEl)

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <div>
            <IconButton onClick={handleClick}>
                <MoreHoriz />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={isOpen}
                onClose={handleClose}
            >
                <MenuItem>
                    <HomeOutlined width={25} height={20} /> Home page
                </MenuItem>
                <Divider />
                <MenuItem>
                    <img src={require("../assets/liquipedia.png")} width={25} height={20} /> Liquipedia
                </MenuItem>
            </Menu>

        </div>
    )
}

export default TourneyCard

/*
            <CardContent>
                <Grid container>
                    <Grid container>
                        <Grid xs={8}>
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
                    <Grid container flexGrow={1} marginTop={5}>
                        <Grid xs={8}>
                            <p>Region / country: Europe</p>
                        </Grid>
                        <Grid xs={4} display="flex" justifyContent="flex-end" paddingRight={5}>
                            <IconButton disabled={false}>
                                <ArrowCircleRightOutlined sx={{ transform: "scale(3.0)"}} />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
*/