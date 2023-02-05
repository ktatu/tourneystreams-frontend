import React, { useEffect } from "react"
import { Outlet } from "react-router-dom"
import Container from "@mui/material/Container"
import Footer from "./shared_components/Footer"
import Toolbar from "./Toolbar"
import { Box, Unstable_Grid2 as Grid } from "@mui/material"
import useChannels from "./hooks/useChannels"

const Layout = () => {
    const channelsHook = useChannels()

    useEffect(() => {
        channelsHook.initializeStreams()
    }, [])

    return (
        <Box>
            <Toolbar />
            <Outlet />
        </Box>
    )
}

export default Layout
