import React from "react"
import "./App.css"

import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"

import Layout from "./Layout"

import TourneyList, { tourneyListLoader } from "./components/TourneyList"
import TourneyPage, { tourneyPageLoader } from "./TourneyPage"

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index loader={tourneyListLoader} element={<TourneyList />} />
            <Route path="tournaments/:id" loader={tourneyPageLoader} element={<TourneyPage />} />
        </Route>
    )
)

const App = () => {
	return (
		<RouterProvider router={router} />
	)
}

export default App