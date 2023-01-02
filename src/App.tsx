import React from "react"
import "./App.css"

import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"

import Container from "@mui/material/Container"
import Grid from "@mui/material/Unstable_Grid2"

import Layout from "./Layout"

import TourneyList, { tourneyListLoader } from "./components/TourneyList"

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import TourneyPage from "./TourneyPage"

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index loader={tourneyListLoader} element={<TourneyList />} />
            <Route path="tournaments/:tourneyname" element={<TourneyPage />} />
        </Route>
    )
)

const App = () => {
	return (
		<RouterProvider router={router} />
	)
}

export default App