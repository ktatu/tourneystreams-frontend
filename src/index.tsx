import React, { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import theme from "./theme"
import { ThemeProvider } from "@mui/material"
import "./index.css"

import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
    <StrictMode>
        <App />
    </StrictMode>
)
