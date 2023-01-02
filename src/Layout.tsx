import React from "react"
import { Outlet } from "react-router-dom"
import Container from "@mui/material/Container"
import Footer from "./components/Footer"

const Layout = () => {
    return (
		<div>
            <Container maxWidth="md">
                <Outlet />
            </Container>
            <Footer />
        </div>
    )
}

export default Layout