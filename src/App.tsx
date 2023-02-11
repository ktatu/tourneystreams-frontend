import React from "react"
import "./App.css"

import Layout from "./Layout"

import Tourney, { tourneyLoader } from "./pages/Tourney"
import HomeLayout from "./home_page/Layout"
import StreamViewLayout from "./streamview_page/Layout"
import { createTheme, ThemeOptions, ThemeProvider } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import theme from "./theme"
import CssBaseline from "@mui/material/CssBaseline"

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom"
import TestPage from "./TestPage"
import User from "./user"

/*
const streamLoader = ({ request }) => {
    const url = new URL(request.url)

}*/

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path="/"
            element={<Layout />}
        >
            <Route
                index
                element={<HomeLayout />}
            />
            <Route
                path="streamview"
                element={<StreamViewLayout />}
            />
            <Route
                path="tournaments/:id"
                loader={tourneyLoader}
                element={<Tourney />}
            />
            <Route
                path="test"
                element={<TestPage />}
            />
        </Route>
    )
)

const App = () => {
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")

    return (
        <ThemeProvider theme={theme(prefersDarkMode)}>
            <CssBaseline />
            <RouterProvider router={router} />
        </ThemeProvider>
    )
}

export default App
