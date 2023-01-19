import {
    ArrowCircleRightOutlined,
    HomeOutlined,
    MoreHoriz,
} from "@mui/icons-material"

import {
    Box,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Divider,
    IconButton,
    Menu,
    MenuItem,
    Typography,
} from "@mui/material"

import Grid from "@mui/material/Unstable_Grid2"
import React from "react"

import ListMenu from "./ListMenu"

const TourneyCard = ({ tourneyName }: { tourneyName: string }) => {
    return (
        <Card sx={{ width: 300, height: 300 }}>
            <CardMedia
                component="img"
                height="100"
                image={require("../assets/kingscanyon.jpg")}
            />
            <CardContent>
                <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                    height={75}
                >
                    <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        paddingRight={5}
                    >
                        {tourneyName}
                    </Typography>
                    <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        display="flex"
                        justifyContent="flex-end"
                    >
                        3d 45min
                    </Typography>
                </Box>
                <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                >
                    <Typography variant="body2">
                        Region / country: Europe
                    </Typography>
                    <IconButton disabled={false}>
                        <ArrowCircleRightOutlined
                            sx={{ transform: "scale(3.0)" }}
                        />
                    </IconButton>
                </Box>
            </CardContent>
            <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
                <ListMenu
                    menuIcon={<MoreHoriz />}
                    menuContent={<CardMenuContent />}
                />
            </CardActions>
        </Card>
    )
}

const CardMenuContent = () => {
    return (
        <>
            <MenuItem>
                <HomeOutlined
                    width={25}
                    height={20}
                />{" "}
                Home page
            </MenuItem>
            <Divider />
            <MenuItem>
                <img
                    src={require("../assets/liquipedia.png")}
                    width={25}
                    height={20}
                />{" "}
                Liquipedia
            </MenuItem>
        </>
    )
}

export default TourneyCard
