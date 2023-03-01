import React, { useEffect } from "react"
import { Outlet } from "react-router-dom"
import Container from "@mui/material/Container"
import Footer from "./shared_components/Footer"
import Toolbar from "./Toolbar"
import { Box, Unstable_Grid2 as Grid } from "@mui/material"
import TourneyDrawer from "./features/tourney_drawer/TourneyDrawer"

const Layout = () => {
    return (
        <Box>
            <Toolbar />
            <TourneyDrawer />
            <Box
                marginLeft="24%"
                width="75%"
                paddingTop={2}
            >
                <Outlet />
            </Box>
        </Box>
    )
}

export default Layout
