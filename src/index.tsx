// AI-generated addition by Claude Sonnet 5.5 (GitHub Copilot): added optional msw mocking startup before rendering the app.
import { ThemeProvider } from "@mui/material"
import CssBaseline from "@mui/material/CssBaseline"
import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import { QueryClient, QueryClientProvider } from "react-query"
import App from "./App"
import "./index.css"
import theme from "./theme"

import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"

const queryClient = new QueryClient()

const enableMocking = async () => {
    if (process.env.REACT_APP_USE_MOCKS !== "true" || process.env.NODE_ENV === "production") {
        return
    }

    const { worker } = await import("./mocks/browser")
    await worker.start({ onUnhandledRequest: "bypass" })
}

enableMocking().then(() => {
    const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
    root.render(
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider theme={theme}>
                    <CssBaseline enableColorScheme />
                    <App />
                </ThemeProvider>
            </QueryClientProvider>
        </StrictMode>
    )
})
