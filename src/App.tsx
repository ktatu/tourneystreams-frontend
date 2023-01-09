import React from "react"
import "./App.css"

import Layout from "./Layout"

import Home, { homeLoader } from "./pages/Home"
import Tourney, { tourneyLoader } from "./pages/Tourney"

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import TestPage from "./TestPage"

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index loader={homeLoader} element={<Home />} />
            <Route path="tournaments/:id" loader={tourneyLoader} element={<Tourney />} />
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