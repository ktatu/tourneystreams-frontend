import React from "react"
import { Outlet } from "react-router-dom"
import Container from "@mui/material/Container"
import Footer from "./shared_components/Footer"
import Toolbar from "./Toolbar"
import { Box, Unstable_Grid2 as Grid } from "@mui/material"

/*
const Layout = () => {
    return (
        <div>
            <Toolbar />
            <Container maxWidth="lg">
                <Outlet />
            </Container>
        </div>
    )
}*/

const Layout = () => {
    return (
        <div>
            <Toolbar />
            <Outlet />
        </div>
    )
}

export default Layout
