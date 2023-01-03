import React from "react"
import "./App.css"

import Layout from "./Layout"

import TourneyList, { tourneyListLoader } from "./components/TourneyList"
import TourneyPage, { tourneyPageLoader } from "./TourneyPage"

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import TestPage from "./TestPage"

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index loader={tourneyListLoader} element={<TourneyList />} />
            <Route path="tournaments/:id" loader={tourneyPageLoader} element={<TourneyPage />} />
            <Route path="test" element={<TestPage />} />
        </Route>
    )
)

const App = () => {
	return (
		<RouterProvider router={router} />
	)
}

export default App