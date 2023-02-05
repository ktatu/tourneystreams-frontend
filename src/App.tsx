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
    console.log("prefers dark mode ", prefersDarkMode)

    /*
    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: "light",
                    primary: {
                        main: "#3f51b5",
                    },
                    secondary: {
                        main: "#f50057",
                    },
                    divider: "rgba(255,181,181,0.12)",
                    background: {
                        paper: "#FDF7F7",
                    },
                },
            }),
        [prefersDarkMode]
    )*/

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <RouterProvider router={router} />
        </ThemeProvider>
    )
}

export default App
