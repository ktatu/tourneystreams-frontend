// AI-assisted by Claude Sonnet 5.5 (GitHub Copilot): switched to import.meta.env, switched to TanStack Query v5 syntax, renamed the msw start option, as part of the Vite/dependency migration.
// AI-generated addition by Claude Sonnet 5.5 (GitHub Copilot): added optional msw mocking startup before rendering the app.
import { ThemeProvider } from "@mui/material"
import CssBaseline from "@mui/material/CssBaseline"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import theme from "./theme"

import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import { wakeupServer } from "./commons/authRequests"

// waking up backend, it spins down when no traffic
if (import.meta.env.PROD) {
    wakeupServer()
}

const queryClient = new QueryClient()

const enableMocking = async () => {
    if (import.meta.env.VITE_USE_MOCKS !== "true" || import.meta.env.PROD) {
        return
    }

    const { worker } = await import("./mocks/browser")
    await worker.start({ onUnhandledFrame: "bypass" })
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
        </StrictMode>,
    )
})
